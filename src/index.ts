import { optional } from "./optional";
import { mkEmailAddress } from "./string/emailAddress";
import { mkSmartObject } from "./mkSmartObject";

export { ArrayWithLength, mkArrayWithLength } from "./array/arrayWithLength";
export { Int, mkInt } from "./number/int";
export { NegativeNum, mkNegativeNum } from "./number/negativeNum";
export { NumInRange, mkNumInRange } from "./number/numInRange";
export { PositiveInt, mkPositiveInt } from "./number/positiveInt";
export { PositiveNum, mkPositiveNum } from "./number/positiveNum";
export { EmailAddress, mkEmailAddress } from "./string/emailAddress";
export {
  StringWithLength,
  mkStringWithLength
} from "./string/stringWithLength";
export { URL, mkURL } from "./string/url";
export { mkSmartObject } from "./mkSmartObject";
export {
  SimpleObject,
  SmartConstructor,
  SmartType,
  SmartTypeRefined
} from "./utilTypes";

const optionalEmail = optional(mkEmailAddress);

optionalEmail(undefined);

const mkThing = mkSmartObject({
  email: optionalEmail
});

console.log(mkThing({ email: undefined }));
