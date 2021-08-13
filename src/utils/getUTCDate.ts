import { isThereAnyData } from "./isThereAnyData";

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const getUTCDate = (date: string): string => {
  isThereAnyData(date);

  const currenDate = new Date(date);

  const days = week[currenDate.getUTCDay() - 1];
  const month = currenDate.getUTCMonth();
  const years = currenDate.getUTCFullYear();

  return `${days}, ${month > 10 ? month : `0${month}`}/${years}`;
};
