import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { Box, Grid } from "@mui/system";

function Chat() {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const [createMessage] = useCreateMessage();
  const { data } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({ chatId });

  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    scrollBottom();
  }, [location.pathname, message]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: { content: message, chatId },
      },
    });
    setMessage("");
    scrollBottom();
  };
  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat?.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {messages &&
          [...messages.messages]
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((message) => (
              <Grid
                container
                alignItems="start"
                marginBottom="1rem"
                key={message._id}
              >
                <Stack spacing={1} alignItems="center" justifyContent="center">
                  <Avatar
                    alt={message?.user.username}
                    src={message?.user?.imageUrl}
                    sx={{ width: 52, height: 52 }}
                  />
                  <Typography variant="caption">
                    {message.user.username}
                  </Typography>
                </Stack>
                <Grid size={6} marginLeft={2}>
                  <Stack spacing={1}>
                    <Paper sx={{ width: "fit-content", padding: "10px" }}>
                      <Typography sx={{ padding: "0,9rem" }}>
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "0.25rem" }}
                    >
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
          value={message}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}

export default Chat;
