import { pipe } from "fp-ts/lib/function";
import * as o from "fp-ts/lib/Option";
import { SmartTypeRefined } from "../utilTypes";
import { mkWithLength } from "../withLength";

export type StringWithLength<
  Min extends number,
  Max extends number
> = SmartTypeRefined<string, "StringWithLength", { min: Min; max: Max }>;

export const mkStringWithLength = <Min extends number, Max extends number>(
  min: Min,
  max: Max
): ((arr: string) => o.Option<StringWithLength<Min, Max>>) => {
  const mkWithLength_ = mkWithLength(min, max);

  return (str: string) =>
    pipe(
      mkWithLength_(str),
      o.map(str => (str as string) as StringWithLength<Min, Max>)
    );
};
