import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import { mkPositiveInt } from "./positiveInt";

describe("PositiveInt", () => {
  describe("mkPositiveInt", () => {
    it("fails when the input is invalid", () => {
      const invalidInteger = fc.integer({ max: 0 });

      fc.assert(
        fc.property(invalidInteger, (num: number) => {
          assert.deepStrictEqual(
            mkPositiveInt(num),
            e.left("Not a positive number")
          );
        })
      );
    });

    it("succeeds when the input is a positive integer", () => {
      const validInput = fc.integer({ min: 1 });

      fc.assert(
        fc.property(validInput, (num: number) => {
          assert.deepStrictEqual(mkPositiveInt(num), e.right(num));
        })
      );
    });
  });
});
