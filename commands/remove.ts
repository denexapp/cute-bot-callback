import { JsonDecoder } from 'ts.data.json'
import { Command, CommandObject } from "."
import callbackDecoder, { Callback } from '../utils/callbackDecoder'
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
  const { items: [item] } = await vk.messagesGetByConversationMessageId(chatId, conversationMessageId)
  if (item === undefined) {
    // item is already removed
    return null
  }
  const { id } = item
  const results = await vk.messagesDelete(id, true)
  console.log(id)
  console.log(JSON.stringify(results))
  console.log(results[id])
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