import { pipe } from "fp-ts/lib/function";
import * as o from "fp-ts/lib/Option";
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
): (<T>(arr: T[]) => o.Option<ArrayWithLength<Min, Max, T>>) => {
  if (min < 0) {
    throw new Error(
      "min argument for mkArrayWithLength cannot be less than zero"
    );
  }

  const mkWithLength_ = mkWithLength(min, max);

  return <T>(arr: T[]) =>
    pipe(
      mkWithLength_(arr),
      o.map(list => (list as T) as ArrayWithLength<Min, Max, T>)
    );
};
