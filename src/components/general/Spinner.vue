<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <div class="relative w-24 h-24">
      <!-- Spinning Ring -->
      <div
        class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
      ></div>

      <!-- Logo in the center -->
      <img
        :src="logo"
        alt="Company Logo"
        class="w-16 h-16 object-contain absolute inset-0 m-auto"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  data() {
    return {
      logo: "/logo.png",
    };
  },
};
</script>
