export function formatNumber(num) {
  if (num < 1000) return num.toString();

  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  return `${num.toFixed(2)}${units[unitIndex]}`;
}

export function formatReadableNumber(num) {
  return num.toLocaleString();
}

export function formatFraction(num1, num2) {
  return `${num1.toLocaleString()} / ${num2.toLocaleString()}`;
}

export const truncateString = (value, firstChars = 6, lastChars = 6) => {
  if (!value || typeof value !== "string") return "";

  // If the string is too short, return it as is
  if (value.length <= firstChars + lastChars) return value;

  return `${value.slice(0, firstChars)}...${value.slice(-lastChars)}`;
};
