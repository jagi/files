/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { AddDirectoryEvent } from "../events/add-directory-event";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { addRules } from "../lib/styles";

const classes = addRules({
  noFiles: {
    "align-items": "center",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    height: "100%",
    width: "100%",
  },
});

export function NoFiles(this: Context): Element {
  this.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "A") {
      event.preventDefault();
      const directory = await window.showDirectoryPicker();
      this.dispatchEvent(new AddDirectoryEvent(directory));
      this.dispatchEvent(new OpenDirectoryEvent(directory));
    }
  });

  return (
    <div class={classes.noFiles}>
      <p>
        No files to display. First <a href="#">open</a> some directory.
      </p>
    </div>
  );
}
