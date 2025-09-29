<template>
  <Navbar />
  <div class="w-full h-full">
    <div class="w-full mt-8 flex justify-center">
      <img src="/static/not-found.png" class="w-[150px]" />
    </div>
    <h1 class="text-5xl font-bold w-full text-center mt-6">Oops!</h1>
    <h2 class="text-3xl font-semibold w-full text-center mt-2 theme-blue">
      Looks like you are in the wrong place
    </h2>
    <p class="mt-4 text-center">
      We cannot find the page you are looking for...
      <span class="font-semibold"
        ><router-link to="/"
          ><i class="fa-solid fa-arrow-right"></i> Take me home
        </router-link></span
      >
    </p>
  </div>
  <Footer />
</template>
<script>
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
export default {
  name: "Not Found",
  components: { Footer, Navbar },
};
</script>
