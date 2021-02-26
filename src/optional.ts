import * as e from "fp-ts/lib/Either";
import * as o from "fp-ts/lib/Option";
import { flow } from "fp-ts/lib/function";
import { SmartConstructor, SmartConstructorOptional } from "./utilTypes";

const isDefined = <T>(val?: T): val is T => val !== undefined;

const optional = <ST>(
  smartConstructor: SmartConstructor<ST>
): SmartConstructorOptional<ST> => {
  return flow(
    o.fromPredicate(isDefined),
    o.map(smartConstructor),
    o.sequence(e.either)
  );
};

export { optional };
