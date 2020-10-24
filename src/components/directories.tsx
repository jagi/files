/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";
import { Directory } from "./directory";

const classes = addRules({
  directories: {
    "list-style": "none",
    margin: 0,
    padding: 0,
  },
});

export function Directories(this: Context): Element {
  const currDirectory = this.consume("currDirectory");
  const directories = this.consume("directories");

  return (
    <ul class={classes.directories}>
      {directories.map((directory) => {
        return (
          <Directory
            crank-key={directory}
            directory={directory}
            selected={currDirectory === directory}
          />
        );
      })}
    </ul>
  );
}
