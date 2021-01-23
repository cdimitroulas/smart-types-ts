import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import { mkStringWithLength } from "./stringWithLength";

describe("StringWithLength", () => {
  describe("mkStringWithLength", () => {
    it("returns a Left when the input is invalid", () => {
      const minLength = 3;
      const maxLength = 10;

      const invalidInput = fc.oneof(
        fc.string({ minLength: maxLength + 1 }),
        fc.string({ maxLength: minLength - 1 })
      );

      fc.assert(
        fc.property(invalidInput, input => {
          assert.deepStrictEqual(
            mkStringWithLength(minLength, maxLength)(input),
            e.left(`Length not between ${minLength}-${maxLength}`)
          );
        })
      );
    });

    it("succeeds when the input is a string between minLength-maxLength", () => {
      const minLength = 3;
      const maxLength = 10;

      const validInput = fc.string({ minLength, maxLength });

      fc.assert(
        fc.property(validInput, input => {
          assert.deepStrictEqual(
            mkStringWithLength(minLength, maxLength)(input),
            e.right(input)
          );
        })
      );
    });

    // Strings cannot have a negative length!
    it("throws an error when given a min value which is less than 0", () => {
      assert.throws(() => mkStringWithLength(-5, 10));
    });
  });
});
