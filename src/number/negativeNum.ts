import { flow } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartConstructor, SmartType } from "../utilTypes";
import { number } from "./number";

export type NegativeNum = SmartType<number, "NegativeNum">;

export const mkNegativeNum: SmartConstructor<NegativeNum> = flow(
  number,
  e.chain(e.fromPredicate(x => x < 0, () => "Not a negative number")),
  e.map(x => x as NegativeNum)
);
