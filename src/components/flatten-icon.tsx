/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { Icon } from "./icon";

export function FlattenIcon(this: Context): Element {
  return (
    <Icon>
      <path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z" />
    </Icon>
  );
}
