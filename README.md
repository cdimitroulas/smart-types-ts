# Smart Types TS

A collection of types and smart constructors which enable you to be more strict when defining
your application's important types/interfaces.

## Usage

Define your domain types using the relevant types from `smart-types-ts`:

```ts
import { EmailAddress, StringOfLength, URL } from "smart-types-ts";

interface User {
  email: EmailAddress;
  name: {
    display: StringOfLength<1, 30>;
    full: StringOfLength<1, 100>;
  };
  fullName: StringOfLength<1, 50>;
  profilePicture: URL;
}
```

Define functions to convert simple objects to your _smart types_:

```ts
import {
  mkEmailAddress,
  mkObject,
  mkStringOfLength,
  mkURL,
} from "smart-types-ts";

// Define our mkUser function which can be used to construct a User
const mkUser = mkSmartObject<User>({
  email: mkEmailAddress,
  name: mkSmartObject({
    display: mkStringOfLength<1, 30>,
    full: mkStringOfLength<1, 100>
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
modelling your application's domain without havnig to deal with complex Typescript tricks.

It also provides the `mkSmartObject` function which allows you to easily convert your simple
objects into _smart objects_.
