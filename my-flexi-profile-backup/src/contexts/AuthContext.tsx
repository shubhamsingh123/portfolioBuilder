

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { loginAPICall, registerAPICall, storeToken, saveLoggedInUser, getToken, getLoggedInUser, logout as authServiceLogout } from '../services/AuthService';
// import { API_ENDPOINTS } from '../constants/api';
// import axiosInstance from '../services/axiosConfig';

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = getToken();
//     const storedUser = getLoggedInUser();

//     console.log('AuthContext initialization:', {
//       hasToken: !!token,
//       hasStoredUser: !!storedUser,
//       tokenLength: token?.length
//     });

//     if (token && storedUser) {
//       setUser(storedUser);
//       setIsAuthenticated(true);
//       console.log('User authenticated from stored credentials');
//     } else {
//       setUser(null);
//       setIsAuthenticated(false);
//       console.log('No stored credentials found');
//     }

//     setIsLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     setIsLoading(true);
//     try {
//       const response = await loginAPICall(email, password);
//       console.log('Login response:', response.data);

//       if (!response.data.accessToken) {
//         throw new Error('No access token received from server');
//       }
      
//       // Save user info from response
//       const userInfo = {
//         email,
//         name: response.data.name || `${response.data.firstName} ${response.data.lastName}`.trim(),
//         id: response.data.id,
//         ...response.data
//       };
      
//       saveLoggedInUser(userInfo);
//       setUser(userInfo);
//       setIsAuthenticated(true);
      
//       setIsLoading(false);
//       return { user: userInfo, isAuthenticated: true };
//     } catch (error) {
//       console.error('Login error:', error);
//       setIsAuthenticated(false);
//       setUser(null);
//       setIsLoading(false);
//       throw error;
//     }
//   };

//   const register = async (email, name, password) => {
//     setIsLoading(true);
//     try {
//       const registerObj = { name, email, password };
//       const response = await registerAPICall(registerObj);
//       console.log('Registration response:', response.data);

//       if (!response.data.accessToken) {
//         throw new Error('No access token received from server');
//       }
      
//       // Store tokens first
//       storeToken(response.data.accessToken, response.data.refreshToken);
      
//       // Save user info from response
//       const userInfo = {
//         email,
//         name: response.data.name || `${response.data.firstName} ${response.data.lastName}`.trim(),
//         id: response.data.id,
//         ...response.data
//       };
      
//       saveLoggedInUser(userInfo);
//       setUser(userInfo);
//       setIsAuthenticated(true);

//       // Create initial profile
//       try {
//         const profileResponse = await axiosInstance.post(`${API_ENDPOINTS.PROFILES}`, {
//           userId: userInfo.id,
//           name: userInfo.name,
//           bio: '',
//           isPublic: false,
//           sections: [],
//           email: userInfo.email,
//           phone: ''
//         }, {
//           headers: {
//             'Authorization': `Bearer ${response.data.accessToken}`
//           }
//         });
//         console.log('Initial profile created:', profileResponse.data);
//       } catch (profileError) {
//         console.error('Failed to create initial profile:', profileError);
//       }
      
//       return { user: userInfo, isAuthenticated: true };
//     } catch (error) {
//       console.error('Registration error:', error);
//       setIsAuthenticated(false);
//       setUser(null);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     authServiceLogout();
    
//     // Reset state
//     setUser(null);
//     setIsAuthenticated(false);
//     setIsLoading(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginAPICall,
  registerAPICall,
  storeToken,
  saveLoggedInUser,
  getToken,
  getLoggedInUser,
  logout as authServiceLogout
} from '../services/AuthService';
import { API_ENDPOINTS } from '../constants/api';
import axiosInstance from '../services/axiosConfig';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    const storedUser = getLoggedInUser();

    console.log('AuthContext initialization:', {
      hasToken: !!token,
      hasStoredUser: !!storedUser,
      tokenLength: token?.length,
      storedUser
    });

    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      console.log('User authenticated from stored credentials');
    } else {
      setUser(null);
      setIsAuthenticated(false);
      console.log('No stored credentials found');
    }

    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await loginAPICall(email, password);
      console.log('Login response:', response.data);

      if (!response.data.accessToken) {
        throw new Error('No access token received from server');
      }

      storeToken(response.data.accessToken, response.data.refreshToken);

      const userInfo = {
        email,
        name: response.data.name || `${response.data.firstName} ${response.data.lastName}`.trim(),
        id: response.data.id,
        ...response.data
      };

      saveLoggedInUser(userInfo);
      setUser(userInfo);
      setIsAuthenticated(true);

      return { user: userInfo, isAuthenticated: true };
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, name, password) => {
    setIsLoading(true);
    try {
      const registerObj = { name, email, password };
      const response = await registerAPICall(registerObj);
      console.log('Registration response:', response.data);

      if (!response.data.accessToken) {
        throw new Error('No access token received from server');
      }

      storeToken(response.data.accessToken, response.data.refreshToken);

      const userInfo = {
        email,
        name: response.data.name || `${response.data.firstName} ${response.data.lastName}`.trim(),
        id: response.data.id,
        ...response.data
      };

      // Create initial profile
      try {
        const profileResponse = await axiosInstance.post(
          API_ENDPOINTS.PROFILES,
          {
            userId: userInfo.id,
            name: userInfo.name,
            bio: '',
            isPublic: false,
            sections: [],
            email: userInfo.email,
            phone: ''
          },
          {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`
            }
          }
        );

        const profileData = profileResponse.data;
        console.log('Initial profile created:', profileData);

        // Attach profile ID to user object
        userInfo.profileId = profileData.id;
      } catch (profileError) {
        console.error('Failed to create initial profile:', profileError);
      }

      saveLoggedInUser(userInfo);
      setUser(userInfo);
      setIsAuthenticated(true);

      return { user: userInfo, isAuthenticated: true };
    } catch (error) {
      console.error('Registration error:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authServiceLogout();
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
