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
          <Container sx={{ height: "90vh", marginTop: "1rem" }} maxWidth="xl">
            {showChatList ? (
              <Grid container spacing={2}>
                <Grid size={{ md: 5, xs: 12, lg: 4, xl: 3 }}>
                  <ChatList />
                </Grid>
                <Grid size={{ md: 7, xs: 12, xl: 9, lg: 8 }}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>

        <MUISnackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default App;
