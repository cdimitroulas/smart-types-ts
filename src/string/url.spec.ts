import { assert } from "chai";
import * as fc from "fast-check";
import * as o from "fp-ts/lib/Option";
import validator from "validator";
import { mkURL } from "./url";

describe("URL", () => {
  describe("mkURL", () => {
    it("returns None when the input is invalid", () => {
      const invalidInput = fc.string().filter(str => !validator.isURL(str));

      fc.assert(
        fc.property(invalidInput, (url: string) => {
          assert.deepStrictEqual(mkURL(url), o.none);
        })
      );
    });

    it("succeeds when the input is a valid URL", () => {
      fc.assert(
        fc.property(fc.webUrl(), (url: string) => {
          assert.deepStrictEqual(mkURL(url), o.some(url));
        })
      );
    });

    it("trims the input", () => {
      assert.deepStrictEqual(
        mkURL("  https://www.example.com    "),
        o.some("https://www.example.com")
      );
    });
  });
});
