const BASE_URL = 'http://192.168.1.52:3000/auth'; // Replace with your API base URL

export const signupUser = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return {
        username: responseData.username,
        message: responseData.message,
      };
    } else {
      throw new Error('Failed to create an account');
    }
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('An error occurred during signup');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return {
        username: responseData.username,
        message: responseData.message,
      };
    } else {
      throw new Error('Failed to login');
    }
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('An error occurred during login');
  }
};