import { apiClient } from './api';
import type { Room, PaginatedResponse, ApiResponse } from '../types';

export const roomService = {
  async getRooms(params?: {
    page?: number;
    limit?: number;
    isAvailable?: boolean;
  }): Promise<PaginatedResponse<Room>> {
    const response = await apiClient.get<PaginatedResponse<Room>>('/rooms', { params });
    return response.data;
  },

  async getRoomById(id: string): Promise<Room> {
    const response = await apiClient.get<Room>(`/rooms/${id}`);
    return response.data;
  },

  async createRoom(data: Partial<Room>): Promise<Room> {
    const response = await apiClient.post<Room>('/rooms', data);
    return response.data;
  },

  async updateRoom(id: string, data: Partial<Room>): Promise<Room> {
    const response = await apiClient.put<Room>(`/rooms/${id}`, data);
    return response.data;
  },

  async deleteRoom(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(`/rooms/${id}`);
    return response.data;
  },

  async uploadRoomImages(roomId: string, images: string[]): Promise<ApiResponse<Room>> {
    const response = await apiClient.post<ApiResponse<Room>>(`/rooms/${roomId}/images`, { images });
    return response.data;
  },

  async deleteRoomImage(roomId: string, imageId: string): Promise<ApiResponse<Room>> {
    const response = await apiClient.delete<ApiResponse<Room>>(`/rooms/${roomId}/images/${imageId}`);
    return response.data;
  },

  async reorderRoomImages(roomId: string, imageIds: string[]): Promise<ApiResponse<Room>> {
    const response = await apiClient.put<ApiResponse<Room>>(`/rooms/${roomId}/images/reorder`, {
      imageIds,
    });
    return response.data;
  },
};
