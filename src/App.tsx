import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline, Grid } from "@mui/material";

import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { usePath } from "./hooks/usePath";

import router from "./components/Routes";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import MUISnackbar from "./components/snackbar/MUISnackbar";
import ChatList from "./components/chat-list/ChatList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { path } = usePath();

  const showChatList = path === "/" || path.includes("chats");
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {showChatList ? (
            <Grid container>
              <Grid size={{ md: 2.2 }}>
                <ChatList />
              </Grid>
              <Grid size={{ md: 9 }}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
        <MUISnackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return (
    <Container sx={{ height: "90vh" }}>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
