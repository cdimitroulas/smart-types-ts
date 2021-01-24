import { assert } from "chai";
import * as e from "fp-ts/lib/Either";
import { mkSmartObject } from "./mkSmartObject";
import { EmailAddress, mkEmailAddress } from "./string/emailAddress";
import {
  mkStringWithLength,
  StringWithLength
} from "./string/stringWithLength";
import { URL, mkURL } from "./string/url";

describe("mkSmartObject", () => {
  it("fails when the input is invalid", () => {
    type Person = {
      email: EmailAddress;
      name: {
        display: StringWithLength<1, 30>;
        full: StringWithLength<1, 100>;
      };
      profilePic: URL;
    };

    const mkPerson = mkSmartObject<Person>({
      email: mkEmailAddress,
      name: mkSmartObject({
        display: mkStringWithLength(1, 30),
        full: mkStringWithLength(1, 100)
      }),
      profilePic: mkURL
    });

    assert.deepStrictEqual(
      mkPerson({
        email: "bad-email",
        name: { display: "", full: "" },
        profilePic: "bad-url"
      }),
      e.left({
        email: "Not a valid email address",
        name: {
          display: "Length not between 1-30",
          full: "Length not between 1-100"
        },
        profilePic: "Not a valid URL"
      })
    );
  });

  it("succeeds when the input is valid", () => {
    type Person = {
      email: EmailAddress;
      name: {
        display: StringWithLength<1, 30>;
        full: StringWithLength<1, 100>;
      };
      profilePic: URL;
    };

    const mkPerson = mkSmartObject<Person>({
      email: mkEmailAddress,
      name: mkSmartObject({
        display: mkStringWithLength(1, 30),
        full: mkStringWithLength(1, 100)
      }),
      profilePic: mkURL
    });

    const input = {
      email: "test@example.com",
      name: { display: "Jane", full: "Jane Doe" },
      profilePic: "https://www.example.come/images/1"
    };

    assert.deepStrictEqual(mkPerson(input), e.right(input));
  });
});
