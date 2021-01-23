import { pipe } from "fp-ts/lib/function";
import * as o from "fp-ts/lib/Option";
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
): (<A extends Sizeable>(value: A) => o.Option<WithLength<Min, Max, A>>) => {
  if (min >= max || !Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error(
      `Invalid range specified. Expected 2 positive integers where min is less than max but got min: ${min}, max: ${max}`
    );
  }

  return <A extends Sizeable>(value: A) =>
    pipe(
      value,
      o.fromPredicate(val => val.length >= min && val.length <= max),
      o.map(x => x as WithLength<Min, Max, A>)
    );
};
