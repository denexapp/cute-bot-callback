import { JsonDecoder } from 'ts.data.json'
import commands from '../commands'
import callbackDecoder from './callbackDecoder'
import decode from './decode'
import variables from './variables'

const decodeCallback = (data: unknown) => {
  const decoders = Object
    .values(commands)
    .map(command => callbackDecoder(command.type, variables.secret, command.decoder))

  return decode(data, decoders[0])
}

export default decodeCallback