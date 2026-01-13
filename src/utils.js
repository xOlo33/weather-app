export const formatTemp = (tempC, unit) => {
  if (unit === 'F') return `${Math.round(tempC * 9/5 + 32)}°F`;
  if (unit === 'K') return `${Math.round(tempC + 273.15)}K`;
  return `${tempC}°C`;
};