export class ToggleColorSchemeEvent extends CustomEvent<null> {
  constructor() {
    super("app.toggle-color-scheme", { bubbles: true });
  }
}

declare global {
  module Crank {
    interface EventMap {
      "app.toggle-color-scheme": ToggleColorSchemeEvent;
    }
  }
}
