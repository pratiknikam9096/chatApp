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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
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

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
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
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

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
