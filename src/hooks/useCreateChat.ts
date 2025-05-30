import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chat.fragment";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

export const useCreateChat = () => {
  return useMutation(createChatDocument, {
    update(cahce, { data }) {
      cahce.modify({
        fields: {
          chats(existingChats = []) {
            const newChatRef = cahce.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
              fragmentName: "ChatFragment",
            });
            return [...existingChats, newChatRef];
          },
        },
      });
    },
  });
};
