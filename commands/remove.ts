import { JsonDecoder } from 'ts.data.json'
import { Command, CommandObject } from "."
import callbackDecoder, { Callback } from '../utils/callbackDecoder'
import { connectCommand } from '../utils/consts'
import vk from '../utils/vk'

type Type = 'remove'

type Params = {
  conversationMessageId: number
  chatId: number
}

type Result = null

const type: Type = 'remove'

const command: Command<Params, Result> = async params => {
  const { chatId, conversationMessageId } = params
  const { items: [{ id }] } = await vk.messagesGetByConversationMessageId(chatId, conversationMessageId)
  const results = await vk.messagesDelete(id, true)
  const result = results[id] === 1
  
  if (!result) {
    throw new Error('Message hasn\'t been removed')
  }

  return null
}

const decoder: JsonDecoder.Decoder<Callback<Type, Params>> = callbackDecoder(type, JsonDecoder.object({
  chatId: JsonDecoder.number,
  conversationMessageId: JsonDecoder.number
}, 'Params decoder'))

const remove: CommandObject<Type, Params, Result> = {
  command,
  decoder,
  type
}

export default remove