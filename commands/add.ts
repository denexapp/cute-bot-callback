import { JsonDecoder } from 'ts.data.json'
import { Command, CommandObject } from "."
import callbackDecoder, { Callback } from '../utils/callbackDecoder'
import vk from '../utils/vk'

type Type = 'add'
type Params = null
type Result = null

const type: Type = 'add'

const command: Command<Params, Result> = async () => {
  await vk.accountGetProfileInfo()
  return null
}

const decoder: JsonDecoder.Decoder<Callback<Type, Params>> = callbackDecoder(type, JsonDecoder.isNull(null))

const add: CommandObject<Type, Params, Result> = {
  command,
  decoder,
  type
}

export default add