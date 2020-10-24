import { isDirectory } from "./is-directory";

export async function getFileLastModified(
  file: FileSystemHandle
): Promise<number | null> {
  if (isDirectory(file)) {
    return null;
  } else {
    return (await (file as FileSystemFileHandle).getFile()).lastModified;
  }
}
