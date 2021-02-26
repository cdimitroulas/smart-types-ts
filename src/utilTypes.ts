import * as e from "fp-ts/lib/Either";
import * as o from "fp-ts/lib/Option";

type Never<K extends string> = { [P in K]: never };

export type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;

/**
 *
 * SmartType is a type constructor which creates a type that is not instantiable
 * without an assertion.
 *
 * It accepts two generic types:
 * - the underlying type to wrap
 * - a unique name for the SmartType
 *
 * @example
 * ```ts
 * type MyStringType = SmartType<string, "MyStringType">
 *
 * const a: MyStringType = "test" // ERROR
 * const b: MyStringType = "test" as MyBrandedString // OK
 * ```
 *
 * The idea is to avoid using type assertions inside regular application code and only
 * allow this within smart constructors. Within smart-types-ts, all smart constructors have
 * the "mk" prefix e.g. mkEmailAddress.
 *
 * @since 0.0.1
 */
export type SmartType<Type, Name extends string> = Type & Never<Name>;

declare class Refinement<R> {
  private readonly __refinement__: R;
}

/**
 * SmartTypeRefined builds upon SmartType and allows for additional type information to be
 * encoded.
 *
 * For example, if we want a type which specifies that a number must lie within a particular
 * range, then the type must contain the min/max values of that range (which cannot be achieved
 * using the existing SmartType type).
 *
 * @example
 * ```ts
 * type Between2And4 = SmartTypeRefined<number, "NumInRange", { min: 2, max: 4 }>
 * type Between4And8 = SmartTypeRefined<number, "NumInRange", { min: 4, max: 8 }>
 *
 * const a: Between2And4 = 3 as Between2And4
 * const b: Between4And8 = a // ERROR
 * ```
 *
 * @since 0.0.1
 */
export type SmartTypeRefined<Type, Name extends string, R> = Type &
  Never<Name> &
  Refinement<R>;

export type SmartConstructor<S> = (input: unknown) => e.Either<string, S>;

export type SmartConstructorOptional<S> = (
  input: unknown
) => e.Either<string, o.Option<S>>;
