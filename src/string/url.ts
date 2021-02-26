import * as e from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import validator from "validator";
import { SmartConstructor, SmartType } from "../utilTypes";
import { string } from "./string";

export type URL = SmartType<string, "URL">;

export const mkURL: SmartConstructor<URL> = flow(
  string,
  e.map(s => s.trim()),
  e.chain(e.fromPredicate(validator.isURL, () => "Not a valid URL")),
  e.map(id => id as URL)
);
