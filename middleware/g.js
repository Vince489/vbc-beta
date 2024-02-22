export default defineNuxtRouteMiddleware(async ({ req }) => {
  try {
    const response = await fetch('https://gaming-token-production.up.railway.app/api/v1/user/initAuthState', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch initial authentication state');
    }

    const { userId, userName, codeName, isLoggedIn } = await response.json();

    // Update the store with the retrieved data
    authStore.commit('auth/setAuthState', { userId, userName, isLoggedIn, codeName });
  } catch (error) {
    console.error('Failed to fetch initial authentication state:', error);
    // You can handle errors here, such as redirecting to an error page
  }
});
