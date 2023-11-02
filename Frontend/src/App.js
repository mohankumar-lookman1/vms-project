import React, { useState } from 'react';
import Login from './Scenes/Login/loginform';
import Signup from './Scenes/signin/signinform';
import HomePage from './Scenes/Homepage/Homepage';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [response, setResponse] = useState({ username: '', message: '' });
  const handleLogin = (responseData) => {
    setIsAuthenticated(true);
    setResponse({
      username: responseData.username,
      message: responseData.message
    });
  };

  const handleSignup = (responseData) => {
    setIsAuthenticated(true);
    setShowSignup(false);
    setResponse({
      username: responseData.username,
      message: responseData.message
    });
  };

  return (
   
      <div>
          {isAuthenticated ? (
            <div><HomePage response={response} /></div>
          ) : showSignup ? (
            <Signup onSignup={handleSignup} onSwitchToLogin={() => setShowSignup(false)} />
          ) : (
            <Login onLogin={handleLogin} onSwitchToSignup={() => setShowSignup(true)} />
          )}
     </div>
  
  );
};

export default App;
