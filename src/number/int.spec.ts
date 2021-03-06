import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import { mkInt } from "./int";

describe("Int", () => {
  describe("mkInt", () => {
    it("returns None when the input is invalid", () => {
      const invalidInput = fc.oneof(
        fc.float().filter(num => !Number.isInteger(num)),
        fc.double().filter(num => !Number.isInteger(num))
      );

      fc.assert(
        fc.property(invalidInput, (num: number) => {
          assert.deepStrictEqual(mkInt(num), e.left("Not an integer"));
        })
      );
    });

    it("succeeds when the input is an integer", () => {
      const validInput = fc.integer();

      fc.assert(
        fc.property(validInput, (num: number) => {
          assert.deepStrictEqual(mkInt(num), e.right(num));
        })
      );
    });
  });
});
