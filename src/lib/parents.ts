const parents = new Map<FileSystemHandle, FileSystemDirectoryHandle>();

export function getParentDirectories(
  handle: FileSystemHandle
): FileSystemDirectoryHandle[] {
  const parentDirectories: FileSystemDirectoryHandle[] = [];
  let parentDirectory = getParentDirectory(handle);
  while (parentDirectory !== undefined) {
    parentDirectories.push(parentDirectory);
    parentDirectory = getParentDirectory(parentDirectory);
  }
  return parentDirectories;
}

export function getParentDirectory(
  handle: FileSystemHandle
): FileSystemDirectoryHandle | undefined {
  return parents.get(handle);
}

export function setParentDirectory(
  handle: FileSystemHandle,
  parentDirectory: FileSystemDirectoryHandle
) {
  parents.set(handle, parentDirectory);
}
