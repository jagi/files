/** @jsx createElement */
import { Context, Element } from "@bikeshaving/crank";
import { openDirectory } from "../lib/open-directory";

interface Props {
  children: Element;
}

declare module "@bikeshaving/crank" {
  interface ProvisionMap {
    currDirectory: FileSystemDirectoryHandle | null;
    directories: FileSystemDirectoryHandle[];
    files: FileSystemHandle[];
    selectedFiles: FileSystemHandle[];
  }
}

export function* State(this: Context, props: Props): Generator<Element> {
  let currDirectory: FileSystemDirectoryHandle | null = null;
  let directories: FileSystemDirectoryHandle[] = [];
  let files: FileSystemHandle[] = [];
  let selectedFiles: FileSystemHandle[] = [];

  this.provide("currDirectory", currDirectory);
  this.provide("directories", directories);
  this.provide("files", files);
  this.provide("selectedFiles", selectedFiles);

  this.addEventListener("app.open-directory", async (event) => {
    const { directory } = event.detail;
    currDirectory = directory;
    // Deselect all files.
    selectedFiles.splice(0);
    this.provide("currDirectory", currDirectory);
    files.splice(0);
    files.push(...(await openDirectory(directory)));
    this.refresh();
  });

  this.addEventListener("app.add-directory", async (event) => {
    const { directory } = event.detail;
    directories.push(directory);
    this.refresh();
  });

  this.addEventListener("app.select-file", async (event) => {
    const { fileOrDirectory, mode } = event.detail;
    if (mode === "REPLACE") {
      if (selectedFiles.length !== 1 || selectedFiles[0] !== fileOrDirectory) {
        selectedFiles.splice(0);
        selectedFiles.push(fileOrDirectory);
        this.refresh();
      }
    } else if (mode === "ONE") {
      if (selectedFiles.includes(fileOrDirectory)) {
        selectedFiles.splice(selectedFiles.indexOf(fileOrDirectory), 1);
      } else {
        selectedFiles.push(fileOrDirectory);
      }
      this.refresh();
    } else if (mode === "UP_TO") {
      const lastSelectedFile = selectedFiles[selectedFiles.length - 1];
      const startIndex = files.indexOf(lastSelectedFile);
      const endIndex = files.indexOf(fileOrDirectory);
      if (endIndex > startIndex) {
        for (let index = startIndex; index <= endIndex; index++) {
          const nextFile = files[index];
          if (!selectedFiles.includes(nextFile)) {
            selectedFiles.push(nextFile);
          }
        }
      } else if (endIndex < startIndex) {
        for (let index = startIndex; index >= endIndex; index--) {
          const nextFile = files[index];
          if (!selectedFiles.includes(nextFile)) {
            selectedFiles.push(nextFile);
          }
        }
      }
      this.refresh();
    }
  });

  try {
    while (true) {
      yield props.children;
    }
  } finally {
  }
}
