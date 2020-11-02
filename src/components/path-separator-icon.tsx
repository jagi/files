/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { Icon } from "./icon";

export function PathSeparatorIcon(this: Context): Element {
  return (
    <Icon>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </Icon>
  );
}
