import { Link } from "react-router-dom";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";

function Signup() {
  const [createUser] = useCreateUser();
  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center", color: "white" }}>
        Login to existing account
      </Link>
    </Auth>
  );
}

export default Signup;
