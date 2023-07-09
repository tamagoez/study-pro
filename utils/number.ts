export function zeroPad(input: number | string, length: number): string {
  let paddedString: string;

  if (typeof input === "number") {
    paddedString = input.toString().padStart(length, "0");
  } else {
    paddedString = input.padStart(length, "0");
  }

  return paddedString;
}
