import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme, useBooking, useUpdateBooking } from '../hooks';
import { InputField, PrimaryButton } from '../components';
import { useBookingStore } from '../store';
import { validateBookingTime } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const EditBookingScreen = () => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  // @ts-ignore
  const { bookingId } = route.params;

  const { data: booking, isLoading } = useBooking(bookingId);
  const updateMutation = useUpdateBooking();

  const [errors, setErrors] = useState<{
    date?: string;
    startTime?: string;
    endTime?: string;
    title?: string;
  }>({});

  const {
    // selectedRoom,
    selectedDate,
    selectedStartTime,
    selectedEndTime,
    bookingTitle,
    bookingDescription,
    // setSelectedRoom,
    // setSelectedDate,
    // setSelectedStartTime,
    // setSelectedEndTime,
    setBookingTitle,
    setBookingDescription,
    resetBookingForm,
    setBookingFromEdit,
  } = useBookingStore();

  const handleTitleChange = (text: string) => {
    setBookingTitle(text);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  };

  const handleDescriptionChange = (text: string) => {
    setBookingDescription(text);
  };

  useEffect(() => {
    if (booking) {
      setBookingFromEdit(booking);
      setErrors({});
    }
    return () => {
      resetBookingForm();
    };
  }, [booking]);

  const validateForm = () => {
    const newErrors: {
      date?: string;
      startTime?: string;
      endTime?: string;
      title?: string;
    } = {};

    if (!selectedDate) {
      newErrors.date = 'Please select a date';
    }

    if (!selectedStartTime) {
      newErrors.startTime = 'Please select start time';
    }

    if (!selectedEndTime) {
      newErrors.endTime = 'Please select end time';
    }

    if (!bookingTitle.trim()) {
      newErrors.title = 'Please enter a booking title';
    }

    if (selectedStartTime && selectedEndTime) {
      const timeValidation = validateBookingTime(
        selectedStartTime,
        selectedEndTime
      );
      if (!timeValidation.isValid) {
        newErrors.endTime = timeValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateMutation.mutate(
        {
          id: bookingId,
          data: {
            title: bookingTitle,
            description: bookingDescription,
            date: selectedDate!.toISOString().split('T')[0],
            startTime: selectedStartTime!,
            endTime: selectedEndTime!,
          },
        },
        {
          onSuccess: () => {
            Alert.alert('Success', 'Booking updated successfully');
            navigation.goBack();
          },
          onError: (error: any) => {
            Alert.alert('Error', error.response?.data?.message || 'Failed to update booking');
          },
        }
      );
    }
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

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
      >
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              {
                color: theme.colors.onSurfaceVariant,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: '600' as const,
                textTransform: 'uppercase' as const,
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            Room Information
          </Text>

          <View
            style={[
              styles.roomInfo,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.lg,
                borderWidth: 1,
                borderColor: theme.colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.infoRow}>
              <Ionicons
                name="business-outline"
                size={24}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.roomName,
                  {
                    color: theme.colors.onSurface,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: '600' as const,
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
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.roomLocation,
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontSize: theme.typography.fontSize.md,
                  },
                ]}
              >
                {booking.room?.location || 'Unknown Location'}
              </Text>
            </View>
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
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            Date & Time
          </Text>

          <InputField
            label="Date"
            value={selectedDate ? selectedDate.toLocaleDateString() : ''}
            editable={false}
            leftIcon={
              <Text style={{ fontSize: 20 }}>📅</Text>
            }
          />

          <InputField
            label="Start Time"
            value={selectedStartTime || ''}
            editable={false}
            leftIcon={
              <Text style={{ fontSize: 20 }}>🕐</Text>
            }
          />

          <InputField
            label="End Time"
            value={selectedEndTime || ''}
            editable={false}
            leftIcon={
              <Text style={{ fontSize: 20 }}>🕑</Text>
            }
          />
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
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            Booking Details
          </Text>

          <InputField
            label="Title"
            placeholder="Meeting title"
            value={bookingTitle}
            onChangeText={handleTitleChange}
            error={errors.title}
            leftIcon={
              <Text style={{ fontSize: 20 }}>📝</Text>
            }
          />

          <InputField
            label="Description (Optional)"
            placeholder="Meeting description"
            value={bookingDescription}
            onChangeText={handleDescriptionChange}
            multiline
            numberOfLines={3}
            leftIcon={
              <Text style={{ fontSize: 20 }}>📄</Text>
            }
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.surface,
            paddingBottom: insets.bottom + theme.spacing.lg,
            paddingHorizontal: theme.spacing.lg,
            borderTopColor: theme.colors.outlineVariant,
          },
        ]}
      >
        <PrimaryButton
          title="Update Booking"
          onPress={handleSubmit}
          loading={updateMutation.isPending}
          fullWidth
          style={{
            backgroundColor: theme.colors.primary,
          }}
        />
      </View>
    </KeyboardAvoidingView>
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
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {},
  roomInfo: {},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  roomName: {
    flex: 1,
  },
  roomLocation: {},
  fab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
  },
});
