---
title: array/arrayWithLength.ts
nav_order: 1
parent: Modules
---

## arrayWithLength overview

```ts
type ArrayWithLength<Min, Max>
```

Represents a list which has a constrained length. For example, ArrayWithLength<2, 10> is
a list with between 2 and 10 elements (inclusive).

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [smartConstructor](#smartconstructor)
  - [mkArrayWithLength](#mkarraywithlength)
- [smartType](#smarttype)
  - [ArrayWithLength (type alias)](#arraywithlength-type-alias)

---

# smartConstructor

## mkArrayWithLength

Constructs an ArrayWithLength. First a min and a max must be passed.

Note: This function can throw if invalid min/max arguments are passed!

**Signature**

```ts
export declare const mkArrayWithLength: <
  Min extends number,
  Max extends number
>(
  min: Min,
  max: Max
) => <T>(
  arr: T[]
) => e.Either<
  string,
  SmartTypeRefined<T[], "ArrayWithLength", { min: Min; max: Max }>
>;
```

**Example**

```ts
import * as e from "fp-ts/Either";
import { mkArrayWithLength } from "smart-types-ts";

assert.deepStrictEqual(
  mkArrayWithLength(2, 10)([]),
  e.left("Length not between 2-10")
);
assert.deepStrictEqual(mkArrayWithLength(2, 10)([1, 2, 3]), e.right([1, 2, 3]));
```

Added in v0.0.1

# smartType

## ArrayWithLength (type alias)

**Signature**

```ts
export type ArrayWithLength<
  Min extends number,
  Max extends number,
  T
> = SmartTypeRefined<T[], "ArrayWithLength", { min: Min; max: Max }>;
```

Added in v0.0.1
