
import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link as MuiLink, Paper, Box, Typography, Container } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Link as RouterLink } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    // Add logic to send reset link
  };

  return (
    <Box sx={{ bgcolor: 'grey.100', height: '100vh' }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper 
          elevation={3}
          sx={{
            marginTop: 8,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <LockResetIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Enter your email address and we will send you a link to reset your password.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Send Reset Link
            </Button>
            <Box textAlign='center'>
              <MuiLink component={RouterLink} to="/login" variant="body2">
                {"Back to Sign In"}
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
