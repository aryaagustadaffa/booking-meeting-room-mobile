import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Modal, Portal, Text, useTheme } from 'react-native-paper';

interface TimePickerProps {
  visible: boolean;
  onDismiss: () => void;
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  visible,
  onDismiss,
  hours,
  minutes,
  onChange,
}) => {
  const theme = useTheme();
  const [selectedHours, setSelectedHours] = useState(hours);
  const [selectedMinutes, setSelectedMinutes] = useState(minutes);

  const handleConfirm = () => {
    onChange(selectedHours, selectedMinutes);
    onDismiss();
  };

  const handleHourChange = (delta: number) => {
    const newHours = selectedHours + delta;
    if (newHours >= 0 && newHours < 24) {
      setSelectedHours(newHours);
    }
  };

  const handleMinuteChange = (delta: number) => {
    const newMinutes = selectedMinutes + delta;
    if (newMinutes >= 0 && newMinutes < 60) {
      setSelectedMinutes(newMinutes);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Select Time</Text>
        </View>

        <View style={styles.timeContainer}>
          {/* Hours */}
          <View style={styles.timeColumn}>
            <Text style={[styles.columnLabel, { color: theme.colors.onSurfaceVariant }]}>
              Hours
            </Text>
            <View style={styles.pickerColumn}>
              <IconButton
                icon="chevron-up"
                size={32}
                onPress={() => handleHourChange(1)}
                iconColor={theme.colors.primary}
              />
              <View style={[styles.timeValue, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text style={[styles.timeText, { color: theme.colors.onSurface }]}>
                  {selectedHours.toString().padStart(2, '0')}
                </Text>
              </View>
              <IconButton
                icon="chevron-down"
                size={32}
                onPress={() => handleHourChange(-1)}
                iconColor={theme.colors.primary}
              />
            </View>
          </View>

          {/* Separator */}
          <Text style={[styles.separator, { color: theme.colors.onSurface }]}>:</Text>

          {/* Minutes */}
          <View style={styles.timeColumn}>
            <Text style={[styles.columnLabel, { color: theme.colors.onSurfaceVariant }]}>
              Minutes
            </Text>
            <View style={styles.pickerColumn}>
              <IconButton
                icon="chevron-up"
                size={32}
                onPress={() => handleMinuteChange(1)}
                iconColor={theme.colors.primary}
              />
              <View style={[styles.timeValue, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text style={[styles.timeText, { color: theme.colors.onSurface }]}>
                  {selectedMinutes.toString().padStart(2, '0')}
                </Text>
              </View>
              <IconButton
                icon="chevron-down"
                size={32}
                onPress={() => handleMinuteChange(-1)}
                iconColor={theme.colors.primary}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onDismiss} style={styles.button}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleConfirm} style={styles.button}>
            Confirm
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  timeColumn: {
    flex: 1,
    alignItems: 'center',
  },
  columnLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  timeValue: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 32,
    fontWeight: '600',
  },
  separator: {
    fontSize: 32,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export { TimePicker };
