import { apiClient } from './api';
import type {
  Booking,
  CreateBookingRequest,
  UpdateBookingRequest,
  PaginatedResponse,
  ApiResponse,
  RoomAvailability,
} from '../types';

export const bookingService = {
  async getBookings(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Booking>> {
    const response = await apiClient.get<PaginatedResponse<Booking>>('/bookings', { params });
    return response.data;
  },

  async getMyBookings(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Booking>> {
    const response = await apiClient.get<PaginatedResponse<Booking>>('/bookings/my', { params });
    return response.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await apiClient.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    const response = await apiClient.post<Booking>('/bookings', data);
    return response.data;
  },

  async updateBooking(id: string, data: UpdateBookingRequest): Promise<Booking> {
    const response = await apiClient.put<Booking>(`/bookings/${id}`, data);
    return response.data;
  },

  async cancelBooking(id: string): Promise<ApiResponse<Booking>> {
    const response = await apiClient.post<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
    return response.data;
  },

  async approveBooking(id: string): Promise<ApiResponse<Booking>> {
    const response = await apiClient.post<ApiResponse<Booking>>(`/bookings/${id}/status `);
    return response.data;
  },

  async rejectBooking(id: string, reason?: string): Promise<ApiResponse<Booking>> {
    const response = await apiClient.post<ApiResponse<Booking>>(`/bookings/${id}/reject`, { reason });
    return response.data;
  },

  async getRoomAvailability(roomId: string, date: string): Promise<RoomAvailability> {
    const response = await apiClient.get<RoomAvailability>(`/rooms/${roomId}/availability`, {
      params: { date },
    });
    return response.data;
  },
};
