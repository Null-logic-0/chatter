import { Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import router from "../Routes";

function Branding() {
  return (
    <>
      <SmartToyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          cursor: "pointer",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Chatter
      </Typography>
    </>
  );
}

export default Branding;
