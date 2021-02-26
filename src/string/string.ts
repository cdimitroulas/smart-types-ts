import * as e from "fp-ts/lib/Either";

const isString = (val: unknown): val is string => typeof val === "string";

export const string = e.fromPredicate(isString, () => "Not a string");
