import * as e from "fp-ts/lib/Either";

const isNumber = (val: unknown): val is number => typeof val === "number";

export const number = e.fromPredicate(isNumber, () => "Not a number");
