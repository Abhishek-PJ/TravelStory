export const BASE_URL = import.meta.env.VITE_API_BASE_URL?.endsWith('/')
  ? import.meta.env.VITE_API_BASE_URL.slice(0, -1)
  : import.meta.env.VITE_API_BASE_URL;
