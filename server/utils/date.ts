export const getDateString = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const dateString = new Date(now.getTime() - offset * 60 * 1000)
    .toISOString()
    .replace("T", "_")
    .split(".")[0];
  return dateString;
};
