/**
 * Helper type constructor to create a type that is not instantiable without assertion
 *
 * ```
 * type MyType = Never<"MyType">;
 * ```
 *
 * evaluates to:
 *
 * ```
 * type MyType = {
 *   MyType: never
 * }
 * ```
 *
 * A product of this type and another type it's useful to create a "branded" version
 * of that type.
 *
 * type MyBrandedString = string & Never<"__MyBrandedString__">
 *
 * const a: MyBrandedString = "test" // ERROR
 * const b: MyBrandedString = "test" as MyBrandedString // OK
 */
export type Never<K extends string> = { [P in K]: never };

export declare class Refinement<R> {
  private readonly __refinement__: R;
}
