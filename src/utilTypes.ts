import * as e from "fp-ts/lib/Either";
type Never<K extends string> = { [P in K]: never };

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
 * allow this within smart constructors. Within smart-types-ts, all smart constructors have the
 * "mk" prefix e.g. mkEmailAddress.
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

export type SmartConstructor<S> = S extends SmartType<infer T, infer _>
  ? (input: T) => e.Either<string, S>
  : never;

export type SmartConstructorRefined<S> = S extends SmartTypeRefined<
  infer T,
  infer _Name,
  infer _Refinement
>
  ? (input: T) => e.Either<string, S>
  : never;

// Converts a SmartType back to a plain type like string/number/boolean
//
// @example
// ```ts
// SimpleType<URL> // string
// SimpleType<StringWithLength<1, 2>> // string
// SimpleType<URL[]> // string[]
// SimpleType<Int> // number
// ```
export type SimpleType<S> = S extends
  | SmartType<infer Type, infer _>
  | SmartTypeRefined<infer Type, infer _, infer __>
  ? Type // Make it work for arrays of SmartTypes as well
  : (S extends (infer T)[] ? SimpleType<T>[] : S);

// Recursively go through an object containing Smart Types and "dumb" the types back down
// to regular TS types like string/boolean/number etc. Regular "dumb" types are returned
// normally.
//
// @example
// ```ts
// type Person = {
//   profilePicture: URL;
//   name: {
//     displayName: StringOfLength<1, 30>
//     fullName: StringOfLength<1, 100>
//   };
//   friends: UUIDv4[];
//   metadata: {
//     lastLogin: Date;
//     signupDate: Date;
//   }
// }
//
// SimpleObject<Person> evaluates to:
// {
//   profilePicture: string;
//   name: {
//     displayName: string;
//     fullName: string;
//   };
//   friends: string[];
//   metadata: {
//     lastLogin: Date;
//     signupDate: Date;
//   }
// }
// ```
export type SimpleObject<Obj> = Obj extends Record<PropertyKey, infer _>
  ? { [key in keyof Obj]: SimpleObject<Obj[key]> }
  : SimpleType<Obj>;
