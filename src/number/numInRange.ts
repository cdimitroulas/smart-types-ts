import * as e from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import { SmartConstructor, SmartTypeRefined } from "../utilTypes";
import { number } from "./number";

export type NumInRange<
  Min extends number,
  Max extends number
> = SmartTypeRefined<number, "NumberInRange", { min: Min; max: Max }>;

export const mkNumInRange = <Min extends number, Max extends number>(
  min: Min,
  max: Max
): SmartConstructor<NumInRange<Min, Max>> => {
  if (min >= max) {
    throw new Error(
      `Invalid min/max arguments provided to mkNumInRange. min must be less than max but received min: ${min}, max: ${max}`
    );
  }

  return flow(
    number,
    e.chain(
      e.fromPredicate(
        val => val >= min && val <= max,
        () => `Number must be between ${min}-${max}`
      )
    ),
    e.map(x => x as NumInRange<Min, Max>)
  );
};
