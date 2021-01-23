import { pipe } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartTypeRefined } from "./utilTypes";

interface Sizeable {
  length: number;
}

export type WithLength<
  Min extends number,
  Max extends number,
  A extends Sizeable
> = SmartTypeRefined<A, "WithLength", { min: Min; max: Max }>;

export const mkWithLength = <Min extends number, Max extends number>(
  min: Min,
  max: Max
): (<A extends Sizeable>(
  value: A
) => e.Either<string, WithLength<Min, Max, A>>) => {
  if (min < 0 || max < 0) {
    throw new Error(
      `Invalid min/max specified. min/max must not be less than zero but got min: ${min}, max: ${max}`
    );
  }

  if (min >= max || !Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error(
      `Invalid min/max specified. min/max must be integers where min is less than max but got min: ${min}, max: ${max}`
    );
  }

  return <A extends Sizeable>(value: A) =>
    pipe(
      value,
      e.fromPredicate(
        val => val.length >= min && val.length <= max,
        () => `Length not between ${min}-${max}`
      ),
      e.map(x => x as WithLength<Min, Max, A>)
    );
};
