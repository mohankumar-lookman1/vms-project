import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Link,
} from '@mui/material';
import "./styles.css";

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      // Replace with your API endpoint for signup
      const response = await fetch('http://192.168.1.52:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username,email,password}),
      });

      if (response.ok) {
        onSignup(); 
      } else {
        setError('Failed to create an account');
      }
    } catch (error) {
      console.error('API request error:', error);
      setError('An error occurred during signup');
    }
  };

  return (
    <div className='container'>
    <Card className='card' sx={{ backgroundColor: "#1c1919", color: "white" }}>
      <CardContent>
        <Typography variant="h4">Sign In</Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          InputLabelProps={{
            style: { color: 'white'}
          }}
          InputProps={{
            style: { color: 'white' }, 
          }}
          onChange={(e) => setUsername(e.target.value)}
          sx={{marginTop:"20px" }}
        />
        <TextField
          label="Email"
          type="mail"
          variant="outlined"
          fullWidth
          value={email}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' }, 
          }}
          onChange={(e) => setMail(e.target.value)}
          sx={{marginTop:"20px" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' }, 
          }}
          onChange={(e) => setPassword(e.target.value)}
          sx={{marginTop:"20px" }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          sx={{ height: "8vh", width: "15vw",  marginTop: "20px" }}
      
        >
          Sign In
        </Button>
        <Typography variant="body2" sx={{marginTop:"20px"}}>
          Already have an account?{' '}
          <Link component="button" onClick={onSwitchToLogin}>
            Login
          </Link>
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
};

export default Signup;
