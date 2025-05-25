import { Link } from "react-router-dom";

import Auth from "./Auth";

function Login() {
  return (
    <Auth submitLabel="Login" onSubmit={async () => {}}>
      <Link to={"/signup"} style={{ alignSelf: "center", color: "white" }}>
        Register new account
      </Link>
    </Auth>
  );
}

export default Login;
