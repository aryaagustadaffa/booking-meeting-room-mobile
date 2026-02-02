import { useNavigation as useReactNavigation } from '@react-navigation/native';
import type {
  CompositeNavigationProp,
  NavigationProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type {
  RootStackParamList,
  MainTabParamList,
  AuthStackParamList,
} from './types';

// Navigation prop for screens in the main tabs (Home, MyBookings, Admin, Profile)
// These screens can navigate to both tab screens and stack screens
export type MainTabScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

// Navigation prop for screens in the auth stack (Login, Register)
export type AuthStackScreenNavigationProp = NavigationProp<AuthStackParamList>;

// Navigation prop for screens in the root stack (BookingDetail, CreateBooking, EditBooking, AdminApproval)
export type RootStackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Typed hooks for different screen contexts
export const useMainTabNavigation = (): MainTabScreenNavigationProp => {
  return useReactNavigation<MainTabScreenNavigationProp>();
};

export const useAuthStackNavigation = (): AuthStackScreenNavigationProp => {
  return useReactNavigation<AuthStackScreenNavigationProp>();
};

export const useRootStackNavigation = (): RootStackScreenNavigationProp => {
  return useReactNavigation<RootStackScreenNavigationProp>();
};
