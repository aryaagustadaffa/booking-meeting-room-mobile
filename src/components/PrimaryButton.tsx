import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { AppTheme } from '../theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  fullWidth?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'contained',
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const theme: AppTheme = useAppTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xxl,
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (variant) {
      case 'contained':
        return {
          ...baseStyle,
          backgroundColor: disabled || loading
            ? theme.colors.outlineVariant
            : theme.colors.primary,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled || loading
            ? theme.colors.outlineVariant
            : theme.colors.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          paddingHorizontal: theme.spacing.md,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...styles.text,
      fontSize: theme.typography.fontSize.md,
      fontWeight: '600' as const,
    };

    switch (variant) {
      case 'contained':
        return {
          ...baseStyle,
          color: disabled || loading
            ? theme.colors.outline
            : theme.colors.onPrimary,
          ...textStyle,
        };
      case 'outlined':
      case 'text':
        return {
          ...baseStyle,
          color: disabled || loading
            ? theme.colors.outline
            : theme.colors.primary,
          ...textStyle,
        };
      default:
        return {
          ...baseStyle,
          ...textStyle,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'contained' ? theme.colors.onPrimary : theme.colors.primary}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 48,
  },
  text: {
    textAlign: 'center',
  },
});
