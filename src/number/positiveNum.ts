import { pipe } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartType } from "../utilTypes";

export type PositiveNum = SmartType<number, "PositiveNum">;

export const mkPositiveNum = (input: number): e.Either<string, PositiveNum> =>
  pipe(
    input,
    e.fromPredicate(x => x > 0, () => "Not a positive number"),
    e.map(x => x as PositiveNum)
  );
