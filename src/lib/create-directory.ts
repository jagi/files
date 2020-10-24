export function createDirectory(
  directory: FileSystemDirectoryHandle,
  name: string
): Promise<FileSystemDirectoryHandle> {
  return directory.getDirectoryHandle(name, { create: true });
}
