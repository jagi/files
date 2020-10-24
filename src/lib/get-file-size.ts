import { isDirectory } from "./is-directory";

export async function getFileSize(
  file: FileSystemHandle
): Promise<number | null> {
  if (isDirectory(file)) {
    return null;
  } else {
    return (await (file as FileSystemFileHandle).getFile()).size;
  }
}
