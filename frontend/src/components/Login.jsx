import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>
        
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Get Guest User Credentials
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
