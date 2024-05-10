// Mapper for environment variables
export const environment = import.meta.env.VITE_NODE_ENV;

export const urls = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    apiBaseEndpoint: import.meta.env.VITE_API_BASE_ENDPOINT
}