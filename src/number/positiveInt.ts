import { flow } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartConstructor, SmartType } from "../utilTypes";
import { mkInt } from "./int";
import { mkPositiveNum } from "./positiveNum";

export type PositiveInt = SmartType<number, "PositiveInt">;

export const mkPositiveInt: SmartConstructor<PositiveInt> = flow(
  mkInt,
  e.chain(mkPositiveNum),
  e.map((x: number) => x as PositiveInt)
);
