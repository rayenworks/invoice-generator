export const money = (amount, symbol = '$') =>
  symbol + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const isoDate = (date) => date.toISOString().slice(0, 10);

export const addDays = (date, days) => new Date(date.getTime() + days * 864e5);
