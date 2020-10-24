export class AddDirectoryEvent extends CustomEvent<{
  directory: FileSystemDirectoryHandle;
}> {
  constructor(directory: FileSystemDirectoryHandle) {
    super("app.add-directory", { bubbles: true, detail: { directory } });
  }
}

declare global {
  module Crank {
    interface EventMap {
      "app.add-directory": AddDirectoryEvent;
    }
  }
}
