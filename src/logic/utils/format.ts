export const formatNumber = (num: number): string => {
  // Check if the number is an integer
  if (Number.isInteger(num)) {
    return num.toString();
  }
  // Otherwise format with at most 2 decimal places
  return num.toFixed(2).replace(/\.?0+$/, "");
};
