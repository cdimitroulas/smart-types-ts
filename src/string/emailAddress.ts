/**
 * EmailAddress - A type representing an email address.
 *
 * The smart constructor ensures that the string is a valid email address and
 * also trims and lowercases any input.
 *
 * @since version 0.0.1
 */
import * as e from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import validator from "validator";
import { SmartConstructor, SmartType } from "../utilTypes";
import { string } from "./string";

export type EmailAddress = SmartType<string, "EmailAddress">;

export const mkEmailAddress: SmartConstructor<EmailAddress> = flow(
  string,
  e.map(s => s.trim()),
  e.map(s => s.toLowerCase()),
  e.chain(
    e.fromPredicate(validator.isEmail, () => "Not a valid email address")
  ),
  e.map(email => email as EmailAddress)
);
