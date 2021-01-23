import { assert } from "chai";
import * as fc from "fast-check";
import * as o from "fp-ts/lib/Option";
import { mkNumInRange } from "./numInRange";

describe("NumInRange", () => {
  describe("mkNumInRange", () => {
    it("returns None when the input is invalid", () => {
      const rangeMin = 0;
      const rangeMax = 10;

      const invalidInput = fc.oneof(
        fc.integer({ max: rangeMin - 1 }),
        fc.integer({ min: rangeMax + 1 }),
        fc.float({ next: true, max: new Float32Array([rangeMin - 1])[0] }),
        fc.float({ next: true, min: new Float32Array([rangeMax + 1.1])[0] }),
        fc.double({ next: true, max: rangeMin - 1 }),
        fc.double({ next: true, min: rangeMax + 1.1 })
      );

      fc.assert(
        fc.property(invalidInput, (num: number) => {
          assert.deepStrictEqual(mkNumInRange(rangeMin, rangeMax)(num), o.none);
        })
      );
    });

    it("succeeds when the input is a positive integer", () => {
      const rangeMin = 100;
      const rangeMax = 120;

      const validInput = fc.oneof(
        fc.integer({ min: rangeMin, max: rangeMax }),
        fc.float({ min: rangeMin, max: rangeMax }),
        fc.double({ min: rangeMin, max: rangeMax })
      );

      fc.assert(
        fc.property(validInput, (num: number) => {
          assert.deepStrictEqual(
            mkNumInRange(rangeMin, rangeMax)(num),
            o.some(num)
          );
        })
      );
    });

    it("throws when given invalid min/max arguments", () => {
      assert.throws(() => mkNumInRange(10, 0));
    });
  });
});
