import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const history = useNavigate();

  const handleGoBack = () => {
    history("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          style={{ height: 300 }}
          src="https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b.gif"
          alt=""
        />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoBack}
          sx={{ mt: 3 }}
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
