import { NowRequest, NowResponse } from "@now/node";
import decodeCallback from "../utils/decodeCallback";
import commands from "../commands";
import { serverName } from "../utils/consts";

export default async (req: NowRequest, res: NowResponse) => {
  const data = decodeCallback(req.body);
  let response;

  if (data.type === "add") {
    response = await commands[data.type].command(data.object);
  }

  if (data.type === "connect") {
    response = await commands[data.type].command(data.object);
  }

  if (data.type === "remove") {
    response = await commands[data.type].command(data.object);
  }

  if (data.type === "kick") {
    response = await commands[data.type].command(data.object);
  }

  res.json({
    response,
    serverName,
  });
};
