<template>
  <div class="flex h-screen bg-gray-200">
    <!-- Sidebar -->
    <div :class="{ 'sidebar': true, 'closed': sidebarClosed }" class="bg-gray-700 text-white">
      <!-- Sidebar content -->
      <div class="p-4">
        <h1 class="text-lg font-semibold">Logo</h1>
        <ul class="mt-4">
          <li v-for="(item, index) in sidebarItems" :key="index">
            <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:text-white">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Your icon -->
              </svg>
              <span>{{ item }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarClosed: false,
      sidebarItems: ['Dashboard', 'Profile', 'Settings'] // Add more sidebar items as needed
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarClosed = !this.sidebarClosed;
    }
  }
}
</script>

<style scoped>
/* Additional custom styling */
.sidebar {
  width: 300px; /* Initial width of the sidebar */
  transition: width 0.3s ease;
}

.sidebar.closed {
  width: 60px; /* Width when collapsed */
}
</style>
