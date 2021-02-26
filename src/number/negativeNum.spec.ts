import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import { mkNegativeNum } from "./negativeNum";

describe("NegativeNum", () => {
  describe("mkNegativeNum", () => {
    it("returns a Left when the input is invalid", () => {
      const invalidInput = fc.oneof(
        fc.integer({ min: 0 }),
        fc.double({ min: 0 }),
        fc.float({ min: 0 })
      );

      fc.assert(
        fc.property(invalidInput, num => {
          assert.deepStrictEqual(
            mkNegativeNum(num),
            e.left("Not a negative number")
          );
        })
      );
    });

    it("succeeds when the input is a negative number", () => {
      const validInput = fc.oneof(
        fc.integer({ max: -1 }),
        fc.double({ next: true, max: -0.5, noNaN: true }),
        fc.float({ next: true, max: new Float32Array([-0.5])[0], noNaN: true })
      );

      fc.assert(
        fc.property(validInput, num => {
          assert.deepStrictEqual(mkNegativeNum(num), e.right(num));
        })
      );
    });
  });
});
