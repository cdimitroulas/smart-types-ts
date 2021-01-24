import { pipe } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartTypeRefined } from "../utilTypes";
import { mkWithLength } from "../withLength";

export type ArrayWithLength<
  Min extends number,
  Max extends number,
  T
> = SmartTypeRefined<T[], "ArrayWithLength", { min: Min; max: Max }>;

export const mkArrayWithLength = <Min extends number, Max extends number>(
  min: Min,
  max: Max
): (<T>(arr: T[]) => e.Either<string, ArrayWithLength<Min, Max, T>>) => {
  const mkWithLength_ = mkWithLength(min, max);

  return <T>(arr: T[]) =>
    pipe(
      mkWithLength_(arr),
      e.map((list: T[]) => list as ArrayWithLength<Min, Max, T>)
    );
};
