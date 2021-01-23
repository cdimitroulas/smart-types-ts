import { pipe } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartTypeRefined } from "../utilTypes";
import { mkWithLength } from "../withLength";
import { mkString } from "./string";

export type StringWithLength<
  Min extends number,
  Max extends number
> = SmartTypeRefined<string, "StringWithLength", { min: Min; max: Max }>;

export const mkStringWithLength = <Min extends number, Max extends number>(
  min: Min,
  max: Max
): ((input: unknown) => e.Either<string, StringWithLength<Min, Max>>) => {
  const mkWithLength_ = mkWithLength(min, max);

  return input =>
    pipe(
      mkString(input),
      e.chain(mkWithLength_),
      e.map(str => (str as string) as StringWithLength<Min, Max>)
    );
};
