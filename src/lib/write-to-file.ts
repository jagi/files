export async function writeToFile(
  file: FileSystemFileHandle,
  data: BufferSource | Blob | string
): Promise<void> {
  const writable = await file.createWritable({ keepExistingData: false });
  await writable.write(data);
  await writable.close();
}
