/** @jsx createElement */
import { Context, createElement, Element } from "@bikeshaving/crank";
import { addRules } from "../lib/styles";

const classes = addRules({
  about: {
    padding: 16,
    "& ul": {
      margin: 0,
      "padding-inline-start": "32px",
    },
  },
});

export function About(this: Context): Element {
  return (
    <div class={classes.about}>
      <p>
        <strong>This app only works in Chrome 86 or higher.</strong>
      </p>
      <p>
        The app let's you flatten directories and rename image files by their
        EXIF shooting date. It's just a demo app (use with catious) using
        several technologies:
      </p>
      <ul>
        <li>
          <a href="https://wicg.github.io/file-system-access/" target="_blank">
            File System Access API
          </a>
        </li>
        <li>
          <a href="https://crank.js.org/" target="_blank">
            Crank.js
          </a>
        </li>
        <li>
          <a href="https://github.com/mattiasw/ExifReader" target="_blank">
            ExifReader
          </a>
        </li>
        <li>
          <a href="https://cssinjs.org/" target="_blank">
            JSS
          </a>
        </li>
        <li>
          <a href="https://v2.parceljs.org/" target="_blank">
            Parcel 2 Beta
          </a>
        </li>
      </ul>
      <p>
        The source code is available at:
        <br />
        <a href="https://github.com/jagi/files" target="_blank">
          https://github.com/jagi/files
        </a>
        <br />
        PRs and feature ideas are welcome.
      </p>
    </div>
  );
}
