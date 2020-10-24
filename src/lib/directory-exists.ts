export async function directoryExists(
  directory: FileSystemDirectoryHandle,
  name: string
): Promise<boolean> {
  try {
    await directory.getDirectoryHandle(name);
    return true;
  } catch (error) {
    return false;
  }
}
