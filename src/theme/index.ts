import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { lightColors, darkColors, useAppTheme, AppColors } from './colors';
import { spacing, borderRadius, elevation, typography } from './spacing';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: lightColors.primary[500],
    primaryContainer: lightColors.primary[100],
    secondary: lightColors.secondary[500],
    secondaryContainer: lightColors.secondary[100],
    background: lightColors.background,
    surface: lightColors.surface,
    surfaceVariant: lightColors.surfaceVariant,
    error: lightColors.error,
    errorContainer: lightColors.errorContainer,
    onBackground: lightColors.onBackground,
    onSurface: lightColors.onSurface,
    onSurfaceVariant: lightColors.onSurfaceVariant,
    onPrimary: lightColors.onPrimary,
    onSecondary: lightColors.onSecondary,
    outline: lightColors.outline,
    outlineVariant: lightColors.outlineVariant,
    inverseSurface: lightColors.inverseSurface,
    inverseOnSurface: lightColors.inverseOnSurface,
    inversePrimary: lightColors.inversePrimary,
    shadow: lightColors.shadow,
    scrim: lightColors.scrim,
    surfaceTint: lightColors.surfaceTint,
    ...lightColors.status,
  },
  spacing,
  borderRadius,
  elevation,
  typography,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkColors.primary[500],
    primaryContainer: darkColors.primary[900],
    secondary: darkColors.secondary[500],
    secondaryContainer: darkColors.secondary[900],
    background: darkColors.background,
    surface: darkColors.surface,
    surfaceVariant: darkColors.surfaceVariant,
    error: darkColors.error,
    errorContainer: darkColors.errorContainer,
    onBackground: darkColors.onBackground,
    onSurface: darkColors.onSurface,
    onSurfaceVariant: darkColors.onSurfaceVariant,
    onPrimary: darkColors.onPrimary,
    onSecondary: darkColors.onSecondary,
    outline: darkColors.outline,
    outlineVariant: darkColors.outlineVariant,
    inverseSurface: darkColors.inverseSurface,
    inverseOnSurface: darkColors.inverseOnSurface,
    inversePrimary: darkColors.inversePrimary,
    shadow: darkColors.shadow,
    scrim: darkColors.scrim,
    surfaceTint: darkColors.surfaceTint,
    ...darkColors.status,
  },
  spacing,
  borderRadius,
  elevation,
  typography,
};

export type AppTheme = typeof lightTheme;
export { useAppTheme, lightColors, darkColors, AppColors };
export { spacing, borderRadius, elevation, typography };
