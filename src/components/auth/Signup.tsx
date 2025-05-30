import { Link } from "react-router-dom";
import { useState } from "react";

import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";
import { TextField } from "@mui/material";

function Signup() {
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();
  return (
    <Auth
      extraFields={[
        <TextField
          type="text"
          label="Username"
          value={username}
          variant="outlined"
          onChange={(event) => setUsername(event.target.value)}
          error={!!error}
          helperText={error}
          required
        />,
      ]}
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });
          await login({ email, password });
          setError("");
        } catch (err) {
          const errorMessage = extractErrorMessage(err);
          if (errorMessage) {
            setError(errorMessage);
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center", color: "white" }}>
        Login to existing account
      </Link>
    </Auth>
  );
}

export default Signup;
