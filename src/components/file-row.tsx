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
      "background-color": "var(--highlight-color)",
    },
  },
});

export function FileRow(this: Context, props: Props): Children {
  const { children, fileOrDirectory, selected } = props;

  this.addEventListener("click", async (event) => {
    event.preventDefault();
    let mode: SelectFileMode;
    if (event.metaKey || event.ctrlKey) {
      mode = "ONE";
    } else if (event.shiftKey) {
      mode = "UP_TO";
    } else {
      if (selected && isDirectory(fileOrDirectory)) {
        this.dispatchEvent(new OpenDirectoryEvent(fileOrDirectory));
        return;
      }
      mode = "REPLACE";
    }
    this.dispatchEvent(new SelectFileEvent(fileOrDirectory, mode));
  });

  return (
    <tr crank-key={fileOrDirectory} class={clsx(classes.file, { selected })}>
      {children}
    </tr>
  );
}
