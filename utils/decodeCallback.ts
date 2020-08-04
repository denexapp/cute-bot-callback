import { JsonDecoder } from 'ts.data.json'
import commands from '../commands'
import decode from './decode'

const decodeCallback = (data: unknown) => {
  const decoders = Object
    .values(commands)
    .map(command => command.decoder)

  type TypesBugWorkaround = Parameters<Parameters<typeof decoders[number]['onDecode']>[1]>[0]

  return decode(data, JsonDecoder.oneOf<TypesBugWorkaround>(decoders, 'Callback'))
}

export default decodeCallback