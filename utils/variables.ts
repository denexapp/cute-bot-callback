import { JsonDecoder } from 'ts.data.json'
import decode from './decode'

interface Variables {
  secret: string
  accessToken: string
}

const variablesDecoder = JsonDecoder.object<Variables>({
  secret: JsonDecoder.string,
  accessToken: JsonDecoder.string
}, 'Variables Decoder')

const values = process.env

const variables = decode(values, variablesDecoder)

export default variables