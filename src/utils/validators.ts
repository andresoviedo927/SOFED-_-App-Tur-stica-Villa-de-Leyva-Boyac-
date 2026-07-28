/**
 * Utility Validators
 */

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const re = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return re.test(phone);
};
