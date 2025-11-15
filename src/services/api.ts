import { LODGIFY_CONFIG } from "../config/lodgify";

const API_BASE_URL = LODGIFY_CONFIG.BASE_URL;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

export const api = {
  get: async <T>(endpoint: string, config: any = {}): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        ...config.headers,
      },
      ...config,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  },
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Apikey": LODGIFY_CONFIG.API_KEY,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-ApiKey": LODGIFY_CONFIG.API_KEY,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-ApiKey": LODGIFY_CONFIG.API_KEY,
      },
    });

    return handleResponse(response);
  },
};
