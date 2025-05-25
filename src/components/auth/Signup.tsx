import { Link } from "react-router-dom";
import { useState } from "react";

import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/errors";

function Signup() {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");
  return (
    <Auth
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          setError("");
        } catch (err) {
          const errorMessage = extractErrorMessage(err);
          if (errorMessage) {
            setError(errorMessage);
          }
          setError("Unknown error occured!");
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
