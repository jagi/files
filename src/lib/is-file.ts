export function isFile(
  handle: FileSystemHandle
): handle is FileSystemFileHandle {
  return handle.kind === "file";
}
