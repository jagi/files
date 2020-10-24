/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { isDirectory } from "../lib/is-directory";
import { isFile } from "../lib/is-file";
import { renameFile } from "../lib/rename-file";
import { Button } from "./button";

export function RenameButton(this: Context): Element {
  const currDirectory = this.consume("currDirectory");
  const handles = this.consume("files");
  const selectedHandles = this.consume("selectedFiles");

  const files = handles.filter(isFile);
  const selectedFiles = selectedHandles.filter(isFile);
  const isDirectorySelected = selectedHandles.find(isDirectory) !== undefined;

  const disabled =
    isDirectorySelected || (selectedFiles.length === 0 && files.length === 0);

  this.addEventListener("click", async () => {
    if (selectedFiles.length > 0) {
      for (const selectedFile of selectedFiles) {
        await renameFile(selectedFile);
      }
    } else {
      for (const file of files) {
        await renameFile(file);
      }
    }
    if (currDirectory !== null) {
      this.dispatchEvent(new OpenDirectoryEvent(currDirectory));
    }
  });

  return (
    <Button disabled={disabled}>
      {selectedFiles.length > 0 ? "RENAME SELECTED" : "RENAME ALL"}
    </Button>
  );
}
