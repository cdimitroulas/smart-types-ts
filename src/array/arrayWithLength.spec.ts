import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import { mkArrayWithLength } from "./arrayWithLength";

describe("ArrayWithLength", () => {
  describe("mkArrayWithLength", () => {
    it("returns a Left when the input is invalid", () => {
      const maxLength = 10;

      const invalidInput = fc.array(fc.anything(), {
        minLength: maxLength + 1
      });

      fc.assert(
        fc.property(invalidInput, <T>(list: T[]) => {
          assert.deepStrictEqual(
            mkArrayWithLength(0, maxLength)(list),
            e.left(`Length not between 0-${maxLength}`)
          );
        })
      );
    });

    it("succeeds when the input is an array with maxLength not exceeding the specified amount", () => {
      const maxLength = 10;

      const validInput = fc.array(fc.anything(), { maxLength: maxLength });

      fc.assert(
        fc.property(validInput, <T>(list: T[]) => {
          assert.deepStrictEqual(
            mkArrayWithLength(0, maxLength)(list),
            e.right(list)
          );
        })
      );
    });

    // Arrays cannot have a negative length!
    it("throws an error when given a min value which is less than 0", () => {
      assert.throws(() => mkArrayWithLength(-5, 10));
    });
  });
});
