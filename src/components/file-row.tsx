/** @jsx createElement */
import { Children, Context, createElement } from "@bikeshaving/crank";
import clsx from "clsx";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { SelectFileEvent, SelectFileMode } from "../events/select-file-event";
import { isDirectory } from "../lib/is-directory";
import { addRules } from "../lib/styles";

interface Props {
  children: Children;
  fileOrDirectory: FileSystemHandle;
  selected: boolean;
}

const classes = addRules({
  file: {
    "&.selected > td": {
      background: "var(--primary-color)",
    },
  },
});

export function FileRow(this: Context, props: Props): Children {
  const { children, fileOrDirectory, selected } = props;

  this.addEventListener("click", async (event) => {
    let mode: SelectFileMode;
    if (event.metaKey || event.ctrlKey) {
      mode = "ONE";
    } else if (event.shiftKey) {
      mode = "UP_TO";
    } else {
      mode = "REPLACE";
    }
    this.dispatchEvent(new SelectFileEvent(fileOrDirectory, mode));
  });

  this.addEventListener("dblclick", async () => {
    if (isDirectory(fileOrDirectory)) {
      this.dispatchEvent(new OpenDirectoryEvent(fileOrDirectory));
    }
  });

  return (
    <tr crank-key={fileOrDirectory} class={clsx(classes.file, { selected })}>
      {children}
    </tr>
  );
}
