import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(data) {
      this.user = data;
    },
    clearUser() {
      this.user = null;
    },
    logout() {
      // Clear all state
      this.$reset();
      // If you're using pinia-plugin-persistedstate, it should handle localStorage automatically
      // But you can manually remove it if needed
      localStorage.removeItem("user");
    },
  },
  persist: true,
});
