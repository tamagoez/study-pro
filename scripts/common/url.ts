export function splitUrl(url: string, indexnum: number) {
  const segments = url.split("/");
  return parseInt(segments[indexnum]);
}
