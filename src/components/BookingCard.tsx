import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, formatTime } from '../utils';
import { StatusBadge } from './StatusBadge';
import type { Booking } from '../types';
import { useAppTheme } from '@/hooks/useAppTheme';

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
  showActions?: boolean;
  onCancel?: () => void;
  onEdit?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPress,
  showActions = false,
  onCancel,
  onEdit,
}) => {
  const theme = useAppTheme();

  const roomImage = booking.room?.images?.[0] || null;
  const roomName = booking.room?.name || 'Unknown Room';
  const userName = booking.user?.name || 'Unknown User';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.xl,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: theme.elevation.sm,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {roomImage && (
        <Image
          source={{ uri: roomImage }}
          style={styles.roomImage}
          resizeMode="cover"
        />
      )}

      <View
        style={[
          styles.content,
          {
            padding: theme.spacing.lg,
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.roomIcon,
                {
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
            >
              <Ionicons
                name="business-outline"
                size={20}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.roomInfo}>
              <View style={styles.roomNameRow}>
                <Text
                  style={[
                    styles.roomName,
                    {
                      color: theme.colors.onSurface,
                      fontSize: theme.typography.fontSize.md,
                      fontWeight: '600' as const,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {roomName}
                </Text>
                <StatusBadge status={booking.status} size="small" />
              </View>
              <Text
                style={[
                  styles.userName,
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontSize: theme.typography.fontSize.sm,
                  },
                ]}
                numberOfLines={1}
              >
                {userName}
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
        </View>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: theme.colors.outlineVariant,
            },
          ]}
        />

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.detailText,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.sm,
                },
              ]}
            >
              {format(booking.date)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="time-outline"
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.detailText,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.sm,
                },
              ]}
            >
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </Text>
          </View>
        </View>

        {booking.title && (
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.sm,
                },
              ]}
              numberOfLines={2}
            >
              {booking.title}
            </Text>
          </View>
        )}

        {showActions && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: theme.colors.surfaceVariant,
                    borderColor: theme.colors.outline,
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
                onPress={onEdit}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="create-outline"
                  size={18}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            )}
            {onCancel && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: theme.colors.errorContainer,
                    borderColor: theme.colors.error,
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={18}
                  color={theme.colors.error}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  roomImage: {
    width: '100%',
    height: 120,
  },
  content: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roomIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roomInfo: {
    flex: 1,
  },
  roomNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  roomName: {
    flex: 1,
  },
  userName: {},
  divider: {
    height: 1,
    marginBottom: 12,
  },
  details: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 12,
  },
  title: {
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    flex: 1,
  },
});
