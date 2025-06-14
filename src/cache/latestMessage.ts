import { ApolloCache } from "@apollo/client";
import { getChatsDocument } from "../hooks/useGetChats";
import { Message } from "../gql/graphql";

export const updateLatestMessage = (
  cache: ApolloCache<any>,
  message: Message
) => {
  const chats = [
    ...(cache.readQuery({ query: getChatsDocument })?.chats || []),
  ];
  const cachedChatIndex = chats.findIndex(
    (chat) => chat._id === message.chatId
  );
  if (cachedChatIndex === -1) {
    return;
  }
  const cachedChat = chats[cachedChatIndex];
  const cachedChatCopy = { ...cachedChat };
  cachedChatCopy.latestMessage = message;
  chats[cachedChatIndex] = cachedChatCopy;
  cache.writeQuery({
    query: getChatsDocument,
    data: {
      chats,
    },
  });
};
