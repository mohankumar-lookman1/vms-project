import React, { useState } from 'react';
import Login from './Scenes/Login/loginform';
import Signup from './Scenes/signin/signinform';
import Homepage from './Scenes/Homepage/Homepage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const handleLogin = () => {
    // Implement your authentication logic here
    // If successful, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const handleSignin = () => {
    // Callback function to navigate to the homepage after successful signup
    setIsAuthenticated(true);
    setShowSignin(false);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // Set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Homepage onLogout={handleLogout} />
      ) : showSignin ? (
        <Signup onSignup={handleSignin} onSwitchToLogin={() => setShowSignin(false)} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToSignin={() => setShowSignin(true)} />
      )}
    </div>
  );
};

export default App;
