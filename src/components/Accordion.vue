<template>
  <div :class="accordion_class" class="pb-16 half-to-full">
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      class="accordion-item w-full flex justify-center flex-wrap p-2 pt-4 pb-4 border border-[#bebebe] transition-all duration-400 ease-in-out mt-4"
    >
      <div
        @click="show_accordion(index)"
        class="accordion-header w-full flex flex-nowrap gap-2 cursor-pointer"
      >
        <div class="w-[10]">
          <span class="bg-[#E6B800] text-xl p-1 px-2 font-bold">Q</span>
        </div>
        <div
          class="w-[85%] font-semibold transition-all duration-300 ease-in-out"
          :class="faq.accordion_is_hidden ? 'theme-blue' : ''"
        >
          {{ faq.faq_question }}
        </div>
        <div class="w-[15%] flex justify-center">
          <div class="h-full flex-col justify-center">
            <i
              class="fa-solid transition-3 fa-angle-up transition-all duration-300 ease-in-out"
              :class="faq.accordion_is_hidden ? 'rotate-180' : ''"
            ></i>
          </div>
        </div>
      </div>
      <!-- accordion body -->
      <div
        v-if="faq.accordion_is_hidden"
        class="accordion-body w-full flex flex-nowrap gap-2 justify-center"
      >
        <div class="w-full pt-4 pb-4">
          {{ faq.faq_answer }}
        </div>
      </div>
    </div>
  </div>
  <!-- chat with us -->
  <div v-if="has_chat" class="w-full mt-6 flex justify-center pb-16">
    <div class="w-3/4">
      <h1 class="text-xl font-bold mt-4 p-2 flex justify-center">
        Still got questions
      </h1>
      <router-link to="/contact-us">
        <p class="text-center">Can't find what you are looking for?</p>
        <p
          class="text-center underline cursor-pointer ml-2 theme-blue hover:text-blue-700"
        >
          Talk to us
        </p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Accordion",
  props: {
    accordion_class: {
      type: String,
      default: "w-[80%] flex flex-wrap justify-center",
    },
    faqs: {
      type: Array,
      required: true,
    },
    has_chat: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    show_accordion(index) {
      this.faqs[index].accordion_is_hidden =
        !this.faqs[index].accordion_is_hidden;
    },
  },
};
</script>
