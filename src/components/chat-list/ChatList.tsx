import List from "@mui/material/List";
import ChatListItem from "./ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";

function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();
  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);
  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats &&
            [...data.chats]
              .sort((a, b) => {
                if (!a.latestMessage) {
                  return -1;
                }
                return (
                  new Date(a.latestMessage?.createdAt).getTime() -
                  new Date(b.latestMessage?.createdAt).getTime()
                );
              })
              .map((chat) => (
                <ChatListItem
                  chat={chat}
                  key={chat._id}
                  selected={chat._id === selectedChatId}
                />
              ))
              .reverse()}
        </List>
      </Stack>
    </>
  );
}

export default ChatList;
