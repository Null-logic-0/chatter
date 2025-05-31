import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useGetMe } from "../../hooks/useGetMe";
import { UploadFile } from "@mui/icons-material";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";

function Profile() {
  const { data: user } = useGetMe();
  console.log(user?.me.imageUrl);

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Image upload failed.");
      }
      snackVar({
        message: "Image uploaded!",
        type: "success",
      });
    } catch (error) {
      snackVar({ message: "Error uploading file.", type: "error" });
      console.error(error);
    }
  };
  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3">{user?.me.username}</Typography>
      <Avatar sx={{ width: 256, height: 256 }} src={user?.me.imageUrl} />
      <Button
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
        component="label"
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
}

export default Profile;
