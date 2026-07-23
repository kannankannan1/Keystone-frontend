export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const phoneRegex = /^\+?[\d\s-()]{7,15}$/;

export const validators = {
  required: (value: string) => (value ? '' : 'This field is required'),
  email: (value: string) =>
    emailRegex.test(value) ? '' : 'Please enter a valid email',
  minLength: (min: number) => (value: string) =>
    value.length >= min ? '' : `Must be at least ${min} characters`,
  maxLength: (max: number) => (value: string) =>
    value.length <= max ? '' : `Must be at most ${max} characters`,
  phone: (value: string) =>
    phoneRegex.test(value) ? '' : 'Please enter a valid phone number',
  password: (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Must contain an uppercase letter';
    if (!/[a-z]/.test(value)) return 'Must contain a lowercase letter';
    if (!/[0-9]/.test(value)) return 'Must contain a number';
    return '';
  },
  confirmPassword: (password: string) => (value: string) =>
    value === password ? '' : 'Passwords do not match',
};
