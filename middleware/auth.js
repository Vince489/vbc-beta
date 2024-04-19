import { useAuthStore } from "~/stores/authStore.js";

export default defineNuxtRouteMiddleware((to, _from) => {
    const authStore = useAuthStore();

    // Check if the user is already authenticated
    if (authStore.isAuthenticated) {
        // User is authenticated, allow navigation
        return;
    }

    // Check if the user is trying to access the login page
    if (to.path === '/login') {
        // User is already on the login page, allow navigation
        return;
    }

    // User is not authenticated and not on the login page,
    // redirect them to the login page
    return navigateTo(to, '/login');
});