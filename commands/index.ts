import { JsonDecoder } from 'ts.data.json'
import add from './add'
import connect from './connect'
import remove from './remove'
import { Callback } from '../utils/callbackDecoder'

export type Command<Params, Result> = (params: Params) => Promise<Result>

export interface CommandObject<Type extends string, Params, Result> {
  type: Type
  command: Command<Params, Result>
  decoder: JsonDecoder.Decoder<Callback<Type, Params>>
}

const commands = {
  add,
  connect,
  remove
} as const

export default commands