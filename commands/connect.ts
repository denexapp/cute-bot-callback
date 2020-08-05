import { JsonDecoder } from 'ts.data.json'
import { Command, CommandObject } from "."
import callbackDecoder, { Callback } from '../utils/callbackDecoder'
import { connectCommand } from '../utils/consts'
import vk from '../utils/vk'

type Type = 'connect'

type Params = {
  date: number
}

type Result = {
  peerId: number
}

const type: Type = 'connect'

const command: Command<Params, Result> = async params => {
  const { id: userId } = await vk.accountGetProfileInfo()
  const results = await vk.messagesSearch(connectCommand)

  for (const message of results.items) {
    const datesMatch = message.date === params.date
    const userIdsMatch = message.from_id === userId
    const messageIsTheCommand = message.text.startsWith(connectCommand)

    if (datesMatch && userIdsMatch && messageIsTheCommand) {
      return { peerId: message.peer_id }
    }
  }

  throw new Error('Can\'t find the message')
}

const decoder: JsonDecoder.Decoder<Callback<Type, Params>> = callbackDecoder(type, JsonDecoder.object({
  date: JsonDecoder.number
}, 'Params decoder'))

const connect: CommandObject<Type, Params, Result> = {
  command,
  decoder,
  type
}

export default connect