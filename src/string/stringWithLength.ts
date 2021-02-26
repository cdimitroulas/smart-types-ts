import { flow } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartConstructor, SmartTypeRefined } from "../utilTypes";
import { mkWithLength } from "../withLength";
import { string } from "./string";

export type StringWithLength<
  Min extends number,
  Max extends number
> = SmartTypeRefined<string, "StringWithLength", { min: Min; max: Max }>;

export const mkStringWithLength = <Min extends number, Max extends number>(
  min: Min,
  max: Max
): SmartConstructor<StringWithLength<Min, Max>> => {
  const mkWithLength_ = mkWithLength(min, max);

  return flow(
    string,
    e.chain(mkWithLength_),
    e.map((str: string) => str as StringWithLength<Min, Max>)
  );
};
