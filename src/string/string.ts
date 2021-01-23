import * as e from "fp-ts/lib/Either";

const isString = (x: unknown): x is string => typeof x === "string";

export const mkString = e.fromPredicate(isString, () => "Not a string");
