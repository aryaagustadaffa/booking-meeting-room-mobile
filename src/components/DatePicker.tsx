import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, Modal, Portal, Text, useTheme } from 'react-native-paper';

interface DatePickerProps {
  visible: boolean;
  onDismiss: () => void;
  date: Date;
  onChange: (event: any, date?: Date) => void;
  mode?: 'single' | 'range';
}

const DatePicker: React.FC<DatePickerProps> = ({
  visible,
  onDismiss,
  date,
  onChange,
}) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(date);

  const generateDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
    onChange({ type: 'set' }, newDate);
    onDismiss();
  };

  const handleMonthChange = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const handleYearChange = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + delta);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const { daysInMonth, firstDay } = generateDays(year, month);

    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Render day names
    days.push(
      <View key="dayNames" style={styles.weekRow}>
        {dayNames.map((day) => (
          <Text
            key={day}
            style={[
              styles.dayName,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
    );

    // Render empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Render days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      const isSelected = day === date.getDate();

      days.push(
        <Button
          key={day}
          mode={isSelected ? 'contained' : 'text'}
          onPress={() => handleDateSelect(day)}
          style={[
            styles.dayCell,
            isSelected && { backgroundColor: theme.colors.primary },
          ]}
          labelStyle={[
            styles.dayText,
            isToday && { fontWeight: 'bold' },
            isSelected && { color: theme.colors.onPrimary },
          ]}
        >
          {day}
        </Button>
      );
    }

    return days;
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContent,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.onSurface },
            ]}
          >
            Select Date
          </Text>
        </View>

        <View style={styles.monthYearSelector}>
          <IconButton
            icon="chevron-left"
            size={20}
            onPress={() => handleMonthChange(-1)}
          />
          <IconButton
            icon="chevron-left"
            size={20}
            onPress={() => handleYearChange(-1)}
          />
          <Text
            style={[
              styles.monthYearText,
              { color: theme.colors.onSurface },
            ]}
          >
            {selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <IconButton
            icon="chevron-right"
            size={20}
            onPress={() => handleYearChange(1)}
          />
          <IconButton
            icon="chevron-right"
            size={20}
            onPress={() => handleMonthChange(1)}
          />
        </View>

        <ScrollView style={styles.calendarContainer}>
          <View style={styles.calendarGrid}>{renderCalendar()}</View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onDismiss}>
            Cancel
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
    maxHeight: '80%',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  monthYearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  calendarContainer: {
    maxHeight: 300,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
  dayName: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    margin: 2,
  },
  dayText: {
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export { DatePicker };
