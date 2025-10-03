<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <!-- {{ blogs[0] }} -->
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar
      :categories="other_categories"
      :contacts="contacts"
      :makes="brands"
      :body_styles="body_styles"
      :prices="price_ranges"
    />
    <div class="w-[90%] flex flex-wrap">
      <div class="w-full h-[40vh] overflow-hidden mt-6 relative view-car">
        <!-- background -->
        <div class="w-full h-full absolute">
          <img src="/static/about-us1.jpg" class="w-full h-auto" />
        </div>
        <!-- dark panel -->
        <div class="w-full h-full opacity-50 bg-black absolute z-10"></div>
        <!-- front side -->
        <div
          class="w-full h-full flex flex-col justify-center z-20 absolute p-4"
        >
          <h2 class="font-bold text-2xl text-white">Blogs</h2>
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
      <!-- blog body -->
      <div class="w-full flex mt-20 gap-4 content">
        <div class="w-[40%] flex flex-wrap sticky top-[15vh] self-start">
          <p
            v-for="(category, index) in categories"
            :key="index"
            class="w-[60%] px-4 bg-third transition-all duration-300 ease-in-out hover:text-[#0066ff] py-2 cursor-pointer text-gray-700 border-b border-gray-300"
          >
            {{ category?.category_name }}
          </p>
          <!-- top stories -->
        </div>
        <div class="w-[60%] view-car">
          <div
            v-for="(blog, index) in paginated_blogs"
            :key="index"
            class="w-full border-b border-gray-300 py-4 transition-all duration-300 hover:border-[#ffcd00]"
          >
            <router-link
              :to="`/blogs/view/${blog?.blog_id}/${slugify(blog?.title)}`"
              class="w-full"
            >
              <div class="w-full max-h-[50vh] overflow-hidden">
                <img :src="blog?.image_url" class="w-full h-auto" />
              </div>
              <div class="w-full mt-4">
                <div class="w-ful0 flex theme-yellow">
                  <div class="w-1/2">
                    <p
                      class="text-sm text-[#0166ff] p-2 py-0 w-fit rounded border border-[#0166ff]"
                    >
                      {{ blog?.category }}
                    </p>
                  </div>
                  <div class="w-1/2 flex justify-end gap-2">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                  </div>
                </div>
                <h1 class="font-extrabold text-3xl">
                  {{ blog?.title }}
                </h1>
                <p class="text-[#333333] mt-4">{{ blog?.excerpt }}</p>
              </div>
            </router-link>
          </div>
          <!-- pagination -->
          <div class="w-full flex py-2 to-wrap mt-8">
            <div class="w-1/2 to-w-full">
              <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
            </div>
            <div class="w-1/2 flex justify-end gap-1 to-w-full">
              <button
                @click="prevPage"
                :disabled="currentPage === 0"
                class="px-3 py-1 border border-[#4d4d4d] disabled:opacity-50"
              >
                <i class="fa-solid fa-angle-left"></i>
                Prev
              </button>
              <!-- numbering pages -->
              <button
                v-for="index in totalPages"
                :key="index"
                @click="select_specific_page(index)"
                class="px-3 py-1 border border-[#4d4d4d]"
                :class="
                  currentPage + 1 === index ? 'bg-[#4d4d4d] text-white' : ''
                "
              >
                {{ index }}
              </button>
              <!-- end of numbering -->
              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages - 1"
                class="px-3 py-1 border border-[#4d4d4d] disabled:opacity-50"
              >
                Next
                <i class="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
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
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import Spinner from "../components/general/Spinner.vue";
import axios from "axios";
import { api, slugify } from "../utils/store";

export default {
  name: "Blogs",
  props: {
    brands: Array,
    body_styles: Array,
    models: Array,
    other_categories: Array,
    price_ranges: Array,
    locations: Array,
    contacts: Array,
  },
  components: { Navbar, Spinner, Footer },
  data() {
    return {
      page_is_loading: true,

      blogs: [],

      //pagination
      currentPage: 0, // start on first page
      pageSize: 7, // rows per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.blogs.length / this.pageSize);
    },
    paginated_blogs() {
      const start = this.currentPage * this.pageSize;
      return this.blogs.slice(start, start + this.pageSize);
    },
  },
  async mounted() {
    document.title = "Drivate - Blogs";
    try {
      await Promise.race([
        Promise.all([this.getBlogs(), this.getCategories()]),
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
    slugify,
    async getCategories() {
      try {
        const response = await axios.get(`${api}/get-categories`);
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
    async getBlogs() {
      try {
        const response = await axios.get(`${api}/get-blogs`);
        const data = response.data;
        if (data.success) {
          this.blogs = data.blogs;

          setTimeout(() => {
            this.response_is_visible = false;
          }, 3000);
        } else {
          // Handle API error response
          throw new Error(data.error || "Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);

        this.blogs = [];
      }
    },
    //pagination methods
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    select_specific_page(index) {
      this.currentPage = index - 1;
    },
  },
};
</script>
