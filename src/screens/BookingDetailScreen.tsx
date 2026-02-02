import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton, RoomGallery, StatusBadge } from '../components';
import { useAppTheme, useBooking, useCancelBooking } from '../hooks';
import { useRootStackNavigation } from '../navigation';
import { format, formatTime } from '../utils';

export const BookingDetailScreen = () => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useRootStackNavigation();

  // @ts-ignore
  const { bookingId } = route.params;

  const { data: booking, isLoading } = useBooking(bookingId);
  const cancelMutation = useCancelBooking();

  const handleCancel = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            cancelMutation.mutate(bookingId, {
              onSuccess: () => {
                Alert.alert('Success', 'Booking cancelled successfully');
                navigation.goBack();
              },
              onError: (error: any) => {
                Alert.alert('Error', error.response?.data?.message || 'Failed to cancel booking');
              },
            });
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditBooking', { bookingId });
  };

  if (isLoading || !booking) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';
  const canEdit = booking.status === 'pending';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {booking.room?.images && booking.room.images.length > 0 && (
          <RoomGallery images={booking.room.images} />
        )}

        <View
          style={[
            styles.content,
            {
              backgroundColor: theme.colors.surface,
              borderTopLeftRadius: theme.borderRadius.xxl,
              borderTopRightRadius: theme.borderRadius.xxl,
              marginTop: -theme.borderRadius.xl,
              paddingTop: theme.spacing.xxl,
              paddingHorizontal: theme.spacing.lg,
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: '700' as const,
                  },
                ]}
              >
                {booking.title}
              </Text>
              <StatusBadge status={booking.status} size="medium" />
            </View>
          </View>

          <View style={styles.section}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color: theme.colors.onSurfaceVariant,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: '600' as const,
                  textTransform: 'uppercase' as const,
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              Room Information
            </Text>

            <View style={styles.infoRow}>
              <Ionicons
                name="business-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                {booking.room?.name || 'Unknown Room'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="location-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                {booking.room?.location || 'Unknown Location'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="people-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                Capacity: {booking.room?.capacity || 0} people
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color: theme.colors.onSurfaceVariant,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: '600' as const,
                  textTransform: 'uppercase' as const,
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              Booking Details
            </Text>

            <View style={styles.infoRow}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                {format(booking.date)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="time-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </Text>
            </View>

            {booking.description && (
              <View style={styles.descriptionContainer}>
                <Text
                  style={[
                    styles.descriptionLabel,
                    {
                      color: theme.colors.onSurfaceVariant,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: '600' as const,
                      marginBottom: theme.spacing.xs,
                    },
                  ]}
                >
                  Description
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {
                      color: theme.colors.onSurface,
                      fontSize: theme.typography.fontSize.md,
                    },
                  ]}
                >
                  {booking.description}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color: theme.colors.onSurfaceVariant,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: '600' as const,
                  textTransform: 'uppercase' as const,
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              Organizer
            </Text>

            <View style={styles.infoRow}>
              <Ionicons
                name="person-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                {booking.user?.name || 'Unknown User'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.infoText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                {booking.user?.email || 'Unknown Email'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {(canCancel || canEdit) && (
        <View
          style={[
            styles.actions,
            {
              backgroundColor: theme.colors.surface,
              paddingBottom: insets.bottom + theme.spacing.lg,
              paddingHorizontal: theme.spacing.lg,
              borderTopColor: theme.colors.outlineVariant,
            },
          ]}
        >
          {canEdit && (
            <PrimaryButton
              title="Edit Booking"
              onPress={handleEdit}
              variant="outlined"
              style={{ marginBottom: theme.spacing.md }}
              leftIcon={
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              }
            />
          )}
          {canCancel && (
            <PrimaryButton
              title="Cancel Booking"
              onPress={handleCancel}
              loading={cancelMutation.isPending}
              variant="outlined"
              style={[
                styles.cancelButton,
                {
                  borderColor: theme.colors.error,
                },
              ]}
              textStyle={{
                color: theme.colors.error,
              }}
              leftIcon={
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color={theme.colors.error}
                />
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {},
  header: {
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionLabel: {},
  descriptionText: {
    lineHeight: 24,
  },
  actions: {
    borderTopWidth: 1,
  },
  cancelButton: {},
});
