/** @jsx createElement */
import { Children, Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";

export interface IconButtonProps {
  children: Children;
  tooltip?: string;
}

const classes = addRules({
  iconButton: {
    "background-color": "transparent",
    border: "none",
    "border-radius": "50%",
    cursor: "pointer",
    display: "flex",
    flex: "0 0 auto",
    outline: "none",
    padding: 12,
    "tap-highlight-color": "transparent",
    "&:hover": {
      "background-color": "var(--highlight-color)",
    },
  },
});

export function IconButton(this: Context, props: IconButtonProps): Element {
  const { children, tooltip } = props;

  return (
    <button class={classes.iconButton} title={tooltip}>
      {children}
    </button>
  );
}
