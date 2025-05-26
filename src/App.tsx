import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import MUISnackbar from "./components/snackbar/MUISnackbar";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <main className="container">
          <Guard>
            <RouterProvider router={router} />
          </Guard>
          <MUISnackbar />
        </main>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
