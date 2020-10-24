import { copyToDirectory } from "./copy-to-directory";
import { formatFileName } from "./format-file-name";
import { getUniqueFileName } from "./get-unique-file-name";
import { getParentDirectory } from "./parents";

export async function renameFile(file: FileSystemFileHandle) {
  const formattedName = await formatFileName(file);
  const parentDirectory = getParentDirectory(file);
  if (parentDirectory === undefined) {
    return;
  }
  if (formattedName === file.name) {
    return;
  }
  const uniqueName = await getUniqueFileName(
    file,
    parentDirectory,
    formattedName
  );
  await copyToDirectory(file, parentDirectory, uniqueName);
  await parentDirectory.removeEntry(file.name);
}
