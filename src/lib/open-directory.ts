import { setParentDirectory } from "./parents";

export async function openDirectory(
  directory: FileSystemDirectoryHandle
): Promise<FileSystemHandle[]> {
  const handles: FileSystemHandle[] = [];
  for await (const [name, handle] of directory.entries()) {
    if (name !== ".DS_Store") {
      handles.push(handle);
      setParentDirectory(handle, directory);
    }
  }
  return handles;
}
