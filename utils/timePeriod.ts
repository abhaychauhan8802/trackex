import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { formatDate } from "./formatDate";

export type TimeType = {
  start: string;
  end: string;
};

export type TimePeriodType = {
  currentWeek: TimeType;
  currentMonth: TimeType;
  currentYear: TimeType;
};

const now = new Date();

export const timePeriod: TimePeriodType = {
  currentWeek: {
    start: formatDate(startOfWeek(now, { weekStartsOn: 1 })),
    end: formatDate(endOfWeek(now, { weekStartsOn: 1 })),
  },
  currentMonth: {
    start: formatDate(startOfMonth(now)),
    end: formatDate(endOfMonth(now)),
  },
  currentYear: {
    start: formatDate(startOfYear(now)),
    end: formatDate(endOfYear(now)),
  },
};
