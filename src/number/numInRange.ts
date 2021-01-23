import { pipe } from "fp-ts/lib/pipeable";
import * as e from "fp-ts/lib/Either";
import { SmartTypeRefined } from "../utilTypes";

export type NumInRange<
  Min extends number,
  Max extends number
> = SmartTypeRefined<number, "NumberInRange", { min: Min; max: Max }>;

type MkNumInRange = <Min extends number, Max extends number>(
  min: Min,
  max: Max
) => <Num extends number>(value: Num) => e.Either<string, NumInRange<Min, Max>>;

export const mkNumInRange: MkNumInRange = <
  Min extends number,
  Max extends number
>(
  min: Min,
  max: Max
) => {
  if (min >= max) {
    throw new Error(
      `Invalid min/max arguments provided to mkNumInRange. min must be less than max but received min: ${min}, max: ${max}`
    );
  }

  return value =>
    pipe(
      value,
      e.fromPredicate(
        val => val >= min && val <= max,
        () => `Number must be between ${min}-${max}`
      ),
      e.map(x => x as NumInRange<Min, Max>)
    );
};
