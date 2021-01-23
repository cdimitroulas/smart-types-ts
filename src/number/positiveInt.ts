import { pipe } from "fp-ts/lib/function";
import * as o from "fp-ts/lib/Option";
import { SmartType } from "../utilTypes";
import { mkInt } from "./int";
import { mkPositiveNum } from "./positiveNum";

export type PositiveInt = SmartType<number, "PositiveInt">;

export const mkPositiveInt = (input: number): o.Option<PositiveInt> =>
  pipe(
    mkInt(input),
    o.chain(mkPositiveNum),
    o.map((x: number) => x as PositiveInt)
  );
