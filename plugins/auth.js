// plugins/auth-plugin.js

import { defineNuxtPlugin } from '@nuxtjs/composition-api';
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();

  // Always fetch user data when the application loads if the user is logged in
  if (authStore.user) {
    try {
      await authStore.getUser();
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
});
