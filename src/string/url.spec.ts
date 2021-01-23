import { assert } from "chai";
import * as fc from "fast-check";
import * as e from "fp-ts/lib/Either";
import validator from "validator";
import { mkURL } from "./url";

describe("URL", () => {
  describe("mkURL", () => {
    it("returns None when the input is invalid", () => {
      const invalidInput = fc.string().filter(str => !validator.isURL(str));

      fc.assert(
        fc.property(invalidInput, (url: string) => {
          assert.deepStrictEqual(mkURL(url), e.left("Not a valid URL"));
        })
      );
    });

    it("succeeds when the input is a valid URL", () => {
      fc.assert(
        fc.property(fc.webUrl(), (url: string) => {
          assert.deepStrictEqual(mkURL(url), e.right(url));
        })
      );
    });

    it("trims the input", () => {
      assert.deepStrictEqual(
        mkURL("  https://www.example.com    "),
        e.right("https://www.example.com")
      );
    });
  });
});
