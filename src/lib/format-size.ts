export function formatSize(size: number): string {
  let i = -1;
  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  do {
    size = size / 1024;
    i++;
  } while (size > 1024);
  return `${size.toFixed(1)} ${units[i]}`;
}
