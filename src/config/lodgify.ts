// src/config/lodgify.ts
export const LODGIFY_CONFIG = {
  API_KEY: import.meta.env.VITE_LODGIFY_API_KEY || '',
  SUBDOMAIN: import.meta.env.VITE_LODGIFY_SUBDOMAIN || '',
  BASE_URL: 'https://api.lodgify.com/v2',
  PROPERTY_ID: 713163,
};

export const ENDPOINTS = {
  PROPERTIES: '/properties',
  PROPERTY: (id: number = LODGIFY_CONFIG.PROPERTY_ID) => `/properties/${id}`,
  AVAILABILITY: '/availability',
  RATES: '/rates',
  BOOKINGS: '/bookings',
};