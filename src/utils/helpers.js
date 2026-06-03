export const shortAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export const formatNumber = (num, decimals = 2) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};
