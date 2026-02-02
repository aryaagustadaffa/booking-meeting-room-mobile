export type UserRole = 'USER' | 'ADMIN';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  location: string;
  images: string[];
  amenities: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  roomId: string;
  room?: Room;
  userId: string;
  user?: User;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  roomId: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface UpdateBookingRequest {
  title?: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export interface ApprovalRequest {
  bookingId: string;
  status: 'confirmed' | 'rejected';
  rejectionReason?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface RoomAvailability {
  roomId: string;
  date: string;
  slots: TimeSlot[];
}
