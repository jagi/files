/** @jsx createElement */
import { Context, createElement, Element, Fragment } from "@bikeshaving/crank";
import clsx from "clsx";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { getParentDirectories } from "../lib/parents";
import { addRules } from "../lib/styles";

const classes = addRules({
  path: {
    display: "flex",
    "flex-direction": "row",
    "list-style": "none",
    margin: 8,
    padding: 0,
  },
  pathSegment: {
    "margin-right": 8,
    "&.clickable a": {
      color: "var(--link-color)",
      cursor: "pointer",
      "&:active, &:hover": {
        "text-decoration": "underline",
      },
    },
  },
  pathSeparator: {
    "margin-right": 8,
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
    this.addEventListener("click", async () => {
      this.dispatchEvent(new OpenDirectoryEvent(directory));
    });
  }

  return (
    <li class={clsx(classes.pathSegment, { clickable })}>
      <a>{directory.name}</a>
    </li>
  );
}

function PathSeparator(): Element {
  return <li class={classes.pathSeparator}>{">"}</li>;
}
