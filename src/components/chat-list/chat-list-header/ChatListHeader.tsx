import { AddCircle } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";

interface ChatListHeaderprops {
  handleAddChat: () => void;
}

function ChatListHeader({ handleAddChat }: ChatListHeaderprops) {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={handleAddChat}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ChatListHeader;
