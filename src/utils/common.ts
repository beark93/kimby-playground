export const getFormattedDate = (date: Date) => {
  const tempMonth = date.getMonth() + 1;
  const tempDate = date.getDate();

  return `${date.getFullYear()}-${
    tempMonth < 10 ? `0${tempMonth}` : tempMonth
  }-${tempDate < 10 ? `0${tempDate}` : tempDate}`;
};
