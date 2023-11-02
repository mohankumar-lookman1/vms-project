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
import { signupUser } from '../../Component/Global/api'; // Import the API function

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const responseData = await signupUser(username, email, password);
      onSignup(responseData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='container'>
      <Card className='card' sx={{ backgroundColor: "#1c1919", color: "white" }}>
        <CardContent>
          <Typography variant="h4">Sign In</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              InputLabelProps={{
                style: { color: 'white' }
              }}
              InputProps={{
                style: { color: 'white' },
              }}
              onChange={(e) => setUsername(e.target.value)}
              sx={{marginTop:"20px" }}
            />
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
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "6vh", width: "12vw",  marginTop: "20px" }}
            >
              Sign In
            </Button>
          </form>
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
