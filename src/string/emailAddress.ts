/**
 * EmailAddress - A type representing an email address.
 *
 * The smart constructor ensures that the string is a valid email address and
 * also trims and lowercases any input.
 *
 * @since version 0.0.1
 */
import { pipe } from "fp-ts/lib/pipeable";
import * as e from "fp-ts/lib/Either";
import validator from "validator";
import { SmartType } from "../utilTypes";
import { mkString } from "./string";

export type EmailAddress = SmartType<string, "EmailAddress">;

export const mkEmailAddress = (
  value: unknown
): e.Either<string, EmailAddress> =>
  pipe(
    mkString(value),
    e.map(s => s.trim()),
    e.map(s => s.toLowerCase()),
    e.chain(
      e.fromPredicate(validator.isEmail, () => "Not a valid email address")
    ),
    e.map(email => email as EmailAddress)
  );
