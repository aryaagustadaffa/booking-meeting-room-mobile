import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { SegmentedButtons } from 'react-native-paper';
import { useMyBookings } from '../hooks';
import { BookingCard } from '../components';
import { useMainTabNavigation } from '../navigation';

type FilterType = 'all' | 'pending' | 'confirmed' | 'cancelled';

export const MyBookingsScreen = () => {
  const theme = useAppTheme();
  const navigation = useMainTabNavigation();
  const [filter, setFilter] = useState<FilterType>('all');

  const { data: bookingsData, isLoading, refetch } = useMyBookings({
    status: filter === 'all' ? undefined : filter,
  });

  const bookings = bookingsData?.data || [];

  const handleBookingPress = (bookingId: string) => {
    navigation.navigate('BookingDetail', { bookingId });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.filterContainer}>
          <SegmentedButtons
            value={filter}
            onValueChange={(value) => setFilter(value as FilterType)}
            buttons={[
              { value: 'all', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            style={{
              backgroundColor: theme.colors.surfaceVariant,
            }}
          />
        </View>

        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onPress={() => handleBookingPress(booking.id)}
              showActions={booking.status === 'pending'}
              onCancel={() => {}}
              onEdit={() => {}}
            />
          ))
        ) : (
          <View
            style={[
              styles.emptyState,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.xxl,
              },
            ]}
          >
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text
              style={[
                styles.emptyText,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: '600' as const,
                  marginTop: theme.spacing.md,
                },
              ]}
            >
              No bookings found
            </Text>
            <Text
              style={[
                styles.emptySubtext,
                {
                  color: theme.colors.onSurfaceVariant,
                  fontSize: theme.typography.fontSize.md,
                  marginTop: theme.spacing.xs,
                },
              ]}
            >
              {filter === 'all'
                ? "You haven't made any bookings yet"
                : `No ${filter} bookings`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  filterContainer: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyEmoji: {
    fontSize: 64,
  },
  emptyText: {
    textAlign: 'center',
  },
  emptySubtext: {
    textAlign: 'center',
  },
});
