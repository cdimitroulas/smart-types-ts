import { pipe } from "fp-ts/lib/function";
import * as o from "fp-ts/lib/Option";
import { SmartType } from "../utilTypes";

export type Int = SmartType<number, "Integer">;

export const mkInt = (input: number): o.Option<Int> =>
  pipe(
    input,
    o.fromPredicate(Number.isInteger),
    o.map(x => x as Int)
  );
