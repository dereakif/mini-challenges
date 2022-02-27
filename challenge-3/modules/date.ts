import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export const getWeekOfYear = (date: Date) => {
  return dayjs(date).week();
};
