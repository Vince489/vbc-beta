<template>
  <div class="pt-20">
    <h1>Welcome, {{ userName }}</h1>
    <p>Code Name: {{ codeName }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const userName = authStore.userName;
const codeName = authStore.codeName;

// Function to check if the user is authenticated
const checkAuthentication = async () => {
  try {
    // Check the session status
    const response = await fetch('https://gaming-token-production.up.railway.app/api/v1/user/check-session', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    // Check if response is successful (status 200)
    if (response.ok) {
      // Parse response JSON data
      const data = await response.json();
      console.log('Session check result:', data);
    } else {
      // If response is not successful, throw an error
      throw new Error('Failed to check session');
    }
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error checking session:', error);
    // Redirect to error page or perform other error handling
    await router.push('/error');
  }
};

// Call the checkAuthentication function when the component is mounted
onMounted(() => {
  checkAuthentication();
});
</script>
