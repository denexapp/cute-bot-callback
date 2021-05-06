import { JsonDecoder } from "ts.data.json";
import { VkError, VkErrorCode } from "vk-ts";
import { Command, CommandObject } from ".";
import callbackDecoder, { Callback } from "../utils/callbackDecoder";
import vk from "../utils/vk";

type Type = "kick";

type Params = {
  chatId: number;
  userId: number;
};

enum Status {
  Kicked = 0,
  UserIsAnAdmin = 1,
  NoUserInChat = 2,
}

type Result = {
  status: Status;
};

const type: Type = "kick";

const command: Command<Params, Result> = async (params) => {
  const { chatId, userId } = params;
  try {
    await vk.messagesRemoveChatUser(chatId, userId);
  } catch (error) {
    if (!(error instanceof VkError)) throw error;
    if (error.code === VkErrorCode.NoAccess) {
      return {
        status: Status.UserIsAnAdmin,
      };
    }
    if (error.code === VkErrorCode.NoUserInChat) {
      return {
        status: Status.NoUserInChat,
      };
    }
    throw error;
  }
  return {
    status: Status.Kicked,
  };
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
