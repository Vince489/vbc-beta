<template>
  <div>
    <!-- navbar goes here -->
    <nav id="navbar" class="pt-2 z-40 bg-gray-700 fixed inset-x-0">
      <div class="px-6 pb-2 mx-auto">
        <div class="flex justify-between items-center">
          <!-- Logo and toggle button -->
          <div class="flex items-center">
            <nuxt-link to="/" class="flex items-center py-3 px-3 text-gray-100">
              <span class="text-3xl font-bold">VBC</span>
            </nuxt-link>

            <!-- Mobile menu button -->
            <button @click="toggleMenu" class="md:hidden ml-auto text-gray-100 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </button>
          </div>

          <!-- Primary nav for desktop -->
          <div class="hidden md:flex items-center space-x-3">
            <nuxt-link to="/fighters" class="font-semibold py-3 px-3 text-gray-300">Fighters</nuxt-link>
            <nuxt-link to="/ebca" class="font-semibold py-3 px-3 text-gray-300">EBCA</nuxt-link>
            <nuxt-link to="/about" class="font-semibold py-3 px-3 text-gray-300">About</nuxt-link>
            <nuxt-link to="#/contact" class="font-semibold py-3 px-3 text-gray-300">Contact</nuxt-link>
          </div>

          <!-- Mobile menu -->
          <div v-if="toggle_menu" id="mobile-menu" class="md:hidden absolute top-16 left-0 w-full bg-gray-700">
            <nuxt-link to="/fighters" class="block py-3 px-4 text-gray-100">Fighters</nuxt-link>
            <nuxt-link to="/ebca" class="block py-3 px-4 text-gray-100">EBCA</nuxt-link>
            <nuxt-link to="/about" class="block py-3 px-4 text-gray-100">About</nuxt-link>
            <nuxt-link to="#/contact" class="block py-3 px-4 text-gray-100">Contact</nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let toggle_menu = ref(false);

function toggleMenu() {
  toggle_menu.value = !toggle_menu.value;
}

// Close mobile menu when clicking outside
onMounted(() => {
  window.addEventListener("click", function (e) {
    if (
      document.getElementById("mobile-menu") &&
      !document.getElementById("navbar").contains(e.target)
    ) {
      toggle_menu.value = false;
    }
  });
});
</script>

<style scoped>
#mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  #mobile-menu {
    display: block;
  }
}
</style>
