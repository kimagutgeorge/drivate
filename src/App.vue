<template>
  <div class="w-full bg-white">
    <Navbar />
    <router-view />
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Navbar from "./components/general/Navbar.vue";
import Footer from "./components/general/Footer.vue";
export default {
  name: "App",
  components: { Navbar, Footer },
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
