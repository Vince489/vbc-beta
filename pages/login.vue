<template>
  <div class="flex justify-center items-center mt-32">
    <div class="w-full max-w-sm">
      <div>
        <h1 class="pb-6 text-4xl">Login</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="userName">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userName" type="text" placeholder="Username" v-model="userName">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
          <p class="hidden text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex justify-center">
          <button class="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

let userName = '';
let password = '';

const handleSubmit = async () => {
  try {
    console.log('Logging in...');
    // Call the login method in the auth store
    await authStore.login(userName, password);

    // Redirect to the dashboard upon successful login
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
    // Handle login error (e.g., display error message)
  }
}
</script>
