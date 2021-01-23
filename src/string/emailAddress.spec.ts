import { assert } from "chai";
import * as fc from "fast-check";
import * as o from "fp-ts/lib/Option";
import { mkEmailAddress } from "./emailAddress";

describe("EmailAddress", () => {
  describe("mkEmailAddress", () => {
    it("returns None when the input is invalid", () => {
      fc.assert(
        fc.property(fc.string(), (str: string) => {
          assert.deepStrictEqual(mkEmailAddress(str), o.none);
        })
      );
    });

    it("succeeds when the input is a valid email address", () => {
      fc.assert(
        fc.property(fc.emailAddress(), (email: string) => {
          assert.deepStrictEqual(mkEmailAddress(email), o.some(email));
        })
      );
    });

    it("lowercases the input", () => {
      assert.deepStrictEqual(
        mkEmailAddress("Test@example.com"),
        o.some("test@example.com")
      );
    });

    it("trims the input", () => {
      assert.deepStrictEqual(
        mkEmailAddress("  test@example.com    "),
        o.some("test@example.com")
      );
    });
  });
});
