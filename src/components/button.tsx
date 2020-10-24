/** @jsx createElement */
import { Children, Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";

const classes = addRules({
  button: {
    border: "1px solid black",
    "border-radius": 4,
    margin: [4, 0, 4, 4],
    padding: [8, 16],
    "&:last-child": {
      "margin-right": 4,
    },
  },
});

export interface ButtonProps {
  children?: Children;
  disabled?: boolean;
}

export function Button(this: Context, props: ButtonProps): Element {
  const { disabled } = props;

  return (
    <button class={classes.button} disabled={disabled}>
      {props.children}
    </button>
  );
}
