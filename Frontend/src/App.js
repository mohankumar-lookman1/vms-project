import React, { useState } from 'react';
<<<<<<< HEAD
=======
import Login from './Scenes/Login/loginform';
import Signup from './Scenes/signin/signinform';
import HomePage from './Scenes/Homepage/Homepage';
>>>>>>> 28153e93304a09767a9c7589d35f25cddf573f5b

import HomePage from './Scenes/Homepage'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    // Implement your authentication logic here
    // If successful, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    // Callback function to navigate to the homepage after successful signup
    setIsAuthenticated(true);
    setShowSignup(false);
  };

  return (
   
      <div>
<<<<<<< HEAD
          
            <div><HomePage/></div>
       
=======
          {isAuthenticated ? (
            <div><HomePage /> </div>
          ) : showSignup ? (
            <Signup onSignup={handleSignup} onSwitchToLogin={() => setShowSignup(false)} />
          ) : (
            <Login onLogin={handleLogin} onSwitchToSignup={() => setShowSignup(true)} />
          )}
>>>>>>> 28153e93304a09767a9c7589d35f25cddf573f5b
     </div>
  
  );
};

export default App;
