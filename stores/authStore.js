import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userID: null,
    userName: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await fetch('http://localhost:5550/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName: username, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const { userId, userName } = await response.json();

        this.userID = userId;
        this.userName = userName;

        // Optionally, you can store the token in localStorage or cookies for persistence

        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
    // Other actions...
  },
});
