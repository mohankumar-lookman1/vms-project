import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Link,

} from '@mui/material';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Replace with your API endpoint for login
      const response = await fetch('http://192.168.1.52:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        onLogin(); // Call the callback to set isAuthenticated to true
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('API request error:', error);
      setError('An error occurred during login');
    }
  };

  return (
      <div className='container'>
        <Card className='card' sx={{ backgroundColor: "#1c1919", color: "white" }}>
          <CardContent>
            <Typography variant="h4">Login</Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth  
              value={email}
              onChange={(e) => setMail(e.target.value)}
              InputLabelProps={{
                style: { color: 'white' }
              }}
              InputProps={{
                style: { color: 'white' }, 
              }}
              sx={{marginTop:"20px",color:"white"}}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: 'white' }
              }}
              InputProps={{
                style: { color: 'white' }, 
              }}
              sx={{marginTop:"20px" }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              className='button'
              variant='contained'
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ height: "5vh", width: "10vw", marginLeft: "100px", marginTop: "20px" }}
            >
              Login
            </Button>
            <Typography variant="body2"  sx={{marginTop:"20px"}}>
              Don't have an account?{' '}
              <Link component="button" onClick={onSwitchToSignup}>
                Sign In
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
    
  };  

export default Login;