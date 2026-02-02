export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  return { isValid: true };
};

export const validateBookingTime = (
  startTime: string,
  endTime: string
): { isValid: boolean; message?: string } => {
  const start = parseInt(startTime.replace(':', ''), 10);
  const end = parseInt(endTime.replace(':', ''), 10);

  if (start >= end) {
    return { isValid: false, message: 'End time must be after start time' };
  }

  // Check if booking is within business hours (8 AM - 6 PM)
  if (start < 800 || end > 1800) {
    return { isValid: false, message: 'Booking must be within business hours (8 AM - 6 PM)' };
  }

  // Check minimum booking duration (30 minutes)
  const duration = end - start;
  if (duration < 30) {
    return { isValid: false, message: 'Minimum booking duration is 30 minutes' };
  }

  // Check maximum booking duration (4 hours)
  if (duration > 400) {
    return { isValid: false, message: 'Maximum booking duration is 4 hours' };
  }

  return { isValid: true };
};

export const validateRequired = (value: any, fieldName: string): { isValid: boolean; message?: string } => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true };
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
};
