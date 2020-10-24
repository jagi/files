/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { AddDirectoryEvent } from "../events/add-directory-event";
import { OpenDirectoryEvent } from "../events/open-directory-event";
import { Button } from "./button";

export function OpenButton(this: Context): Element {
  this.addEventListener("click", async () => {
    const directory = await window.showDirectoryPicker();
    this.dispatchEvent(new AddDirectoryEvent(directory));
    this.dispatchEvent(new OpenDirectoryEvent(directory));
  });

  return <Button>OPEN</Button>;
}
