<template>
  <button class="flex flex-nowrap w-full mt-2">
    <div class="h-full py-1 px-2 bg-[#E6B800] text-white">
      <i class="fa-solid fa-phone"></i>
    </div>
    <div class="w-full h-full p-1">
      <span>
        {{ button_text }}
      </span>
    </div>
  </button>
</template>
<script>
export default {
  name: "IconButton",
  props: {
    button_text: String,
    class: String,
  },
};
</script>
