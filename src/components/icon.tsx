/** @jsx createElement */
import { Children, Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";

export interface IconProps {
  children: Children;
}

const classes = addRules({
  icon: {
    fill: "var(--text-color)",
  },
});

export function Icon(this: Context, props: IconProps): Element {
  const { children } = props;

  return (
    <svg
      class={classes.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
    >
      {children}
    </svg>
  );
}
