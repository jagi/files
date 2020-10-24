export async function fileExists(
  directory: FileSystemDirectoryHandle,
  name: string
): Promise<boolean> {
  try {
    await directory.getFileHandle(name);
    return true;
  } catch (error) {
    return false;
  }
}
