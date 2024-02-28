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

const authStore = useAuthStore();

const userName = authStore.userName;
const codeName = authStore.codeName;

// Function to get the user's data using the getUser method from the auth store and console.log the user's data
const getUser = async () => {
  try {
    await authStore.getUser();
    console.log('User:', authStore.user);
  } catch (error) {
    console.error('Failed to get user:', error);
  }
};

// Call the getUser function when the component is mounted
onMounted(() => {
  getUser();
});
</script>
