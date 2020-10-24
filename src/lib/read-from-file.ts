export async function readFromFile(
  fileHandle: FileSystemFileHandle,
  byteLength?: number
): Promise<ArrayBuffer> {
  const file = await fileHandle.getFile();
  if (byteLength === undefined) {
    return file.arrayBuffer();
  } else {
    const stream: ReadableStream<Uint8Array> = file.stream();
    const reader = stream.getReader();
    const buffer = new ArrayBuffer(byteLength);
    const uint8 = new Uint8Array(buffer);
    let index = 0;
    while (true) {
      const result = await reader.read();
      if (result.done || result.value === undefined) {
        break;
      }
      if (result.value.byteLength + index > byteLength) {
        uint8.set(result.value.slice(0, byteLength - index), index);
        break;
      } else {
        uint8.set(result.value, index);
      }
      index += result.value.byteLength;
    }
    return buffer;
  }
}
