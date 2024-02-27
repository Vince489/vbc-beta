import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // Initialize the state with the retrieved data
    user: {},
  }),

  actions: {
    // Set the User data from the server
    async setUser(data) {
      this.user = data.user
    },


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
    
        const  data  = await response.json();
        console.log('It works!! data:', data);

        // Call setUser action to update user data
        this.setUser(data);
        console.log('User Obj:', data.user);
        

        return true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async logout() {
      // Remove authState from session in MongoDB database
      fetch('https://auth-production-9197.up.railway.app/api/v1/user/logout', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
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
        this.setUser(data);
        // Return user data
        return data.user;
      } catch (error) {
        // console.error('Error fetching user:', error.message);
        throw error;
      }
    },      
  },
});
