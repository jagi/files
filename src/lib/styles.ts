import { create } from "jss";
import preset from "jss-preset-default";

export const jss = create(preset());

export const styleSheet = jss.createStyleSheet<any>({});

export function addRules<T extends string>(
  styles: Record<T, any>
): Record<T, string> {
  styleSheet.addRules(styles);
  return styleSheet.classes;
}

styleSheet.attach();
