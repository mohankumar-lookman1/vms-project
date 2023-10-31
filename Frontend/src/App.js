import React, { useState } from 'react';

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
          
            <div><HomePage/></div>
       
     </div>
  
  );
};

export default App;
