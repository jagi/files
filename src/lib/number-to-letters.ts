export function numberToLetters(num: number): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  let reminder: number;
  while (true) {
    reminder = num % letters.length;
    result = letters.charAt(reminder) + result;
    num = (num - reminder) / letters.length;
    if (num === 0) {
      break;
    }
  }
  return result;
}
