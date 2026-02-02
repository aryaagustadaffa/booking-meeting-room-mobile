import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Menu } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DatePicker, InputField, PrimaryButton, RoomGallery, TimePicker } from '../components';
import { useAppTheme, useCreateBooking, useRooms } from '../hooks';
import { useBookingStore } from '../store';
import { validateBookingTime } from '../utils';

export const CreateBookingScreen = () => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const {
    selectedRoom,
    selectedDate,
    selectedStartTime,
    selectedEndTime,
    bookingTitle,
    bookingDescription,
    setSelectedRoom,
    setSelectedDate,
    setSelectedStartTime,
    setSelectedEndTime,
    setBookingTitle,
    setBookingDescription,
    resetBookingForm,
  } = useBookingStore();

  const { data: roomsData } = useRooms({ isAvailable: true });
  const rooms = roomsData?.data || [];

  const [showRoomMenu, setShowRoomMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [errors, setErrors] = useState<{
    room?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    title?: string;
  }>({});

  // const availableTimeSlots = availability?.slots || [];
  const createMutation = useCreateBooking();

  useEffect(() => {
    return () => {
      resetBookingForm();
    };
  }, []);

  const validateForm = () => {
    const newErrors: {
      room?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
      title?: string;
    } = {};

    if (!selectedRoom) {
      newErrors.room = 'Please select a room';
    }

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
      const timeValidation = validateBookingTime(selectedStartTime, selectedEndTime);
      if (!timeValidation.isValid) {
        newErrors.endTime = timeValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      createMutation.mutate(
        {
          roomId: selectedRoom!.id,
          title: bookingTitle,
          description: bookingDescription,
          date: selectedDate!.toISOString().split('T')[0],
          startTime: selectedStartTime!,
          endTime: selectedEndTime!,
        },
        {
          onSuccess: () => {
            Alert.alert('Success', 'Booking created successfully');
            resetBookingForm();
            navigation.goBack();
          },
          onError: (error: any) => {
            Alert.alert('Error', error.response?.data?.message || 'Failed to create booking');
          },
        }
      );
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
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
            Select Room
          </Text>

          <Menu
            visible={showRoomMenu}
            onDismiss={() => setShowRoomMenu(false)}
            anchor={
              <PrimaryButton
                title={selectedRoom?.name || 'Select a room'}
                onPress={() => setShowRoomMenu(true)}
                variant="outlined"
                fullWidth
                rightIcon={<Ionicons name="chevron-down" size={20} color={theme.colors.primary} />}
              />
            }
          >
            {rooms.map(room => (
              <Menu.Item
                key={room.id}
                onPress={() => {
                  setSelectedRoom(room);
                  setShowRoomMenu(false);
                }}
                title={room.name}
              />
            ))}
          </Menu>
          {errors.room && (
            <Text
              style={[
                styles.errorText,
                {
                  color: theme.colors.error,
                  fontSize: theme.typography.fontSize.sm,
                  marginTop: theme.spacing.xs,
                },
              ]}
            >
              {errors.room}
            </Text>
          )}

          {selectedRoom && selectedRoom.images && selectedRoom.images.length > 0 && (
            <RoomGallery images={selectedRoom.images} style={{ marginTop: theme.spacing.md }} />
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
                marginBottom: theme.spacing.md,
              },
            ]}
          >
            Date & Time
          </Text>

          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text
                style={[
                  styles.fieldLabel,
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontSize: theme.typography.fontSize.sm,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                Date
              </Text>
              <PrimaryButton
                title={selectedDate ? formatDate(selectedDate) : 'Select date'}
                onPress={() => setShowDatePicker(true)}
                variant="outlined"
                fullWidth
                rightIcon={
                  <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
                }
              />
              <DatePicker
                visible={showDatePicker}
                onDismiss={() => setShowDatePicker(false)}
                date={selectedDate || new Date()}
                onChange={(event, date) => {
                  if (date) setSelectedDate(date);
                }}
                mode="single"
              />
            </View>
          </View>

          <View style={styles.timeRow}>
            <View style={[styles.timeField, { marginRight: theme.spacing.sm }]}>
              <Text
                style={[
                  styles.fieldLabel,
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontSize: theme.typography.fontSize.sm,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                Start Time
              </Text>
              <PrimaryButton
                title={selectedStartTime || 'Select'}
                onPress={() => setShowStartTimePicker(true)}
                variant="outlined"
                fullWidth
                rightIcon={<Ionicons name="time-outline" size={20} color={theme.colors.primary} />}
              />
              <TimePicker
                visible={showStartTimePicker}
                onDismiss={() => setShowStartTimePicker(false)}
                hours={parseInt(selectedStartTime?.split(':')[0] || '9', 10)}
                minutes={parseInt(selectedStartTime?.split(':')[1] || '0', 10)}
                onChange={(hours, minutes) => {
                  setSelectedStartTime(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                  );
                }}
              />
            </View>

            <View style={[styles.timeField, { marginLeft: theme.spacing.sm }]}>
              <Text
                style={[
                  styles.fieldLabel,
                  {
                    color: theme.colors.onSurfaceVariant,
                    fontSize: theme.typography.fontSize.sm,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                End Time
              </Text>
              <PrimaryButton
                title={selectedEndTime || 'Select'}
                onPress={() => setShowEndTimePicker(true)}
                variant="outlined"
                fullWidth
                rightIcon={<Ionicons name="time-outline" size={20} color={theme.colors.primary} />}
              />
              <TimePicker
                visible={showEndTimePicker}
                onDismiss={() => setShowEndTimePicker(false)}
                hours={parseInt(selectedEndTime?.split(':')[0] || '10', 10)}
                minutes={parseInt(selectedEndTime?.split(':')[1] || '0', 10)}
                onChange={(hours, minutes) => {
                  setSelectedEndTime(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                  );
                }}
              />
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
            Booking Details
          </Text>

          <InputField
            label="Title"
            placeholder="Meeting title"
            value={bookingTitle}
            onChangeText={setBookingTitle}
            error={errors.title}
            leftIcon={<Text style={{ fontSize: 20 }}>📝</Text>}
          />

          <InputField
            label="Description (Optional)"
            placeholder="Meeting description"
            value={bookingDescription}
            onChangeText={setBookingDescription}
            multiline
            numberOfLines={3}
            leftIcon={<Text style={{ fontSize: 20 }}>📄</Text>}
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
          title="Create Booking"
          onPress={handleSubmit}
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
  dateRow: {},
  dateField: {
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeField: {
    flex: 1,
    marginBottom: 12,
  },
  fieldLabel: {},
  errorText: {},
  fab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
  },
});
