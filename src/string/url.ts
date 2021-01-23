import * as o from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import validator from "validator";
import { SmartType } from "../utilTypes";

export type URL = SmartType<string, "URL">;

export const mkURL = (value: string): o.Option<URL> =>
  pipe(
    value,
    s => s.trim(),
    o.fromPredicate(validator.isURL),
    o.map(id => id as URL)
  );
