import { useState, useCallback } from 'react';
import axiosInstance from './axiosInstance';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (method, endpoint, data = null, retryCount = 0) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`🚀 Calling API ${method.toUpperCase()}: ${endpoint}`);
      
      const config = {
        method,
        url: endpoint,
        ...(data && { data }),
        // Ensure we have proper headers
        headers: {
          'Content-Type': 'application/json',
          // Add any auth token if it exists
          ...(localStorage.getItem('token') && {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          })
        },
        // Add retry information
        retry: retryCount,
        retryDelay: 2000, // 2 seconds between retries
      };

      const response = await axiosInstance.request(config);
      console.log(`✅ API Response:`, response.data);
      return response.data;
    } catch (err) {
      console.error('❌ API Error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        retryCount
      });

      // If it's a network error or 5xx error and we haven't exceeded retries
      if ((err.code === 'ERR_NETWORK' || (err.response?.status >= 500 && err.response?.status < 600)) && retryCount < 3) {
        console.log(`🔄 Retrying request (${retryCount + 1}/3)...`);
        // Wait for retryDelay milliseconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Retry the request
        return callApi(method, endpoint, data, retryCount + 1);
      }

      // Format error message
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'An unexpected error occurred';

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      if (retryCount === 0) { // Only set loading to false on the original request
        setLoading(false);
      }
    }
  }, []);

  const post = useCallback((endpoint, data) => callApi('post', endpoint, data), [callApi]);
  const get = useCallback((endpoint) => callApi('get', endpoint), [callApi]);
  const put = useCallback((endpoint, data) => callApi('put', endpoint, data), [callApi]);
  const del = useCallback((endpoint) => callApi('delete', endpoint), [callApi]);

  return {
    loading,
    error,
    post,
    get,
    put,
    delete: del
  };
}; 