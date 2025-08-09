<template>
  <router-link :to="link_to" class="inline-block relative group">
    <div class="text-third text-sm hover:text-[#0066ff] font-semibold">
      {{ link_text }}
    </div>
    <!-- Animated line -->
    <div
      class="absolute bottom-0 left-0 w-0 h-[1px] bg-theme-blue transition-all duration-300 ease-out group-hover:w-full"
    ></div>
  </router-link>
</template>

<script>
export default {
  name: "Link",
  props: { link_to: String, link_text: String },
};
</script>
