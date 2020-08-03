import { JsonDecoder } from 'ts.data.json'
import add from './add'

export type Command<Params, Result> = (params: Params) => Promise<Result>

export interface CommandObject<Type extends string, Params, Result> {
  type: Type
  command: Command<Params, Result>
  decoder: JsonDecoder.Decoder<Params>
}

const commands = {
  add
} as const

export default commands