import { type CSSProperties } from "react";

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

interface CSSProps extends CSSProperties {
  "--tempo-time"?: string
};
export type CSSPropertiesWithVars = CreateMutable<CSSProps>;
