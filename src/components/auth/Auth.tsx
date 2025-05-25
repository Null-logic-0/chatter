import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  submitLabel: string;
  onSubmit: (creadentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
}

function Auth({ onSubmit, submitLabel, children, error }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "30%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        onChange={(event) => setEmail(event.target.value)}
        error={!!error}
        helperText={error}
        required
      />
      <TextField
        required
        type="password"
        label="Password"
        variant="outlined"
        onChange={(event) => setPassword(event.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
}

export default Auth;
