# Smart Types TS

A collection of types and smart constructors which enable you to be more strict when defining
your application's important types/interfaces.

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
  username: string;
  password: string;
}
```

There are a number of problems with this type. It doesn't tell us anything about what values
are valid for each of the fields. An `email` should only ever contain a valid email address.
We may want a `username` to have a minimum length of 4 characters and a maximum length of 30
characters. The `password` may need to meet some rules to may it more secure, such as a
min length and a certain number of letters/numbers; it should also be hashed so that we never
save plain text passwords to our database!

What if instead we were able to define these constrains in terms of types?

This could look like:

```ts
interface User {
  email: EmailAddress;
  username: StringOfLength<4, 30>;
  password: HashedPassword;
}
```

`smart-types-ts` simply provides a large number of these utility types and their constructors
ready for you to use, so that you can get on with modelling your application's domain without
worrying about dealing with clever Typescript tricks.
