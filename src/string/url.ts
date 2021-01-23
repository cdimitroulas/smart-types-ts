import * as o from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import validator from "validator";
import { Never } from "../utilTypes";

export type URL<A extends string = string> = A & Never<"__Url__">;

export const mkURL = <A extends string = string>(value: A): o.Option<URL<A>> =>
  pipe(
    value,
    s => s.trim(),
    o.fromPredicate(validator.isURL),
    o.map(id => id as URL<A>)
  );
