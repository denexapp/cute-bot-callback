import { JsonDecoder } from "ts.data.json";
import { Callback } from "../utils/callbackDecoder";
import add from "./add";
import connect from "./connect";
import kick from "./kick";
import remove from "./remove";

export type Command<Params, Result> = (params: Params) => Promise<Result>;

export interface CommandObject<Type extends string, Params, Result> {
  type: Type;
  command: Command<Params, Result>;
  decoder: JsonDecoder.Decoder<Callback<Type, Params>>;
}

const commands = {
  add,
  connect,
  kick,
  remove,
} as const;

export default commands;
