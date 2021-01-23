import * as e from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import validator from "validator";
import { SmartType } from "../utilTypes";
import { mkString } from "./string";

export type URL = SmartType<string, "URL">;

export const mkURL = (value: unknown): e.Either<string, URL> =>
  pipe(
    mkString(value),
    e.map(s => s.trim()),
    e.chain(e.fromPredicate(validator.isURL, () => "Not a valid URL")),
    e.map(id => id as URL)
  );
