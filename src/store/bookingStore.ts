import { create } from 'zustand';
import type { Booking, Room } from '../types';

interface BookingState {
  selectedRoom: Room | null;
  selectedDate: Date | null;
  selectedStartTime: string | null;
  selectedEndTime: string | null;
  bookingTitle: string;
  bookingDescription: string;
  setSelectedRoom: (room: Room | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedStartTime: (time: string | null) => void;
  setSelectedEndTime: (time: string | null) => void;
  setBookingTitle: (title: string) => void;
  setBookingDescription: (description: string) => void;
  resetBookingForm: () => void;
  setBookingFromEdit: (booking: Booking) => void;
}

const initialState = {
  selectedRoom: null,
  selectedDate: null,
  selectedStartTime: null,
  selectedEndTime: null,
  bookingTitle: '',
  bookingDescription: '',
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setSelectedStartTime: (selectedStartTime) => set({ selectedStartTime }),
  setSelectedEndTime: (selectedEndTime) => set({ selectedEndTime }),
  setBookingTitle: (bookingTitle) => set({ bookingTitle }),
  setBookingDescription: (bookingDescription) => set({ bookingDescription }),
  resetBookingForm: () => set(initialState),
  setBookingFromEdit: (booking) =>
    set({
      selectedRoom: booking.room || null,
      selectedDate: new Date(booking.date),
      selectedStartTime: booking.startTime,
      selectedEndTime: booking.endTime,
      bookingTitle: booking.title,
      bookingDescription: booking.description || '',
    }),
}));
