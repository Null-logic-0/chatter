import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { onLogout } from "../../utils/logout";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import router from "../Routes";
import { useGetMe } from "../../hooks/useGetMe";

function Settings() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout } = useLogout();
  const { data: user } = useGetMe();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.me.username} src={user?.me?.imageUrl} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          key="profile"
          onClick={async () => {
            await router.navigate("/profile");
            handleCloseUserMenu();
          }}
        >
          <Typography sx={{ textAlign: "center" }}>Profile</Typography>
        </MenuItem>
        <MenuItem
          key="logout"
          onClick={async () => {
            try {
              await logout();
              onLogout();
              handleCloseUserMenu();
            } catch (error) {
              snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
              console.error(error);
            }
          }}
        >
          <Typography sx={{ textAlign: "center" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Settings;
