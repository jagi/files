/** @jsx createElement */
import { Context, createElement, Element, Fragment } from "@bikeshaving/crank";
import clsx from "clsx";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { getParentDirectories } from "../lib/parents";
import { addRules } from "../lib/styles";
import { PathSeparatorIcon } from "./path-separator-icon";

const classes = addRules({
  path: {
    "align-items": "center",
    display: "flex",
    "flex-direction": "row",
    "list-style": "none",
    margin: 8,
    padding: 0,
  },
  pathSegment: {},
  pathSeparator: {
    "& > svg": {
      display: "block",
      fill: "var(--link-color)",
    },
  },
});

export function Path(this: Context): Element {
  const currDirectory = this.consume("currDirectory");

  const parentDirectories =
    currDirectory !== null
      ? [...getParentDirectories(currDirectory).reverse(), currDirectory]
      : [];

  return (
    <ul class={classes.path}>
      {parentDirectories.map((directory, index) => {
        const key = `${index}-${directory.name}`;
        const last = index === parentDirectories.length - 1;
        return (
          <Fragment key={key}>
            <PathSegment clickable={!last} directory={directory} />
            {last ? null : <PathSeparator />}
          </Fragment>
        );
      })}
    </ul>
  );
}

interface PathSegmentProps {
  clickable: boolean;
  directory: FileSystemDirectoryHandle;
}

function PathSegment(this: Context, props: PathSegmentProps): Element {
  const { clickable, directory } = props;

  if (clickable) {
    this.addEventListener("click", async (event) => {
      event.preventDefault();
      this.dispatchEvent(new OpenDirectoryEvent(directory));
    });
  }

  return (
    <li class={clsx(classes.pathSegment, { clickable })}>
      <a href={clickable ? "#" : undefined}>{directory.name}</a>
    </li>
  );
}

function PathSeparator(): Element {
  return (
    <li class={classes.pathSeparator}>
      <PathSeparatorIcon />
    </li>
  );
}
