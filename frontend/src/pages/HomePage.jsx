import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, Container } from "@mui/material";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          p: 3,
          bgcolor: "white",
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" fontFamily="Work sans">
          Talk-A-Tive
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "white",
          mt: 3,
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {value === 0 && <Login />}
        {value === 1 && <Signup />}
      </Box>
    </Container>
  );
}

export default HomePage;
