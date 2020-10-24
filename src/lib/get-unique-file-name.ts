import { fileExists } from "./file-exists";
import { isFile } from "./is-file";
import { numberToLetters } from "./number-to-letters";

function getNextUniqueFileName(
  handle: FileSystemHandle,
  count: number = -1,
  newName?: string
): string {
  const name = newName !== undefined ? newName : handle.name;
  if (count === -1) {
    return name;
  }
  const index = name.lastIndexOf(".");
  if (isFile(handle) && index >= 0) {
    return name.substr(0, index) + numberToLetters(count) + name.substr(index);
  } else {
    return name + numberToLetters(count);
  }
}

export async function getUniqueFileName(
  handle: FileSystemHandle,
  destDirectory: FileSystemDirectoryHandle,
  newName?: string
): Promise<string> {
  let count = -1;
  let uniqueFileName: string;
  do {
    uniqueFileName = getNextUniqueFileName(handle, count, newName);
    if (count >= 100) {
      break;
    }
    count++;
  } while (await fileExists(destDirectory, uniqueFileName));
  return uniqueFileName;
}
