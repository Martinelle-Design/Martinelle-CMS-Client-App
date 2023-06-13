import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
const countryValidation = (phoneNumber: string) => [
  isPhoneNumber(phoneNumber, "US"),
];
export const isPhoneNumber = (
  phoneNumber: string,
  countryCode: CountryCode
) => {
  const newNumber = parsePhoneNumber(phoneNumber, countryCode);
  if (!newNumber) return false;
  // replace with the phone number you want to verify
  const isValid = newNumber.isValid();
  const isPossible = newNumber.isPossible();
  return isValid && isPossible;
};
export const validatePhoneNumber = (phoneNumber: string): boolean => {    
  return !countryValidation(phoneNumber).every((e) => !e);
};
