export function createFile(
  directory: FileSystemDirectoryHandle,
  name: string
): Promise<FileSystemFileHandle> {
  return directory.getFileHandle(name, { create: true });
}
