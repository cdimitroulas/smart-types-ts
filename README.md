# Smart Types TS

A collection of _Smart Types_ and _Smart Constructors_ which enable you to be more strict when defining
your application's important types/interfaces.

**Contents**

- [Definitions](#definitions)
- [Usage examples](#usage)

## Definitions

### What is a Smart Type?

A _Smart Type_ is a type which cannot be created without going through a special function.

For example, trying to directly assign a variable the `EmailAddress` type will not work:

```ts
import { EmailAddress } from "smart-types-ts";

const myEmail: EmailAddress = "test@example.com"; // TS Error!
```

### What is a Smart Constructor?

A _Smart Constructor_ is a function which produces a _Smart Type_. All smart constructors in this
library take some input and return either a string or a Smart Type (`Either<string, SmartType>`).

The `Either` type comes from the `fp-ts` library. You can read more about how to work with this
[here](https://rlee.dev/writing/practical-guide-to-fp-ts-part-3#why-use-eithers) or you can
[read the documentation](https://gcanti.github.io/fp-ts/modules/Either.ts.html).

For example, to create an `EmailAddress` value, you can use the corresponding `mkEmailAddress`
_Smart Constructor_:

```ts
import { mkEmailAddress } from "smart-types-ts";

mkEmailAddress("test@example.com"); // Right("test@example.com")

mkEmailAddress("bad-input"); // Left("Not a valid email address")
```

## Usage

Define your domain types using the relevant types from `smart-types-ts`:

```ts
import { EmailAddress, StringWithLength, URL } from "smart-types-ts";

interface User {
  email: EmailAddress;
  name: {
    display: StringWithLength<1, 30>;
    full: StringWithLength<1, 100>;
  };
  profilePicture: URL;
}
```

Define functions to convert simple objects to your _smart types_:

```ts
import {
  mkEmailAddress,
  mkObject,
  mkStringWithLength,
  mkURL,
} from "smart-types-ts";

// Define our mkUser function which can be used to construct a User
const mkUser = mkSmartObject<User>({
  email: mkEmailAddress,
  // use mkSmartObject again for nested objects
  name: mkSmartObject({
    display: mkStringWithLength<1, 30>,
    full: mkStringWithLength<1, 100>
  }),
  profilePicture: mkUrl,
});


mkUser({ email: "bleh", name: { display: "", full: "" }, profilePicture: "bad-url" });
// Left({
//   email: "Not a valid email",
//   name: {
//     display: "Length not between 1-30",
//     full: "Length not between 1-100",
//   },
//   profilePicture: "Not a valid URL"
// })

mkUser({
  email: "hello@example.com",
  name: { display: "Jane", full: "Jane Doe" },
  profilePicture: "https://www.example.com/photo/1",
});
// Right(User)
```

## What problem does this library solve?

The Typescript compiler is a powerful tool which developers can leverage to guarantee
that their code behaves correctly. Types provide clear definitions of the important entities
in a program.

However, the default arbitrary types available in the language are not descriptive enough to
limit invalid data within a program.

Let's look at a simple example of a User which has an `email`, a `username` and a `password`.
This could be represented by the following interface:

```ts
interface User {
  email: string;
  fullName: string;
  profilePicture: string;
}
```

There are a number of problems with this type. It doesn't tell us anything about what values
are valid for each of the fields. An `email` should only ever contain a valid email address.
We may want the `fullName` to have a minimum length of 1 character and a maximum length of 50
characters. The `profilePicture` should be a valid URL pointing to the location of the photo.

What if instead we were able to define these constrains in terms of types?

This could look like:

```ts
interface User {
  email: EmailAddress;
  fullName: StringOfLength<1, 50>;
  profilePicture: URL;
}
```

`smart-types-ts` simply provides a large number of these _Smart Types_ and their corresponding
constructors (called _Smart Constructors_!) ready for you to use, so that you can get on with
modelling your application's domain without having to deal with complex Typescript tricks.

It also provides the `mkSmartObject` function which allows you to build your _smart objects_ from
unknown inputs. This is useful for validating/parsing data from HTTP requests, files, databases, or
any external input to your program.
