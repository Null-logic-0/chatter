import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import Grid from "@mui/material/Grid";

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
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {path === "/" ? (
            <Grid container>
              <Grid>
                <ChatList />
              </Grid>
              <Grid>
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
    <main className="container">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
