import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Text,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useBookings, useApproveBooking, useRejectBooking } from '../hooks';
import { BookingCard, PrimaryButton } from '../components';

export const AdminApprovalScreen = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  const { data: bookingsData, isLoading, refetch } = useBookings({
    status: filter === 'pending' ? 'pending' : undefined,
  });

  const approveMutation = useApproveBooking();
  const rejectMutation = useRejectBooking();

  const [rejectDialogVisible, setRejectDialogVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (bookingId: string) => {
    Alert.alert(
      'Approve Booking',
      'Are you sure you want to approve this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          style: 'default',
          onPress: () => {
            approveMutation.mutate(bookingId, {
              onSuccess: () => {
                Alert.alert('Success', 'Booking approved successfully');
              },
              onError: (error: any) => {
                Alert.alert('Error', error.response?.data?.message || 'Failed to approve booking');
              },
            });
          },
        },
      ]
    );
  };

  const handleReject = (booking: any) => {
    setSelectedBooking(booking);
    setRejectionReason('');
    setRejectDialogVisible(true);
  };

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      Alert.alert('Error', 'Please provide a reason for rejection');
      return;
    }

    rejectMutation.mutate(
      { id: selectedBooking.id, reason: rejectionReason },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Booking rejected successfully');
          setRejectDialogVisible(false);
          setSelectedBooking(null);
          setRejectionReason('');
        },
        onError: (error: any) => {
          Alert.alert('Error', error.response?.data?.message || 'Failed to reject booking');
        },
      }
    );
  };

  const bookings = bookingsData?.data || [];
  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.filterContainer}>
          <PrimaryButton
            title="Pending"
            onPress={() => setFilter('pending')}
            variant={filter === 'pending' ? 'contained' : 'outlined'}
            style={{ flex: 1, marginRight: 8 }}
          />
          <PrimaryButton
            title="All"
            onPress={() => setFilter('all')}
            variant={filter === 'all' ? 'contained' : 'outlined'}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {filter === 'pending' ? (
          pendingBookings.length > 0 ? (
            pendingBookings.map((booking) => (
              <View key={booking.id}>
                <BookingCard
                  booking={booking}
                  onPress={() => {}}
                  showActions={false}
                />
                <View
                  style={[
                    styles.actions,
                    {
                      backgroundColor: theme.colors.surface,
                      paddingHorizontal: theme.spacing.lg,
                      paddingVertical: theme.spacing.md,
                    },
                  ]}
                >
                  <PrimaryButton
                    title="Approve"
                    onPress={() => handleApprove(booking.id)}
                    loading={approveMutation.isPending}
                    style={{ flex: 1, marginRight: 8 }}
                    leftIcon={
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={theme.colors.onPrimary}
                      />
                    }
                  />
                  <PrimaryButton
                    title="Reject"
                    onPress={() => handleReject(booking)}
                    loading={rejectMutation.isPending}
                    variant="outlined"
                    style={[
                      styles.rejectButton,
                      {
                        flex: 1,
                        marginLeft: 8,
                        borderColor: theme.colors.error,
                      },
                    ]}
                    textStyle={{ color: theme.colors.error }}
                    leftIcon={
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color={theme.colors.error}
                      />
                    }
                  />
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
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: '600' as const,
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
                    fontSize: theme.typography.fontSize.md,
                    marginTop: theme.spacing.xs,
                  },
                ]}
              >
                No pending approvals
              </Text>
            </View>
          )
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onPress={() => {}}
              showActions={false}
            />
          ))
        )}
      </ScrollView>

      {/* Reject Dialog */}
      {rejectDialogVisible && (
        <View
          style={[
            styles.dialogOverlay,
            {
              backgroundColor: theme.colors.shadow + '80',
            },
          ]}
        >
          <View
            style={[
              styles.dialog,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.xl,
                margin: theme.spacing.lg,
              },
            ]}
          >
            <Text
              style={[
                styles.dialogTitle,
                {
                  color: theme.colors.onSurface,
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: '700' as const,
                  marginBottom: theme.spacing.md,
                },
              ]}
            >
              Reject Booking
            </Text>

            <Text
              style={[
                styles.dialogSubtitle,
                {
                  color: theme.colors.onSurfaceVariant,
                  fontSize: theme.typography.fontSize.md,
                  marginBottom: theme.spacing.lg,
                },
              ]}
            >
              Please provide a reason for rejecting this booking
            </Text>

            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  color: theme.colors.onSurface,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.md,
                  marginBottom: theme.spacing.lg,
                  borderWidth: 1,
                  borderColor: theme.colors.outline,
                },
              ]}
              placeholder="Reason for rejection..."
              placeholderTextColor={theme.colors.outline}
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.dialogActions}>
              <PrimaryButton
                title="Cancel"
                onPress={() => {
                  setRejectDialogVisible(false);
                  setSelectedBooking(null);
                  setRejectionReason('');
                }}
                variant="outlined"
                style={{ flex: 1, marginRight: 8 }}
              />
              <PrimaryButton
                title="Reject"
                onPress={confirmReject}
                loading={rejectMutation.isPending}
                style={[
                  styles.rejectButton,
                  {
                    flex: 1,
                    marginLeft: 8,
                    backgroundColor: theme.colors.error,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  rejectButton: {},
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
  dialogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '90%',
    maxWidth: 400,
  },
  dialogTitle: {},
  dialogSubtitle: {},
  textInput: {
    minHeight: 100,
  },
  dialogActions: {
    flexDirection: 'row',
  },
});
