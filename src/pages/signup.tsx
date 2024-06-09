import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
      return toast.warn("Enter all fields");
    }

    if (password.length < 8) {
      return toast.warn("Password should be at least 8 characters");
    }

    if (!username.includes("@")) {
      return toast.warn("Please enter a valid email address");
    }

    try {
      const response = await axios.post(
        "https://localhost:7009/api/user/register",
        {
          username: username,
          password: password,
          role: "user",
        }
      );
      console.log("Signup successful:", response.data);
      if (response.data) {
        toast.success("Registration successful");
        navigate("/login");
      }

      // Handle successful signup
    } catch (error: unknown) {
      console.error(error);
      if (error?.response?.data === "Username is already taken.") {
        return toast.error("User already exists");
      } else {
        return toast.error("Check connectivity");
      }
      // Handle signup failure
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/image.png"
            alt=""
            style={{ width: 200, borderRadius: 30 }}
          />
          <div style={{ height: 30 }} />
          <Typography variant="h4">Welcome to imparta</Typography>
          <div style={{ height: 30 }} />
          <Typography>Please signup to continue</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
