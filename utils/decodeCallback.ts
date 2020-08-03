import { JsonDecoder } from 'ts.data.json'
import decode from './decode'
import commands from '../commands'
import callbackDecoder from './callbackDecoder'
import variables from './variables'

const decodeCallback = (data: unknown) => {
  const decoders = Object
    .values(commands)
    .map(command => callbackDecoder(command.type, variables.secret, command.decoder))

  return decode(data, JsonDecoder.oneOf(decoders, 'Callback'))
}

export default decodeCallback