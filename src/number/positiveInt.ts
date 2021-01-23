import { pipe } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartType } from "../utilTypes";
import { mkInt } from "./int";
import { mkPositiveNum } from "./positiveNum";

export type PositiveInt = SmartType<number, "PositiveInt">;

export const mkPositiveInt = (input: number): e.Either<string, PositiveInt> =>
  pipe(
    mkInt(input),
    e.chain(mkPositiveNum),
    e.map((x: number) => x as PositiveInt)
  );
