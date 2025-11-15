import { api } from "./api";
import { ENDPOINTS, LODGIFY_CONFIG } from "../config/lodgify";
import axios from "axios";
import { Mock_availabilities } from "../utils/data";
export interface Property {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: Array<{
    url: string;
    is_primary: boolean;
  }>;
  defaultDailyPrice?: number;
  minStay?: number;
  maxStay?: number;
  checkInTime?: string;
  checkOutTime?: string;
}

export interface Availability {
  date: string;
  available: boolean;
  minStay?: number;
  maxStay?: number;
  closedToArrival?: boolean;
  closedToDeparture?: boolean;
}

export interface Rate {
  date: string;
  dailyRate: number;
  minStay: number;
  maxStay: number;
  closedToArrival: boolean;
  closedToDeparture: boolean;
}

// Create a class to properly handle 'this' context
class PropertyService {
  async getMainProperty(): Promise<Property> {
    try {
      return await api.get<Property>(ENDPOINTS.PROPERTY());
    } catch (error) {
      console.error("Error fetching property:", error);
      throw new Error("Failed to fetch property details");
    }
  }

  async getAvailability(
    startDate: string = "2026-03-03",
    endDate: string = "2026-04-03",
    propertyId: number = LODGIFY_CONFIG.PROPERTY_ID
  ): Promise<Availability[]> {
    try {
      const response = await api.get<{ items: Availability[] }>(
        `/availability/${propertyId}`,
        {
          params: {
            start: startDate,
            end: endDate,
            includeDetails: "false",
          },
        }
      );
      return response.items || [];
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw new Error("Failed to fetch property availability");
    }
  }
  async checkPropertyAvailability(propertyId: number = 713163): Promise<any> {
    const options = {
      method: 'GET',
      url: `${LODGIFY_CONFIG.BASE_URL}/availability/${propertyId}`,
      params: { includeDetails: false },
      headers: {
        accept: 'application/json',
        'X-ApiKey': LODGIFY_CONFIG.API_KEY,
      },
    };

    try {
      console.log('Fetching property availability from API...');
      const response = await axios.request(options);
      console.log('Successfully fetched availability data');
      return response.data;
    } catch (error) {
      console.error('Error fetching availability data, using mock data:', error);
      return Mock_availabilities;
    }
  }


  // async getRates(
  //   startDate: string,
  //   endDate: string,
  //   propertyId: number = LODGIFY_CONFIG.PROPERTY_ID
  // ): Promise<Rate[]> {
  //   try {
  //     const response = await api.get<{ items: Rate[] }>(
  //       ENDPOINTS.PROPERTY_RATES(propertyId),
  //       { start: startDate, end: endDate }
  //     );
  //     return response.items || [];
  //   } catch (error) {
  //     console.error("Error fetching rates:", error);
  //     throw new Error("Failed to fetch property rates");
  //   }
  // }

  //   async getTotalPrice(
  //     startDate: string,
  //     endDate: string,
  //     propertyId: number = LODGIFY_CONFIG.PROPERTY_ID
  //   ): Promise<number> {
  //     try {
  //       const rates = await this.getRates(startDate, endDate, propertyId);
  //       return rates.reduce((total, rate) => total + rate.dailyRate, 0);
  //     } catch (error) {
  //       console.error("Error calculating total price:", error);
  //       throw new Error("Failed to calculate total price");
  //     }
  //   }
}

// Export a singleton instance
export const propertyService = new PropertyService();
