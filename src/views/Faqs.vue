<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar
      :categories="other_categories"
      :contacts="contacts"
      :makes="brands"
      :body_styles="body_styles"
      :prices="price_ranges"
    />
    <div class="w-[90%] flex flex-wrap mt-8">
      <div class="w-full h-[40vh] overflow-hidden mt-6 relative view-car">
        <!-- background -->
        <div class="w-full h-full absolute">
          <img
            src="/images/car-4.jpg"
            class="w-full min-w-full max-w-none h-auto min-h-full"
          />
        </div>
        <!-- dark panel -->
        <div class="w-full h-full opacity-50 bg-black absolute z-10"></div>
        <!-- front side -->
        <div
          class="w-full h-full flex flex-col justify-center z-20 absolute p-4"
        >
          <h2 class="font-bold text-2xl text-white">
            Frequenly Asked Questions
          </h2>
          <div
            class="w-[30%] flex flex-nowrap gap-2 bg-[#fffadd] p-2 mt-4 half-to-full"
          >
            <input
              type="text"
              placeholder="Search"
              class="p-2 w-full bg-[#fffadd] focus:outline-none"
            />
            <button class="p-2 h-full flex flex-col justify-center">
              <i class="fa-solid fa-search theme-blue text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full flex content">
        <div class="w-[30%] sticky top-[15vh] pt-6 self-start">
          <p
            v-for="(category, index) in categories"
            :key="index"
            class="py-1 px-4 full cursor-pointer border w-fit mb-1 hover:bg-[#FFF199] hover:font-bold hover:border-[#FFF199]"
            :class="
              index === 0
                ? 'bg-[#FFF199] font-bold border-[#FFF199]'
                : 'border-gray-300'
            "
          >
            {{ category?.category_name }}
          </p>
        </div>
        <div class="w-[70%] view-car">
          <Accordion :faqs="faqs" has_chat />
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
    <Footer
      :makes="brands"
      :prices="price_ranges"
      :body_styles="body_styles"
      :categories="other_categories"
      :locations="locations"
      :contacts="contacts"
    />
  </div>
</template>
<script>
import Spinner from "../components/general/Spinner.vue";
import Accordion from "../components/Accordion.vue";
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import { api } from "../utils/store";
import axios from "axios";

export default {
  name: "Faqs",
  props: {
    brands: Array,
    body_styles: Array,
    models: Array,
    other_categories: Array,
    price_ranges: Array,
    locations: Array,
    contacts: Array,
  },
  components: { Accordion, Spinner, Footer, Navbar },
  data() {
    return {
      page_is_loading: true,
      categories: [],
      faqs: [],
    };
  },
  /* mounted */
  async mounted() {
    document.title = "Drivate - Frequently Asked Questions";
    try {
      await Promise.race([
        Promise.all([this.getFaqs(), this.getCategories()]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
        ),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
  },

  methods: {
    async getFaqs() {
      try {
        const response = await axios.get(`${api}/get-faqs`);
        const data = response.data;
        if (data.success && data.faqs) {
          this.faqs = data.faqs;
        } else {
          this.faqs = [];
          this.show_success("No faqs found in response");
        }
      } catch (error) {
        this.show_error(error);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get(`${api}/get-faq-categories`);
        const data = response.data;
        if (data.success) {
          this.categories = data.categories; // Extract the array
        } else {
          this.categories = []; // Fallback to empty array
          this.show_error(data.error);
        }
      } catch (error) {
        this.show_error(error);
        this.categories = []; // Set to empty array on error
      }
    },
  },
};
</script>
