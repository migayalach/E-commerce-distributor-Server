import { lengthPassword, includeSpecialChars } from '../constants';

export function generatePassword(): string {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()-_=+[{]}|;:",<.>/?';

  let characters = lowercaseChars + uppercaseChars + numbers;

  if (includeSpecialChars) {
    characters += specialChars;
  }

  let password = '';
  for (let i = 0; i < lengthPassword; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}
