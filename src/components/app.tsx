/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";
import { Directories } from "./directories";
import { Files } from "./files";
import { FlattenButton } from "./flatten-button";
import { OpenButton } from "./open-button";
import { RenameButton } from "./rename-button";
import { Toolbar } from "./toolbar";

const classes = addRules({
  app: {
    display: "flex",
    "flex-direction": "row",
    height: "100%",
    position: "absolute",
    width: "100%",
    "& main": {
      flex: "auto",
      overflow: "auto",
    },
  },
  sidebar: {
    flex: "none",
    width: "200px",
  },
  content: {
    flex: 1,
    display: "flex",
    "flex-direction": "column",
  },
});

export function App(this: Context): Element {
  return (
    <div class={classes.app}>
      <div class={classes.sidebar}>
        <Directories />
      </div>
      <div class={classes.content}>
        <Toolbar />
        <main>
          <Files />
        </main>
      </div>
    </div>
  );
}
