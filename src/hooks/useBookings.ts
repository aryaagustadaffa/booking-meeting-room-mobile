import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { bookingService } from '../services';
import type { CreateBookingRequest, UpdateBookingRequest } from '../types';

export const useBookings = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => bookingService.getBookings(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useMyBookings = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: ['my-bookings', params],
    queryFn: () => bookingService.getMyBookings(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useInfiniteBookings = (params?: { limit?: number; status?: string }) => {
  return useInfiniteQuery({
    queryKey: ['bookings', 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      bookingService.getBookings({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequest) => bookingService.createBooking(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingRequest }) =>
      bookingService.updateBooking(id, data),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingService.cancelBooking(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });
};

export const useApproveBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingService.approveBooking(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });
};

export const useRejectBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      bookingService.rejectBooking(id, reason),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      await queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });
};

export const useRoomAvailability = (roomId: string, date: string) => {
  return useQuery({
    queryKey: ['room-availability', roomId, date],
    queryFn: () => bookingService.getRoomAvailability(roomId, date),
    enabled: !!roomId && !!date,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
