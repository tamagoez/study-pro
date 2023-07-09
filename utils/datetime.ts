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

export function calcMinutesToDHM(inputMinutes: number) {
  // 分を時間と分に変換
  const hours = Math.floor(inputMinutes / 60);
  const minutes = inputMinutes % 60;
  return { hours, minutes };
}
