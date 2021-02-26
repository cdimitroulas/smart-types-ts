import { sequenceS } from "fp-ts/lib/Apply";
import * as e from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { getObjectSemigroup } from "fp-ts/lib/Semigroup";
import {
  EnforceNonEmptyRecord,
  SimpleObject,
  SmartConstructor,
  SmartConstructorOptional
} from "./utilTypes";

/**
 *
 * Given an object replaces all the values recursively with strings to describe an arbitrarily
 * nested object of validation errors
 *
 * @example
 * ```ts
 * type Person = {
 *   name: {
 *     display: StringOfLength<1, 30>
 *     full: StringOfLength<1, 100>
 *   },
 *   profilePicture: URL
 * }
 *
 * FieldError<Person> --> {
 *                          name?: {
 *                            display?: string;
 *                            full?: string;
 *                          };
 *                          profilePicture?: string;
 *                        }
 * ```
 */
type FieldError<
  T extends EnforceNonEmptyRecord<Record<PropertyKey, unknown>>
> = Partial<
  {
    [key in keyof T]: T[key] extends Record<PropertyKey, unknown>
      ? FieldError<T[key]>
      : string;
  }
>;

/**
 * A ConstructorObj is the object passed to the mkSmartObject function. It should have
 * keys of the object to construct and values which are Smart Constructors. This types works
 * recursively to allow for nested Smart Objects.
 */
type ConstructorObj<T extends Record<PropertyKey, unknown>> = {
  [key in keyof T]:
    | SmartConstructor<T[key]>
    | SmartConstructorOptional<T[key]>
    // Allow for nested SmartObjects
    | (T[key] extends Record<PropertyKey, unknown>
        ? MkSmartObject<T[key]>
        : never);
};

type MkSmartObject<T extends Record<PropertyKey, unknown>> = (
  input: SimpleObject<T>
) => e.Either<FieldError<T>, T>;

// Stricter typing for Object.keys
const keys: <T extends Record<PropertyKey, unknown>>(obj: T) => Array<keyof T> =
  Object.keys;

export const mkSmartObject = <
  T extends EnforceNonEmptyRecord<Record<PropertyKey, unknown>>
>(
  construct: ConstructorObj<T>
): MkSmartObject<T> => simpleObj => {
  const validationResultsObj = keys(construct).reduce(
    (accum, fieldName) => {
      const inputVal = simpleObj[fieldName];
      const smartConstructor: any = construct[fieldName];

      accum[fieldName] = pipe(
        smartConstructor(inputVal),
        e.mapLeft(error => ({ [fieldName]: error }))
      );

      return accum;
    },
    {} as any
  );

  return pipe(
    sequenceS(e.getValidation(getObjectSemigroup<FieldError<T>>()))(
      validationResultsObj
    ),
    // TODO try harder to actually make this crazy function compile although I'm not sure
    // it actually matters. If it's not possible, this module should have very good test
    // coverage to compensate for the lack of help from the compiler here.
    e.map(x => x as any)
  );
};
