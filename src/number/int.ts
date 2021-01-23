import { pipe } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartType } from "../utilTypes";

export type Int = SmartType<number, "Integer">;

export const mkInt = (input: number): e.Either<string, Int> =>
  pipe(
    input,
    e.fromPredicate(Number.isInteger, () => "Not an integer"),
    e.map(x => x as Int)
  );
