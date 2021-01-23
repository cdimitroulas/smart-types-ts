import { assert } from "chai";
import * as fc from "fast-check";
import * as o from "fp-ts/lib/Option";
import { mkFiniteArray } from "./finiteArray";

describe("FiniteArray", () => {
  describe("mkFiniteArray", () => {
    it("returns None when the input is invalid", () => {
      const length = 10;

      const invalidInput = fc.array(fc.anything(), { minLength: length + 1 });

      fc.assert(
        fc.property(invalidInput, <T>(list: T[]) => {
          assert.deepStrictEqual(mkFiniteArray(length)(list), o.none);
        })
      );
    });

    it("succeeds when the input is an array with length not exceeding the specified amount", () => {
      const length = 10;

      const validInput = fc.array(fc.anything(), { maxLength: length });

      fc.assert(
        fc.property(validInput, <T>(list: T[]) => {
          assert.deepStrictEqual(mkFiniteArray(length)(list), o.some(list));
        })
      );
    });
  });
});
