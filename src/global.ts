interface FileSystemHandlePermissionDescriptor {
  writable: boolean;
}

type FileSystemHandleKind = "directory" | "file";

interface FileSystemHandle {
  readonly kind: FileSystemHandleKind;
  readonly name: string;
  isSameEntry(other: FileSystemHandle): Promise<boolean>;
  queryPermission(
    descriptor: FileSystemHandlePermissionDescriptor
  ): Promise<PermissionState>;
  requestPermission(
    descriptor: FileSystemHandlePermissionDescriptor
  ): Promise<PermissionState>;
}

interface FileSystemGetFileOptions {
  create: boolean;
}

interface FileSystemGetDirectoryOptions {
  create: boolean;
}

interface FileSystemRemoveOptions {
  recursive: boolean;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  readonly kind: "directory";
  getFileHandle(
    name: string,
    options?: FileSystemGetFileOptions
  ): Promise<FileSystemFileHandle>;
  getDirectoryHandle(
    name: string,
    options?: FileSystemGetDirectoryOptions
  ): Promise<FileSystemDirectoryHandle>;
  removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>;
  entries(): AsyncIterable<[string, FileSystemHandle]>;
}

interface FileSystemCreateWritableOptions {
  keepExistingData: boolean;
}

interface FileSystemFileHandle extends FileSystemHandle {
  readonly kind: "file";
  getFile(): Promise<File>;
  createWritable(
    options: FileSystemCreateWritableOptions
  ): Promise<FileSystemWritableFileStream>;
}

interface File {
  readonly name: string;
  readonly lastModified: number;
}

type WriteCommandType = "write" | "seek" | "truncate";

interface WriteParams {
  type: WriteCommandType;
  size?: number;
  position?: number;
  data: BufferSource | Blob | string;
}

interface FileSystemWritableFileStream {
  write(data: BufferSource | Blob | string | WriteParams): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
  close(): Promise<void>;
}

interface ChooseFileSystemEntriesArgs {
  type: "open-directory";
}

interface DirectoryPickerOptions {}

interface Window {
  showDirectoryPicker(
    options?: DirectoryPickerOptions
  ): Promise<FileSystemDirectoryHandle>;
}
