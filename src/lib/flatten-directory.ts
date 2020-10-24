import { copyToDirectory } from "./copy-to-directory";
import { openDirectory } from "./open-directory";
import { getParentDirectory } from "./parents";

export async function flattenDirectory(directory: FileSystemDirectoryHandle) {
  const parentDirectory = getParentDirectory(directory);
  if (parentDirectory === undefined) {
    throw new Error(
      "Directory to flatten does not have parent directory or you don't have permission to it"
    );
  }
  for (const handle of await openDirectory(directory)) {
    await copyToDirectory(handle, parentDirectory);
  }
  await parentDirectory.removeEntry(directory.name, { recursive: true });
}
