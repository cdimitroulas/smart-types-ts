import { flow } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartConstructor, SmartType } from "../utilTypes";

export type PositiveNum = SmartType<number, "PositiveNum">;

export const mkPositiveNum: SmartConstructor<PositiveNum> = flow(
  e.fromPredicate(x => x > 0, () => "Not a positive number"),
  e.map(x => x as PositiveNum)
);
