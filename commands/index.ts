import { JsonDecoder } from 'ts.data.json'
import add from './add'
import connect from './connect'
import { Callback } from '../utils/callbackDecoder'

export type Command<Params, Result> = (params: Params) => Promise<Result>

export interface CommandObject<Type extends string, Params, Result> {
  type: Type
  command: Command<Params, Result>
  decoder: JsonDecoder.Decoder<Callback<Type, Params>>
}

const commands = {
  add,
  connect
} as const

export default commands