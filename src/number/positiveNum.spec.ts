import { assert } from "chai";
import * as fc from "fast-check";
import * as o from "fp-ts/lib/Option";
import { mkPositiveNum } from "./positiveNum";

describe("PositiveNum", () => {
  describe("mkPositiveNum", () => {
    it("returns None when the input is invalid", () => {
      const invalidInput = fc.oneof(
        fc.integer({ max: 0 }),
        fc.double({ max: 0 }),
        fc.float({ max: 0 })
      );

      fc.assert(
        fc.property(invalidInput, (num: number) => {
          assert.deepStrictEqual(mkPositiveNum(num), o.none);
        })
      );
    });

    it("succeeds when the input is a positive number", () => {
      const validInput = fc.oneof(
        fc.integer({ min: 1 }),
        fc.double({ min: 0.000001 }),
        fc.float({ min: 0.000001 })
      );

      fc.assert(
        fc.property(validInput, (num: number) => {
          assert.deepStrictEqual(mkPositiveNum(num), o.some(num));
        })
      );
    });
  });
});
