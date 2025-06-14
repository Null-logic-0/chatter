import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Branding from "./Branding";
import Navigation from "./Navigation";
import Settings from "./Settings";

import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";
import { Page } from "../../interfaces/page.interface";
import { Container } from "@mui/system";

const pages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const unauthenticatePages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
];

function Header() {
  const authenticated = useReactiveVar(authenticatedVar);

  const pagesPaths = authenticated ? pages : unauthenticatePages;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />

          <MobileNavigation pages={pagesPaths} />
          <MobileBranding />
          <Navigation pages={pagesPaths} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
