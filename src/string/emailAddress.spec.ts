import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import validator from "validator";
import { mkEmailAddress } from "./emailAddress";

describe("EmailAddress", () => {
  describe("mkEmailAddress", () => {
    it("returns None when the input is invalid", () => {
      const invalidInput = fc.string().filter(str => !validator.isEmail(str));

      fc.assert(
        fc.property(invalidInput, (str: string) => {
          assert.deepStrictEqual(
            mkEmailAddress(str),
            e.left("Not a valid email address")
          );
        })
      );
    });

    it("succeeds when the input is a valid email address", () => {
      const validInput = fc
        .emailAddress()
        .filter(email => validator.isEmail(email));

      fc.assert(
        fc.property(validInput, (email: string) => {
          assert.deepStrictEqual(mkEmailAddress(email), e.right(email));
        })
      );
    });

    it("lowercases the input", () => {
      assert.deepStrictEqual(
        mkEmailAddress("Test@example.com"),
        e.right("test@example.com")
      );
    });

    it("trims the input", () => {
      assert.deepStrictEqual(
        mkEmailAddress("  test@example.com    "),
        e.right("test@example.com")
      );
    });
  });
});
