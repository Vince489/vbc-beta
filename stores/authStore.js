import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userID: null,
    userName: null,
    sessionId: null,
    isLoggedIn: false, // Initialize as false
  }),
  actions: {
    async fetchAuthState() {
      try {
        const response = await fetch('http://localhost:5550/api/v1/auth/getAuthState');
        if (!response.ok) {
          throw new Error('Failed to fetch auth state');
        }
        const authState = await response.json();
        this.userId = authState.userId;
        this.userName = authState.userName;
        this.isLoggedIn = authState.isLoggedIn;
      } catch (error) {
        console.error('Error fetching auth state:', error);
      }
    },
    async login(username, password) {
      try {
        const response = await fetch('http://localhost:5550/api/v1/user/login', {
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

        const { userId, userName } = await response.json();

        this.userId = userId;
        this.userName = userName;
        this.isLoggedIn = true;

        // Store authState from session in MongoDB database
        await fetch('http://localhost:5550/api/v1/auth/saveAuthState', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ userId, userName, isLoggedIn: true }),
        });
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
    logout() {
      this.userId = null;
      this.userName = null;
      this.isLoggedIn = false;

      // Remove authState from session in MongoDB database
      fetch('http://localhost:5550/api/v1/user/logout', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    },    
  },
  getters: {
    getUserName() {
      return this.userName;
    },
    getUserId() {
      return this.userId;
    },
    getIsLoggedIn() {
      return this.isLoggedIn;
    },
  },
  // Load user data from localStorage when the store is mounted
  onMounted() {
    this.fetchAuthState();
  },
});
