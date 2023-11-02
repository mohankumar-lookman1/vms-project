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
import { loginUser } from '../../Component/Reusable/api'; // Import the API function

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const responseData = await loginUser(email, password);
      onLogin(responseData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='container'>
      <Card className='card' sx={{ backgroundColor: "#1c1919", color: "white" }}>
        <CardContent>
          <Typography variant="h4">Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              InputLabelProps={{
                style: { color: 'white' }
              }}
              InputProps={{
                style: { color: 'white' },
              }}
              onChange={(e) => setEmail(e.target.value)}
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
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "6vh", width: "12vw",  marginTop: "20px" }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{marginTop:"20px"}}>
            Don't have an account?{' '}
            <Link component="button" onClick={onSwitchToSignup}>
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
