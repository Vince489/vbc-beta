import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // Initialize the state with the retrieved data
    user: {},
  }),

  actions: {
    // Set the User data from the server
    setUser(data) {
      this.user = data.user;
    },

    // Login user
    // async login(username, password) {
    //   try {
    //     const response = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/login', {
    //       method: 'POST',
    //       mode: 'cors',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       credentials: 'include',
    //       body: JSON.stringify({ userName: username, password }),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error('Login failed');
    //     }

    //     // Fetch user data
    //     const fetchResponse = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/getUser', {
    //       method: 'GET',
    //       mode: 'cors',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       credentials: 'include',
    //     });

    //     // Call setUser action to update user data
    //     this.setUser(fetchResponse);
    //     // Parse response JSON
    //     const data = await fetchResponse.json();

    //     console.log('User Obj:', data.user);

    //     // Redirect to dashboard
    //     window.location.href = '/dashboard';
        
    //     return true;
    //   } catch (error) {
    //     console.error('Login failed:', error);
    //     throw error;
    //   }
    // },

    // Login user
async login(username, password) {
  try {
    const response = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userName: username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Fetch user data
    const fetchResponse = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/getUser', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!fetchResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    // Parse response JSON
    const data = await fetchResponse.json();

    // Call setUser action to update user data
    this.setUser(data.user);

    // Redirect to dashboard
    window.location.href = '/dashboard';

    return true;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
},


    // Logout user
    async logout() {
      try {
        // Remove authState from session in MongoDB database
        const response = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/logout', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          // Clear the JWT cookie on successful logout
          document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure'; // Set cookie expiration to a past date
          
          // Redirect to login page
          window.location.href = '/login';
          console.log('User logged out');
        } else {
          throw new Error('Logout failed');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    },
  },

  getters: {
    async getUser() {
      try {
        const response = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/getUser', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
    
        // Parse response JSON
        const data = await response.json();
        console.log('Data:', data);
        // Call setUser action to update user data
        this.setUser(data); // <-- Fix this line
        // Return user data
        return data.user;
      } catch (error) {
        // console.error('Error fetching user:', error.message);
        throw error;
      }
    },      
  },
});
