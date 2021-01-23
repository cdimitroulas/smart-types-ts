import { assert } from "chai";
import * as fc from "fast-check";
import * as o from "fp-ts/lib/Option";
import { mkPositiveInt } from "./positiveInt";

describe("PositiveInt", () => {
  describe("mkPositiveInt", () => {
    it("returns None when the input is invalid", () => {
      const invalidInput = fc.integer({ max: 0 });

      fc.assert(
        fc.property(invalidInput, (num: number) => {
          assert.deepStrictEqual(mkPositiveInt(num), o.none);
        })
      );
    });

    it("succeeds when the input is a positive integer", () => {
      const validInput = fc.integer({ min: 1 });

      fc.assert(
        fc.property(validInput, (num: number) => {
          assert.deepStrictEqual(mkPositiveInt(num), o.some(num));
        })
      );
    });
  });
});
