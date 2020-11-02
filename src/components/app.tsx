/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";
import { About } from "./about";
import { Directories } from "./directories";
import { Files } from "./files";
import { Toolbar } from "./toolbar";

const classes = addRules({
  "@global": {
    "html, html[mode=light]": {
      "--bg-color": "#eee",
      "--text-color": "#222",
      "--link-color": "rgba(0, 0, 0, 0.5)",
      "--highlight-color": "rgba(0, 0, 0, 0.04)",
    },
    "html[mode=dark]": {
      "--bg-color": "#222",
      "--text-color": "#eee",
      "--link-color": "rgba(255, 255, 255, 0.5)",
      "--highlight-color": "rgba(255, 255, 255, 0.08)",
    },
    body: {
      background: "var(--bg-color)",
      color: "var(--text-color)",
      "font-family": ["Roboto", "sans-serif"],
      "font-weight": 400,
      margin: 0,
      padding: 0,
    },
    "a:link, a:visited": {
      color: "var(--link-color)",
      cursor: "pointer",
      "text-decoration": "none",
      "&:active, &:hover": {
        "text-decoration": "underline",
      },
    },
  },
  app: {
    display: "flex",
    "flex-direction": "row",
    height: "100%",
    position: "absolute",
    width: "100%",
    "& main": {
      flex: "auto",
      overflow: "auto",
    },
  },
  sidebar: {
    background: "var(--highlight-color)",
    display: "flex",
    flex: "none",
    "flex-direction": "column",
    "justify-content": "space-between",
    width: "300px",
  },
  content: {
    flex: 1,
    display: "flex",
    "flex-direction": "column",
  },
});

export function App(this: Context): Element {
  return (
    <div class={classes.app}>
      <div class={classes.sidebar}>
        <Directories />
        <About />
      </div>
      <div class={classes.content}>
        <Toolbar />
        <main>
          <Files />
        </main>
      </div>
    </div>
  );
}
