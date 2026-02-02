export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  BookingDetail: { bookingId: string };
  CreateBooking: undefined;
  EditBooking: { bookingId: string };
  Profile: undefined;
  Settings: undefined;
  AdminApproval: undefined;
  RoomDetail: { roomId: string };
};

export type MainTabParamList = {
  Home: undefined;
  MyBookings: undefined;
  Admin: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
