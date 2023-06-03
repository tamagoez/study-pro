export function getDay(timestamp?: number) {
  let tt: number = Number(new Date());
  if (timestamp) {
    tt = timestamp;
  }
  return tt / 60 / 60 / 24;
}
