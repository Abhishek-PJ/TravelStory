import axios from "axios";
import { BASE_URL } from "./constants";

console.log("✅ Using base URL:", BASE_URL);

// Create axios instance with retry functionality
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add retry functionality
axiosInstance.interceptors.request.use(
    async (config) => {
        // Log the full URL being requested
        console.log("🚀 Making request to:", `${config.baseURL}${config.url}`);
        
        // Add retry count to config if not present
        if (config.retry === undefined) {
            config.retry = 3;
            config.retryDelay = 1000;
            config.retryCount = 0;
        }
        
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error("❌ Request error:", error);
        return Promise.reject(error);
    }
);

// Add response interceptor with retry logic
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("✅ Response received from:", response.config.url);
        return response;
    },
    async (error) => {
        const config = error.config;
        
        // If we've already retried the maximum number of times, reject
        if (!config || config.retryCount >= config.retry) {
            console.error("❌ Max retries reached. Error details:", {
                url: config?.url,
                method: config?.method,
                status: error.response?.status,
                message: error.message,
                code: error.code
            });
            return Promise.reject(error);
        }

        // If it's a network error or 5xx error, retry
        if (!error.response || (error.response.status >= 500 && error.response.status <= 599)) {
            config.retryCount += 1;
            
            const delayMs = config.retryDelay * Math.pow(2, config.retryCount - 1);
            console.log(`🔄 Retrying request (${config.retryCount}/${config.retry}) after ${delayMs}ms:`, config.url);
            
            return new Promise((resolve) => {
                setTimeout(() => resolve(axiosInstance(config)), delayMs);
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
