import { createDirectory } from "./create-directory";
import { createFile } from "./create-file";
import { getUniqueFileName } from "./get-unique-file-name";
import { isDirectory } from "./is-directory";
import { isFile } from "./is-file";
import { openDirectory } from "./open-directory";
import { readFromFile } from "./read-from-file";
import { writeToFile } from "./write-to-file";

export async function copyToDirectory(
  handle: FileSystemHandle,
  destDirectory: FileSystemDirectoryHandle,
  newName?: string
) {
  const name = await getUniqueFileName(handle, destDirectory, newName);
  if (isDirectory(handle)) {
    const subDirectory = await createDirectory(destDirectory, name);
    for (const subHandle of await openDirectory(handle)) {
      await copyToDirectory(subHandle, subDirectory);
    }
  } else if (isFile(handle)) {
    await writeToFile(
      await createFile(destDirectory, name),
      await readFromFile(handle)
    );
  }
}
