export const formatTime = (time: number) => {
  const date = new Date(0);
  date.setSeconds(time);
  const formattedTime = date.toISOString().substr(11, 8);
  if (formattedTime.slice(0, 2) === "00") {
    return formattedTime.slice(3, formattedTime.length);
  }
  return date.toISOString().substr(11, 8);
};
