
export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();

  // Fetch user data only if user is logged in
  if (authStore.user.isLoggedIn) {
    try {
      await authStore.getUser();
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
});
