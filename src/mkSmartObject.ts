import { sequenceS } from "fp-ts/lib/Apply";
import * as e from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { getObjectSemigroup } from "fp-ts/lib/Semigroup";
import {
  SimpleObject,
  SmartConstructor,
  SmartConstructorRefined
} from "./utilTypes";

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;

// Given an object replaces all the values with recursively strings to describe an arbitrarily
// nested object of validation errors
//
// @example
// ```ts
// type Person = {
//   name: {
//     display: StringOfLength<1, 30>
//     full: StringOfLength<1, 100>
//   },
//   profilePicture: URL
// }
//
// FieldError<Person> --> {
//                          name?: {
//                            display?: string;
//                            full?: string;
//                          };
//                          profilePicture?: string;
//                        }
// ```
type FieldError<
  T extends EnforceNonEmptyRecord<Record<PropertyKey, unknown>>
> = Partial<
  {
    [key in keyof T]: T[key] extends Record<PropertyKey, unknown>
      ? FieldError<T[key]>
      : string;
  }
>;

type ConstructorObj<T extends Record<PropertyKey, unknown>> = {
  [key in keyof T]:
    | SmartConstructor<T[key]>
    | SmartConstructorRefined<T[key]>
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

// type TestType = {
//   emailAddress: EmailAddress;
//   profilePicture: URL;
// };

// const mkPerson = mkSmartObject<TestType>({
//   emailAddress: mkEmailAddress,
//   profilePicture: mkURL,
// });

// console.log(mkPerson({ emailAddress: "test" }));
