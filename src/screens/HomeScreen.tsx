import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BookingCard, PrimaryButton, ProfileHeader } from '../components';
import { useBookings, useRooms } from '../hooks';
import { useMainTabNavigation } from '../navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HomeScreen = () => {
  const theme = useAppTheme();
  const navigation = useMainTabNavigation();
  // const { user } = useAuthStore();

  const { data: bookingsData, isLoading, refetch } = useBookings({ limit: 10 });
  const { data: roomsData } = useRooms({ limit: 5 });

  const bookings = bookingsData?.data || [];
  const rooms = roomsData?.data || [];

  const handleCreateBooking = () => {
    navigation.navigate('CreateBooking');
  };

  const handleBookingPress = (bookingId: string) => {
    navigation.navigate('BookingDetail', { bookingId });
  };

  // const renderBooking = ({ item }: { item: any }) => (
  //   <BookingCard booking={item} onPress={() => handleBookingPress(item.id)} />
  // );

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
        <View style={styles.section}>
          <ProfileHeader />
        </View>

        <View style={[styles.section, { marginTop: theme.spacing.lg }]}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: '700' as const,
                },
              ]}
            >
              Available Rooms
            </Text>
            <PrimaryButton title="View All" variant="text" onPress={() => {}} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.roomsScroll}
          >
            {rooms.map(room => (
              <View
                key={room.id}
                style={[
                  styles.roomCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.borderRadius.xl,
                    width: SCREEN_WIDTH * 0.7,
                    marginRight: theme.spacing.md,
                  },
                ]}
              >
                {room.images?.[0] && (
                  <View style={styles.roomImageContainer}>
                    <Text style={styles.roomImagePlaceholder}>🖼️</Text>
                  </View>
                )}
                <View style={styles.roomInfo}>
                  <Text
                    style={[
                      styles.roomName,
                      {
                        color: theme.colors.onSurface,
                        fontSize: theme.typography.fontSize.md,
                        fontWeight: '600' as const,
                      },
                    ]}
                  >
                    {room.name}
                  </Text>
                  <View style={styles.roomDetails}>
                    <View style={styles.roomDetail}>
                      <Ionicons
                        name="people-outline"
                        size={16}
                        color={theme.colors.onSurfaceVariant}
                      />
                      <Text
                        style={[
                          styles.roomDetailText,
                          {
                            color: theme.colors.onSurfaceVariant,
                            fontSize: theme.typography.fontSize.sm,
                          },
                        ]}
                      >
                        {room.capacity} people
                      </Text>
                    </View>
                    <View style={styles.roomDetail}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={theme.colors.onSurfaceVariant}
                      />
                      <Text
                        style={[
                          styles.roomDetailText,
                          {
                            color: theme.colors.onSurfaceVariant,
                            fontSize: theme.typography.fontSize.sm,
                          },
                        ]}
                      >
                        {room.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, { marginTop: theme.spacing.xl }]}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: '700' as const,
                },
              ]}
            >
              Recent Bookings
            </Text>
            <PrimaryButton title="View All" variant="text" onPress={() => {}} />
          </View>

          {bookings.length > 0 ? (
            bookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => handleBookingPress(booking.id)}
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
              <Ionicons name="calendar-outline" size={48} color={theme.colors.onSurfaceVariant} />
              <Text
                style={[
                  styles.emptyText,
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontSize: theme.typography.fontSize.md,
                    marginTop: theme.spacing.md,
                  },
                ]}
              >
                No bookings yet
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  {
                    color: theme.colors.outline,
                    fontSize: theme.typography.fontSize.sm,
                    marginTop: theme.spacing.xs,
                  },
                ]}
              >
                Create your first booking to get started
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.fabContainer, { bottom: theme.spacing.xxl + 60 }]}>
        <PrimaryButton
          title="New Booking"
          onPress={handleCreateBooking}
          leftIcon={<Ionicons name="add" size={20} color={theme.colors.onPrimary} />}
          style={[
            styles.fab,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: 28,
              paddingHorizontal: theme.spacing.xxl,
              paddingVertical: theme.spacing.md,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: theme.elevation.md,
            },
          ]}
        />
      </View>
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
    paddingBottom: 120,
  },
  section: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {},
  roomsScroll: {
    paddingRight: 16,
  },
  roomCard: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roomImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomImagePlaceholder: {
    fontSize: 48,
  },
  roomInfo: {
    padding: 16,
  },
  roomName: {
    marginBottom: 8,
  },
  roomDetails: {
    gap: 8,
  },
  roomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomDetailText: {},
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubtext: {
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
