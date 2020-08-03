import { Command, CommandObject } from "."
import vk from '../utils/vk'
import { JsonDecoder } from 'ts.data.json'

type AddParams = null
type AddResult = null

const command: Command<AddParams, AddResult> = async () => {
  await vk.accountGetProfileInfo()
  return null
}

const decoder: JsonDecoder.Decoder<AddParams> = JsonDecoder.isNull(null)

const add: CommandObject<'add', AddParams, AddResult> = {
  command,
  decoder,
  type: 'add'
}

export default add