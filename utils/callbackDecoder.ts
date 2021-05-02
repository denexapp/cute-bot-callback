import { JsonDecoder } from "ts.data.json";
import variables from "./variables";

export interface Callback<Type extends string, Params> {
  type: Type;
  secret: typeof variables.secret;
  object: Params;
}

const callbackDecoder = <Type extends string, Params>(
  type: Type,
  decoder: JsonDecoder.Decoder<Params>
) =>
  JsonDecoder.object<Callback<Type, Params>>(
    {
      type: JsonDecoder.isExactly(type),
      secret: JsonDecoder.isExactly(variables.secret),
      object: decoder,
    },
    "Callback"
  );

export default callbackDecoder;
