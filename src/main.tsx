/** @jsx createElement */
import { createElement } from "@bikeshaving/crank";
import { renderer } from "@bikeshaving/crank/dom";
import { App } from "./components/app";
import { State } from "./components/state";
import "./lib/styles";

const root = document.getElementById("root");
if (root !== null) {
  renderer.render(
    <State>
      <App />
    </State>,
    root
  );
}
