/**
 * EmailAddress - A type representing an email address.
 *
 * The smart constructor ensures that the string is a valid email address and
 * also trims and lowercases any input.
 *
 * @since version 0.0.1
 */
import { pipe } from "fp-ts/lib/pipeable";
import * as o from "fp-ts/lib/Option";
import validator from "validator";

import { SmartType } from "../utilTypes";

export type EmailAddress = SmartType<string, "EmailAddress">;

export const mkEmailAddress = (value: string): o.Option<EmailAddress> =>
  pipe(
    value,
    s => s.trim(),
    s => s.toLowerCase(),
    o.fromPredicate(validator.isEmail),
    o.map(email => email as EmailAddress)
  );
