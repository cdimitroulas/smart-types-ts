import { pipe } from "fp-ts/lib/function";
import * as o from "fp-ts/lib/Option";
import { SmartType } from "../utilTypes";

export type PositiveNum = SmartType<number, "PositiveNum">;

export const mkPositiveNum = (input: number): o.Option<PositiveNum> =>
  pipe(
    input,
    o.fromPredicate(x => x > 0),
    o.map(x => x as PositiveNum)
  );
