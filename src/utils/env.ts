// This file helps with type safety for environment variables
type EnvVars = {
  VITE_LODGIFY_API_KEY: string;
  VITE_LODGIFY_SUBDOMAIN: string;
};

export const getEnv = (key: keyof EnvVars): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || '';
};
