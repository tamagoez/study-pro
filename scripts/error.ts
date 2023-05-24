export async function errorLog(
  text: string,
  location: string,
  report?: boolean | false
) {
  console.error(text);
  if (report) {
    console.log("発生したエラーを自動送信します。");
  }
}
