/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";
import { FlattenButton } from "./flatten-button";
import { OpenButton } from "./open-button";
import { Path } from "./path";
import { RenameButton } from "./rename-button";
import { ToggleColorSchemeButton } from "./toggle-color-scheme-button";

const classes = addRules({
  toolbar: {
    "align-items": "center",
    display: "flex",
    flex: "none",
    "flex-direction": "row",
    "justify-content": "space-between",
    "margin-bottom": 8,
    padding: [0, 8],
    "& > :first-child": {},
    "& > :last-child": {
      "align-items": "center",
      display: "flex",
      "flex-direction": "row",
    },
  },
});

export function Toolbar(this: Context): Element {
  const colorScheme = this.consume("colorScheme");

  return (
    <div class={classes.toolbar}>
      <div>
        <Path />
      </div>
      <div>
        <OpenButton />
        <RenameButton />
        <FlattenButton />
        <ToggleColorSchemeButton />
      </div>
    </div>
  );
}
