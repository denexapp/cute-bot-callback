import { JsonDecoder } from 'ts.data.json'

export interface Callback<Type extends string, Secret extends string, Response> {
  type: Type
  secret: Secret
  object: Response
}

const callbackDecoder = <Type extends string, Secret extends string, Response>(
  type: Type,
  secret: Secret,
  decoder: JsonDecoder.Decoder<Response>
) => JsonDecoder.object<Callback<Type, Secret, Response>>({
  type: JsonDecoder.isExactly(type),
  secret: JsonDecoder.isExactly(secret),
  object: decoder
}, 'Callback')

export default callbackDecoder