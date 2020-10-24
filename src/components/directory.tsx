/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import clsx from "clsx";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { addRules } from "../lib/styles";

const classes = addRules({
  directory: {
    margin: 1,
    padding: "4px 8px",
    "user-select": "none",
    "&.selected": {
      background: "var(--primary-color)",
    },
  },
});

interface Props {
  directory: FileSystemDirectoryHandle;
  selected: boolean;
}

export function Directory(this: Context, props: Props): Element {
  const { directory, selected } = props;

  this.addEventListener("click", () => {
    this.dispatchEvent(new OpenDirectoryEvent(directory));
  });

  return (
    <li class={clsx(classes.directory, { selected })}>{directory.name}</li>
  );
}
