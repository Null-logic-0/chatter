import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import classes from "./Header.module.css";

import Branding from "./Branding";
import Navigation from "./Navigation";
import Settings from "./Settings";

import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";

const pages: string[] = [];

function Header() {
  return (
    <AppBar position="static">
      <main className={classes.header}>
        <Toolbar disableGutters>
          <Branding />

          <MobileNavigation pages={pages} />
          <MobileBranding />
          <Navigation pages={pages} />
          <Settings />
        </Toolbar>
      </main>
    </AppBar>
  );
}
export default Header;
