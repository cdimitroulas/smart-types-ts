/**
 * ```ts
 * type ArrayWithLength<Min, Max>
 * ```
 *
 * Represents a list which has a constrained length. For example, ArrayWithLength<2, 10> is
 * a list with between 2 and 10 elements (inclusive).
 *
 * @since 0.0.1
 */
import { pipe } from "fp-ts/lib/function";
import * as e from "fp-ts/lib/Either";
import { SmartTypeRefined } from "../utilTypes";
import { mkWithLength } from "../withLength";

/**
 * @category smartType
 * @since 0.0.1
 */
export type ArrayWithLength<
  Min extends number,
  Max extends number,
  T
> = SmartTypeRefined<T[], "ArrayWithLength", { min: Min; max: Max }>;

/**
 * Constructs an ArrayWithLength. First a min and a max must be passed.
 *
 * Note: This function can throw if invalid min/max arguments are passed!
 *
 * @example
 * import * as e from 'fp-ts/Either'
 * import { mkArrayWithLength } from 'smart-types-ts'
 *
 * assert.deepStrictEqual(mkArrayWithLength(2, 10)([]), e.left("Length not between 2-10"))
 * assert.deepStrictEqual(mkArrayWithLength(2, 10)([1, 2, 3]), e.right([1, 2, 3]))
 *
 * @category smartConstructor
 * @since 0.0.1
 */
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
