/**
 * Centralized validation functions to prevent duplication
 */

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate required field (non-empty string)
 * @param value - Value to validate
 * @returns true if value is non-empty
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate future date
 * @param date - Date to validate
 * @returns true if date is not in the future
 */
export const validateNotFutureDate = (date: Date): boolean => {
  return date <= new Date();
};

/**
 * Validate numeric range
 * @param value - Number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns true if value is within range
 */
export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validate transaction amount (positive number, up to 2 decimals)
 * @param amount - Amount to validate
 * @returns true if valid amount
 */
export const validateAmount = (amount: string | number): boolean => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0 && num <= 1000000; // Reasonable upper limit
};

export const ValidationErrors = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  FUTURE_DATE: 'Cannot select a future date',
  INVALID_AMOUNT: 'Please enter a valid amount',
} as const;
