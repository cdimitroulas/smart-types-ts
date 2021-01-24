import * as e from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import validator from "validator";
import { SmartConstructor, SmartType } from "../utilTypes";

export type URL = SmartType<string, "URL">;

export const mkURL: SmartConstructor<URL> = flow(
  s => s.trim(),
  e.fromPredicate(validator.isURL, () => "Not a valid URL"),
  e.map(id => id as URL)
);
