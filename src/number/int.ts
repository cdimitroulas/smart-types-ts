import { flow } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartConstructor, SmartType } from "../utilTypes";

export type Int = SmartType<number, "Integer">;

export const mkInt: SmartConstructor<Int> = flow(
  e.fromPredicate(Number.isInteger, () => "Not an integer"),
  e.map(x => x as Int)
);
