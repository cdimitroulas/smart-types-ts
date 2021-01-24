import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import { mkWithLength } from "./withLength";

describe("WithLength", () => {
  describe("mkWithLength", () => {
    it("returns a Left when the input is invalid", () => {
      const min = 10;
      const max = 30;

      const invalidInput = fc.oneof(
        fc.array(fc.anything(), { minLength: max + 1 }),
        fc.array(fc.anything(), { maxLength: min - 1 }),
        fc.string({ maxLength: min - 1 }),
        fc.string({ minLength: max + 1 })
      );

      fc.assert(
        fc.property(invalidInput, input => {
          assert.deepStrictEqual(
            mkWithLength(min, max)(input),
            e.left(`Length not between ${min}-${max}`)
          );
        })
      );
    });

    it("succeeds when the input is an array with length not exceeding the specified amount", () => {
      const min = 10;
      const max = 30;

      const validInput = fc.oneof(
        fc.array(fc.anything(), { minLength: min, maxLength: max }),
        fc.string({ minLength: min, maxLength: max })
      );

      fc.assert(
        fc.property(validInput, input => {
          assert.deepStrictEqual(mkWithLength(min, max)(input), e.right(input));
        })
      );
    });

    // length cannot be negative!
    it("throws an error if min or max is negative", () => {
      assert.throws(() => mkWithLength(-5, 10));
      assert.throws(() => mkWithLength(0, -20));
    });
  });
});
