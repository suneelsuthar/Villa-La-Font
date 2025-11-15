import { api } from './api';
import { ENDPOINTS } from '../config/lodgify';

export interface BookingRequest {
  propertyId: number;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  adults: number;
  children?: number;
  specialRequests?: string;
  paymentMethod?: string;
}

export interface BookingResponse {
  id: number;
  reference: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  currency: string;
  guestName: string;
  propertyName: string;
  createdAt: string;
}

export interface BookingDetails extends BookingResponse {
  propertyId: number;
  adults: number;
  children: number;
  specialRequests?: string;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  cancellationPolicy?: string;
}

export const bookingService = {
  /**
   * Create a new booking
   */
  createBooking: async (bookingData: BookingRequest): Promise<BookingResponse> => {
    const payload = {
      property_id: bookingData.propertyId,
      check_in: bookingData.checkIn,
      check_out: bookingData.checkOut,
      guest: {
        name: bookingData.guestName,
        email: bookingData.guestEmail,
        phone: bookingData.guestPhone,
      },
      guests: {
        adults: bookingData.adults,
        children: bookingData.children || 0,
      },
      notes: bookingData.specialRequests,
      payment_method: bookingData.paymentMethod || 'credit_card',
    };

    return api.post<BookingResponse>(ENDPOINTS.BOOKINGS, payload);
  },

  /**
   * Get booking by ID
   */
  getBooking: async (bookingId: number): Promise<BookingDetails> => {
    return api.get<BookingDetails>(`${ENDPOINTS.BOOKINGS}/${bookingId}`);
  },

  /**
   * Update booking
   */
  updateBooking: async (
    bookingId: number,
    updateData: Partial<BookingRequest>
  ): Promise<BookingResponse> => {
    return api.put<BookingResponse>(`${ENDPOINTS.BOOKINGS}/${bookingId}`, updateData);
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (bookingId: number): Promise<{ success: boolean }> => {
    return api.delete<{ success: boolean }>(`${ENDPOINTS.BOOKINGS}/${bookingId}`);
  },

  /**
   * Get booking by reference number
   */
  getBookingByReference: async (reference: string): Promise<BookingDetails> => {
    return api.get<BookingDetails>(`${ENDPOINTS.BOOKINGS}/reference/${reference}`);
  },
};
