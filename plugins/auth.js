export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();

  // Always fetch user data when the application loads
  try {
    await authStore.getUser;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}); 
