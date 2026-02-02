import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { BookingStatus } from '../types';

interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'small' | 'medium' | 'large';
}

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: 'clock-outline',
  },
  confirmed: {
    label: 'Confirmed',
    icon: 'check-circle-outline',
  },
  cancelled: {
    label: 'Cancelled',
    icon: 'close-circle-outline',
  },
  rejected: {
    label: 'Rejected',
    icon: 'close-circle-outline',
  },
};

const sizeConfig = {
  small: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    iconSize: 12,
  },
  medium: {
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    iconSize: 14,
  },
  large: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    iconSize: 16,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'medium' }) => {
  const theme = useAppTheme();
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return theme.colors?.pending || '#FFA000';
      case 'confirmed':
        return theme.colors?.confirmed || '#4CAF50';
      case 'cancelled':
      case 'rejected':
        return theme.colors?.cancelled || '#F44336';
      default:
        return theme.colors.outline;
    }
  };

  const getStatusBackgroundColor = () => {
    const color = getStatusColor();
    return `${color}20`; // 20 = ~12% opacity
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getStatusBackgroundColor(),
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
          borderRadius: theme.borderRadius.md,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getStatusColor(),
            fontSize: sizeStyles.fontSize,
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});
