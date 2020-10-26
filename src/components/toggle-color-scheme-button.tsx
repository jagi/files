/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { ToggleColorSchemeEvent } from "../events/toggle-color-scheme-event";
import { DarkModeIcon } from "./dark-mode-icon";
import { IconButton } from "./icon-button";
import { LightModeIcon } from "./light-mode-icon";

export function ToggleColorSchemeButton(this: Context): Element {
  const colorScheme = this.consume("colorScheme");

  const tooltip = `Switch to ${colorScheme === "dark" ? "light" : "dark"} mode`;

  this.addEventListener("click", () => {
    this.dispatchEvent(new ToggleColorSchemeEvent());
  });

  return (
    <IconButton tooltip={tooltip}>
      {colorScheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
