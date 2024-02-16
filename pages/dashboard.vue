<template>
  <div class="pt-20">
    <h1>Welcome, {{ userName }}</h1>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';

const authStore = useAuthStore();

const userName = authStore.userName;
</script>

<style scoped>
/* Add scoped styles as needed */
</style>
