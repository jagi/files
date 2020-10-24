export type SelectFileMode = "ONE" | "UP_TO" | "REPLACE";

export class SelectFileEvent extends CustomEvent<{
  fileOrDirectory: FileSystemHandle;
  mode: SelectFileMode;
}> {
  constructor(
    fileOrDirectory: FileSystemHandle,
    mode: SelectFileMode = "REPLACE"
  ) {
    super("app.select-file", {
      bubbles: true,
      detail: { fileOrDirectory, mode },
    });
  }
}

declare global {
  module Crank {
    interface EventMap {
      "app.select-file": SelectFileEvent;
    }
  }
}
