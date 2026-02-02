import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { roomService } from '../services';

export const useRooms = (params?: { page?: number; limit?: number; isAvailable?: boolean }) => {
  return useQuery({
    queryKey: ['rooms', params],
    queryFn: () => roomService.getRooms(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: () => roomService.getRoomById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomService.createRoom,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => roomService.updateRoom(id, data),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
      await queryClient.invalidateQueries({ queryKey: ['room', id] });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roomService.deleteRoom(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useUploadRoomImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, images }: { roomId: string; images: string[] }) =>
      roomService.uploadRoomImages(roomId, images),
    onSuccess: async (_, { roomId }) => {
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
      await queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    },
  });
};

export const useDeleteRoomImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, imageId }: { roomId: string; imageId: string }) =>
      roomService.deleteRoomImage(roomId, imageId),
    onSuccess: async (_, { roomId }) => {
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
      await queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    },
  });
};

export const useReorderRoomImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, imageIds }: { roomId: string; imageIds: string[] }) =>
      roomService.reorderRoomImages(roomId, imageIds),
    onSuccess: async (_, { roomId }) => {
      await queryClient.invalidateQueries({ queryKey: ['rooms'] });
      await queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    },
  });
};
