import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export function formatToDate(date: string | Date | string[]) {
  dayjs.extend(utc);

  if (Array.isArray(date)) {
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return `${day}/${month}/${year}`;
  }

  if (typeof date === "string") new Date(date);

  return dayjs.utc(date).format("DD/MM/YYYY");
}
