/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { flattenDirectory } from "../lib/flatten-directory";
import { isDirectory } from "../lib/is-directory";
import { isFile } from "../lib/is-file";
import { Button } from "./button";
import { FlattenIcon } from "./flatten-icon";

export function FlattenButton(this: Context): Element {
  const currDirectory = this.consume("currDirectory");
  const handles = this.consume("files");
  const selectedHandles = this.consume("selectedFiles");

  const directories = handles.filter(isDirectory);
  const selectedDirectories = selectedHandles.filter(isDirectory);
  const isFileSelected = selectedHandles.find(isFile) !== undefined;

  const disabled =
    isFileSelected ||
    (selectedDirectories.length === 0 && directories.length === 0);

  this.addEventListener("click", async () => {
    if (selectedDirectories.length > 0) {
      for (const selectedDirectory of selectedDirectories) {
        await flattenDirectory(selectedDirectory);
      }
    } else {
      for (const directory of directories) {
        await flattenDirectory(directory);
      }
    }
    if (currDirectory !== null) {
      this.dispatchEvent(new OpenDirectoryEvent(currDirectory));
    }
  });

  return (
    <Button disabled={disabled}>
      <FlattenIcon />
      {selectedDirectories.length > 0 ? "Flatten selected" : "Flatten all"}
    </Button>
  );
}
