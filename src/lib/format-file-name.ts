import { parseExifDate } from "./parse-exif-date";
import { readFromFile } from "./read-from-file";

function zeroPad(value: number, maxLength: number = 2): string {
  return String(value).padStart(maxLength, "0");
}

export async function formatFileName(
  file: FileSystemFileHandle
): Promise<string> {
  // Only read the first 128kB.
  const size = 128 * 1024;
  const data = await readFromFile(file, size);
  const { load } = await import("exifreader");
  const tags = load(data);
  if (tags?.DateTimeOriginal?.value?.[0] === undefined) {
    return file.name;
  }
  const shootingDate = parseExifDate(tags.DateTimeOriginal.value[0]);
  if (!(shootingDate instanceof Date)) {
    return file.name;
  }
  const year = shootingDate.getFullYear();
  const month = zeroPad(shootingDate.getMonth() + 1);
  const day = zeroPad(shootingDate.getDate());
  const hours = zeroPad(shootingDate.getHours());
  const minutes = zeroPad(shootingDate.getMinutes());
  const seconds = zeroPad(shootingDate.getSeconds());
  const formattedDate = `${year}${month}${day}_${hours}${minutes}${seconds}`;
  const index = file.name.lastIndexOf(".");
  return formattedDate + file.name.substr(index);
}
