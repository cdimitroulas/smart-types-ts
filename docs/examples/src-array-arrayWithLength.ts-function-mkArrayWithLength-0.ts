import * as assert from "assert";
import * as e from "fp-ts/Either";
import { mkArrayWithLength } from "smart-types";

assert.deepStrictEqual(
  mkArrayWithLength(2, 10)([]),
  e.left("Length not between 2-10")
);
assert.deepStrictEqual(mkArrayWithLength(2, 10)([1, 2, 3]), e.right([1, 2, 3]));
