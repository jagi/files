import { isDirectory } from "./is-directory";

export async function getFileType(file: FileSystemHandle): Promise<string> {
  if (isDirectory(file)) {
    return "Folder";
  } else {
    return (await (file as FileSystemFileHandle).getFile()).type;
  }
}
