import { flow } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartConstructor, SmartType } from "../utilTypes";
import { number } from "./number";

export type PositiveNum = SmartType<number, "PositiveNum">;

export const mkPositiveNum: SmartConstructor<PositiveNum> = flow(
  number,
  e.chain(e.fromPredicate(x => x > 0, () => "Not a positive number")),
  e.map(x => x as PositiveNum)
);
