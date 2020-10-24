export function isDirectory(
  handle: FileSystemHandle
): handle is FileSystemDirectoryHandle {
  return handle.kind === "directory";
}
