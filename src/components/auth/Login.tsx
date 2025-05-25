import { Link } from "react-router-dom";

import Auth from "./Auth";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Login"
      onSubmit={async (request) => {
        login(request);
      }}
      error={error}
    >
      <Link to={"/signup"} style={{ alignSelf: "center", color: "white" }}>
        Register new account
      </Link>
    </Auth>
  );
}

export default Login;
