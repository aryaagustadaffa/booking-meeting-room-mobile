import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useBookings } from '../hooks';
import { PrimaryButton } from '../components';
import { useMainTabNavigation } from '../navigation';

export const AdminScreen = () => {
  const theme = useAppTheme();
  const navigation = useMainTabNavigation();

  const { data: bookingsData } = useBookings({ status: 'pending' });
  const pendingBookings = bookingsData?.data || [];

  const handleManageRooms = () => {
    // Navigate to rooms management
  };

  const handleApprovals = () => {
    navigation.navigate('AdminApproval');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.colors.primaryContainer,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.xl,
              },
            ]}
          >
            <Ionicons
              name="time-outline"
              size={32}
              color={theme.colors.primary}
            />
            <Text
              style={[
                styles.statNumber,
                {
                  color: theme.colors.primary,
                  fontSize: theme.typography.fontSize.xxxl,
                  fontWeight: '700' as const,
                  marginTop: theme.spacing.md,
                },
              ]}
            >
              {pendingBookings.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.onPrimaryContainer,
                  fontSize: theme.typography.fontSize.md,
                  marginTop: theme.spacing.xs,
                },
              ]}
            >
              Pending Approvals
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.onSurface,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: '700' as const,
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            Quick Actions
          </Text>

          <PrimaryButton
            title="Approve Bookings"
            onPress={handleApprovals}
            fullWidth
            style={{ marginBottom: theme.spacing.md }}
            leftIcon={
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={theme.colors.onPrimary}
              />
            }
          />

          <PrimaryButton
            title="Manage Rooms"
            onPress={handleManageRooms}
            fullWidth
            variant="outlined"
            style={{ marginBottom: theme.spacing.md }}
            leftIcon={
              <Ionicons
                name="business-outline"
                size={20}
                color={theme.colors.primary}
              />
            }
          />

          <PrimaryButton
            title="View All Bookings"
            onPress={() => {}}
            fullWidth
            variant="outlined"
            leftIcon={
              <Ionicons
                name="list-outline"
                size={20}
                color={theme.colors.primary}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.onSurface,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: '700' as const,
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            Recent Pending Bookings
          </Text>

          {pendingBookings.length > 0 ? (
            pendingBookings.slice(0, 5).map((booking) => (
              <View
                key={booking.id}
                style={[
                  styles.bookingItem,
                  {
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.md,
                    marginBottom: theme.spacing.sm,
                    borderWidth: 1,
                    borderColor: theme.colors.outlineVariant,
                  },
                ]}
              >
                <View style={styles.bookingHeader}>
                  <Text
                    style={[
                      styles.bookingTitle,
                      {
                        color: theme.colors.onSurface,
                        fontSize: theme.typography.fontSize.md,
                        fontWeight: '600' as const,
                      },
                    ]}
                  >
                    {booking.title}
                  </Text>
                  <Text
                    style={[
                      styles.bookingDate,
                      {
                        color: theme.colors.onSurfaceVariant,
                        fontSize: theme.typography.fontSize.sm,
                      },
                    ]}
                  >
                    {booking.date}
                  </Text>
                </View>
                <View style={styles.bookingDetails}>
                  <Text
                    style={[
                      styles.bookingRoom,
                      {
                        color: theme.colors.onSurfaceVariant,
                        fontSize: theme.typography.fontSize.sm,
                      },
                    ]}
                  >
                    🏢 {booking.room?.name || 'Unknown Room'}
                  </Text>
                  <Text
                    style={[
                      styles.bookingUser,
                      {
                        color: theme.colors.onSurfaceVariant,
                        fontSize: theme.typography.fontSize.sm,
                      },
                    ]}
                  >
                    👤 {booking.user?.name || 'Unknown User'}
                  </Text>
                </View>
              </View>
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
              <Text style={styles.emptyEmoji}>✅</Text>
              <Text
                style={[
                  styles.emptyText,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.md,
                    marginTop: theme.spacing.md,
                  },
                ]}
              >
                All caught up!
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontSize: theme.typography.fontSize.sm,
                    marginTop: theme.spacing.xs,
                  },
                ]}
              >
                No pending approvals
              </Text>
            </View>
          )}
        </View>
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
  statsContainer: {
    marginBottom: 24,
  },
  statCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {},
  statLabel: {
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {},
  bookingItem: {},
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingTitle: {
    flex: 1,
  },
  bookingDate: {},
  bookingDetails: {
    gap: 4,
  },
  bookingRoom: {},
  bookingUser: {},
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubtext: {
    textAlign: 'center',
  },
});
