import { JsonDecoder } from "ts.data.json";
import { Command, CommandObject } from ".";
import callbackDecoder, { Callback } from "../utils/callbackDecoder";
import vk from "../utils/vk";

type Type = "kick";

type Params = {
  chatId: number;
  userId: number;
};

type Result = null;

const type: Type = "kick";

const command: Command<Params, Result> = async (params) => {
  const { chatId, userId } = params;
  await vk.messagesRemoveChatUser(chatId, userId);
  return null;
};

const decoder: JsonDecoder.Decoder<Callback<Type, Params>> = callbackDecoder(
  type,
  JsonDecoder.object(
    {
      chatId: JsonDecoder.number,
      userId: JsonDecoder.number,
    },
    "Params decoder"
  )
);

const kick: CommandObject<Type, Params, Result> = {
  command,
  decoder,
  type,
};

export default kick;
