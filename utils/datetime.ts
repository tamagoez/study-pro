import { DateTime } from "luxon";

export function calcTodayNumber(dayStartAt: number) {
  const now = DateTime.local();
  const calcNow = now.minus({ hours: dayStartAt });
  return calcDateToNumber(calcNow);
}

export function calcDateToNumber(date: string) {
  // ISO 形式の日付文字列から DateTime オブジェクトを作成
  const dt = DateTime.fromISO(date);
  return dt.toFormat("yyyyLLdd");
}
