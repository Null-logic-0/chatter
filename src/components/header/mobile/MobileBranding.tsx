import { Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import router from "../../Routes";

function MobileBranding() {
  return (
    <>
      <SmartToyIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          cursor: "pointer",
          fontFamily: "monospace",
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

export default MobileBranding;
