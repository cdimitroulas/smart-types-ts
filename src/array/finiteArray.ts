import { pipe } from "fp-ts/lib/function";
import * as o from "fp-ts/lib/Option";
import { SmartTypeRefined } from "../utilTypes";

export type FiniteArray<Length extends number, T> = SmartTypeRefined<
  T[],
  "FiniteArray",
  Length
>;

export const mkFiniteArray = <L extends number>(length: L) => <T>(
  arr: T[]
): o.Option<FiniteArray<L, T>> =>
  pipe(
    arr,
    o.fromPredicate(list => list.length <= length),
    o.map(list => list as FiniteArray<L, T>)
  );
