export class OpenDirectoryEvent extends CustomEvent<{
  directory: FileSystemDirectoryHandle;
}> {
  constructor(directory: FileSystemDirectoryHandle) {
    super("app.open-directory", { bubbles: true, detail: { directory } });
  }
}

declare global {
  module Crank {
    interface EventMap {
      "app.open-directory": OpenDirectoryEvent;
    }
  }
}
