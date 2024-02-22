<template>
  <div class="pt-20">
    <h1>Dashboard</h1>
    <h1>Welcome, {{ user.userName }}</h1>
    <p>Code Name: {{ user.codeName }}</p>
    <p>User ID: {{ user._id }}</p>
    <p>User Balance: {{ zenniesToTokens(user.balance).toFixed(2) }} VRT</p>
    <button class="btn" @click="handleAirdrop">Get Airdrop</button>
  </div>
  <button class="btn" @click="handleLogout">Logout</button>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const user = authStore.user;

// Access the router instance
const router = useRouter();

// Method to convert zennies to tokens
const zenniesToTokens = (zennies) => {
  return zennies / 100; // Assuming 1 zenny = 0.01 tokens
};

// Define a function to handle logout
const handleLogout = async () => {
  try {
    await authStore.logout(); // Call the logout function from the store
    router.push('/login'); // Redirect to the login page after logout
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Define a function to handle airdrop
const handleAirdrop = async () => {
  try {
    const response = await fetch('https://gaming-token-production.up.railway.app/api/v1/user/airdrop', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Refresh the page to display the updated balance
      location.reload();
    } else {
      console.error('Airdrop failed:', response.statusText);
    }
    router.push('/dashboard');
  } catch (error) {
    console.error('Airdrop failed:', error);
  }
};

// Fetch user data when the component is mounted
onMounted(async () => {
  try {
    await authStore.getUser();
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
});
</script>
