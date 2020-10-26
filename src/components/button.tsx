/** @jsx createElement */
import { Children, Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";

const classes = addRules({
  button: {
    "background-color": "transparent",
    border: "none",
    "border-radius": 4,
    color: "var(--text-color)",
    cursor: "pointer",
    display: "flex",
    flex: "0 0 auto",
    "flex-direction": "row",
    "font-size": 14,
    "font-weight": 500,
    "line-height": 1.75,
    margin: 8,
    outline: "none",
    padding: [6, 8],
    "tap-highlight-color": "transparent",
    "text-transform": "uppercase",
    "&:hover": {
      "background-color": "var(--highlight-color)",
    },
    "&[disabled]": {
      "background-color": "transparent",
      opacity: 0.5,
    },
    "& svg": {
      "margin-right": 8,
    },
  },
});

export interface ButtonProps {
  children?: Children;
  disabled?: boolean;
  tooltip?: string;
}

export function Button(this: Context, props: ButtonProps): Element {
  const { children, disabled, tooltip } = props;

  return (
    <button class={classes.button} disabled={disabled} title={tooltip}>
      {children}
    </button>
  );
}
