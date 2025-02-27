import axios, { AxiosInstance } from "axios";

// Function to get token from localStorage
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL:  "https://solbox-backend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
apiClient.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
