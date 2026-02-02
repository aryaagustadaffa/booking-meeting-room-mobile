import { useColorScheme } from 'react-native';

export const lightColors = {
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  secondary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceVariant: '#E8E8E8',
  error: '#B00020',
  errorContainer: '#F9DEDC',
  onBackground: '#1C1B1F',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  inverseSurface: '#313033',
  inverseOnSurface: '#F4EFF4',
  inversePrimary: '#81C784',
  shadow: '#000000',
  scrim: '#000000',
  surfaceTint: '#4CAF50',
  status: {
    pending: '#FFA000',
    confirmed: '#4CAF50',
    cancelled: '#F44336',
    rejected: '#F44336',
  },
};

export const darkColors = {
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  secondary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  background: '#1C1B1F',
  surface: '#2B2930',
  surfaceVariant: '#49454F',
  error: '#FFB4AB',
  errorContainer: '#93000A',
  onBackground: '#E6E1E5',
  onSurface: '#E6E1E5',
  onSurfaceVariant: '#CAC4D0',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  outline: '#938F99',
  outlineVariant: '#49454F',
  inverseSurface: '#E6E1E5',
  inverseOnSurface: '#313033',
  inversePrimary: '#2E7D32',
  shadow: '#000000',
  scrim: '#000000',
  surfaceTint: '#81C784',
  status: {
    pending: '#FFB300',
    confirmed: '#66BB6A',
    cancelled: '#EF5350',
    rejected: '#EF5350',
  },
};

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
    colorScheme,
  };
};

export type AppColors = typeof lightColors;
