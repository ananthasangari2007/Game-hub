import axios from "axios";

export const hasRawgApiKey = Boolean(import.meta.env.VITE_RAWG_API_KEY);

const apiClient = axios.create({
  baseURL: "https://api.rawg.io/api",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  if (!apiKey) {
    return config;
  }

  config.params = {
    ...config.params,
    key: apiKey,
  };

  return config;
});

export default apiClient;
