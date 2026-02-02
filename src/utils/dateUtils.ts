import { format as formatDateFn, parse, addDays, startOfDay, endOfDay, isSameDay, isBefore, isAfter } from 'date-fns';

export const formatDate = (date: Date | string, pattern = 'MMM dd, yyyy') => {
  return formatDateFn(new Date(date), pattern);
};

// Alias for backward compatibility
export { formatDate as format };

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return formatDateFn(date, 'hh:mm a');
};

export const formatDateTime = (date: Date | string, time: string) => {
  const [hours, minutes] = time.split(':');
  const dateTime = new Date(date);
  dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return formatDateFn(dateTime, 'MMM dd, yyyy hh:mm a');
};

export const parseDate = (dateString: string) => {
  return parse(dateString, 'yyyy-MM-dd', new Date());
};

export const isDateInPast = (date: Date | string) => {
  return isBefore(startOfDay(new Date(date)), startOfDay(new Date()));
};

export const isDateInFuture = (date: Date | string) => {
  return isAfter(startOfDay(new Date(date)), startOfDay(new Date()));
};

export const isToday = (date: Date | string) => {
  return isSameDay(new Date(date), new Date());
};

export const getDatesInRange = (startDate: Date, endDate: Date) => {
  const dates: Date[] = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

export const generateTimeSlots = (startHour = 8, endHour = 18, interval = 30) => {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (interval === 30) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
};

export const isTimeSlotAvailable = (
  slot: string,
  bookings: { startTime: string; endTime: string }[]
) => {
  const slotTime = parseInt(slot.replace(':', ''), 10);
  return !bookings.some((booking) => {
    const start = parseInt(booking.startTime.replace(':', ''), 10);
    const end = parseInt(booking.endTime.replace(':', ''), 10);
    return slotTime >= start && slotTime < end;
  });
};
