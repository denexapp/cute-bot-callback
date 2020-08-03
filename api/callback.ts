import { NowRequest, NowResponse } from '@now/node'
import decodeCallback from '../utils/decodeCallback'
import commands from '../commands'
import { serverName } from '../utils/consts'

export default async (req: NowRequest, res: NowResponse) => {
  const data = decodeCallback(req.body)
  const response = await commands[data.type].command(data.object)
  res.json({
    response,
    serverName
  })
}