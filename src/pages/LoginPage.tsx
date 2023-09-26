import React, { useState } from "react";
import httpClient from "../httpClient";
import { Button, Typography, Grid,  TextField, Container} from "@mui/material";


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    console.log(username, password);

    try {
      const resp = await httpClient.post("//localhost:8000/login", {
        username,
        password,
      });

      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Log Into Your Account
          </Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              style={{ marginBottom: "2rem" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              style={{ marginBottom: "2rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => logInUser()}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
