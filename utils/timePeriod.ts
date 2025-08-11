import { formatDate } from "./formatDate";

const now = new Date();

export type Time = {
  startDate: string;
  endDate: string;
};

type TimePeriod = {
  currentWeek: Time;
  currentMonth: Time;
  currentYear: Time;
};

export const timePeriod: TimePeriod = {
  currentWeek: {
    startDate: (() => {
      const date = new Date(now);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return formatDate(new Date(date.setDate(diff)));
    })(),
    endDate: (() => {
      const date = new Date(now);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? 0 : 7);
      return formatDate(new Date(date.setDate(diff)));
    })(),
  },
  currentMonth: {
    startDate: formatDate(new Date(now.getFullYear(), now.getMonth(), 1)),
    endDate: formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
  },
  currentYear: {
    startDate: formatDate(new Date(now.getFullYear(), 0, 1)),
    endDate: formatDate(new Date(now.getFullYear(), 11, 31)),
  },
};
