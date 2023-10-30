import React, { useState, useEffect } from 'react';
import Login from './Scenes/Login/loginform';
import Signup from './Scenes/signin/signinform';
import Homepage from './Scenes/Homepage/Homepage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  useEffect(() => {
    // Check local storage for authentication status
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Implement your authentication logic here
    // If successful, set isAuthenticated to true and store it in local storage
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleSignin = () => {
    // Callback function to navigate to the homepage after successful signup
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setShowSignin(false);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // Set isAuthenticated to false and update local storage
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
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
