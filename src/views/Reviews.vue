<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex justify-center flex-wrap">
    <Navbar
      :categories="other_categories"
      :contacts="contacts"
      :makes="brands"
      :body_styles="body_styles"
      :prices="price_ranges"
    />
    <div class="w-[90%] flex flex-wrap mt-6">
      <div class="w-full flex">
        <!-- left -->
        <div class="w-[20%] px-2 to-full to-hide">
          <div class="w-full">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by make
            </h4>
            <div
              v-for="(make, index) in brands"
              :key="index"
              class="flex flex-nowrap gap-2 p-2 hover:bg-white"
              style="border-bottom: 1px solid #f4f5f4"
              @click="filterByMake(make?.id)"
            >
              <div class="w-full flex gap-2 flex-nowrap inner-cat">
                <img
                  :src="make?.image_url"
                  class="w-[30px] min-w-[30px] h-fit"
                />
                <p class="font-semibold cursor-pointer">{{ make?.name }}</p>
              </div>
            </div>
          </div>
          <div class="w-full mt-8">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by body type
            </h4>
            <div
              v-for="(type, index) in body_styles"
              :key="index"
              class="flex flex-nowrap gap-2 p-2 hover:bg-white"
              style="border-bottom: 1px solid #f4f5f4"
              @click="filterByBodyType(type?.id)"
            >
              <div class="w-full flex gap-2 flex-nowrap inner-cat">
                <img
                  :src="type?.image_url"
                  class="w-[30px] min-w-[30px] filter grayscale h-fit"
                />
                <p class="font-semibold cursor-pointer">{{ type?.name }}</p>
              </div>
            </div>
          </div>
          <div class="w-full mt-8">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by price
            </h4>
            <div
              v-for="(price, index) in price_ranges"
              :key="index"
              class="flex flex-nowrap gap-2 py-2"
              style="border-bottom: 1px solid #f4f5f4"
              @click="filterByPrice(price)"
            >
              <div class="w-full flex gap-2 flex-nowrap inner-cat">
                <img src="/icons/coin.png" class="w-[20px] h-[20px] h-fit" />
                <span
                  class="font-semibold cursor-pointer hover:underline ml-2 text-sm"
                  >{{
                    price?.min_price === 0
                      ? "Less than"
                      : price?.min_price.toLocaleString()
                  }}
                  -
                  {{
                    price?.max_price === 0
                      ? "More than"
                      : price?.max_price.toLocaleString()
                  }}</span
                >
              </div>
            </div>
          </div>
          <div class="w-full mt-8">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Other Categories
            </h4>
            <div
              v-for="(category, index) in other_categories"
              :key="index"
              class="flex flex-nowrap gap-2 py-2"
              style="border-bottom: 1px solid #f4f5f4"
              @click="filterByCategory(category?.name)"
            >
              <div class="w-full flex gap-2 flex-nowrap inner-cat">
                <img src="/icons/category.png" class="w-[18px] h-[18px]" />
                <span
                  class="font-semibold cursor-pointer hover:underline ml-2 text-sm"
                  >{{ category?.category }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- shop panel -->
        <div class="w-[80%] to-full">
          <!-- search panel -->
          <div class="w-full p-4 pt-0 h-fit border-b">
            <h1 class="font-extrabold text-3xl">
              Customer Reviews and Ratings
            </h1>
            <div class="w-full flex mt-2 flex-nowrap gap-2">
              <div class="flex flex-nowrap gap-[5px]">
                <i
                  v-for="index in average_rating"
                  :key="index"
                  class="fa-solid fa-star theme-yellow"
                ></i>
                <i
                  v-for="index in rating_balance"
                  :key="index"
                  class="fa-solid fa-star text-gray-500"
                ></i>
              </div>
              <div class="w-full mt-[-5px] flex flex-nowrap">
                <h2 class="theme-blue text-xl font-bold">
                  <span class="underline">{{ reviews?.length }}</span>
                  Review{{ reviews?.length > 1 ? "s" : "" }}
                </h2>
                <h2
                  class="ml-4 cursor-pointer font-bold transition-all duration-300 hover:underline"
                >
                  <router-link to="/leave-review">
                    Leave us a review
                  </router-link>
                </h2>
              </div>
            </div>
            <div class="w-full flex flex-nowrap mt-4 gap-2 review-search">
              <!-- <div
                class="w-1/2 flex flex-nowrap border border-[#ffcd00] search-inner"
              >
                <input
                  type="text"
                  placeholder="Key words"
                  class="focus:outline-none p-2 w-full"
                />
                <button class="bg-[#ffcd00] text-white p-2 px-4">
                  <i class="fa-solid fa-search"></i>
                </button>
              </div> -->
              <div class="w-1/2 flex flex-nowrap gap-2 search-inner">
                <div class="w-[25%] to-full">
                  <div class="relative w-full">
                    <!-- Search Input -->
                    <input
                      type="text"
                      class="p-2 w-full border focus:outline-none"
                      placeholder="Any brand"
                      v-model="searchQuery"
                      @focus="showDropdown = true"
                      @blur="handleBlur"
                      @keydown="handleKeydown"
                      autocomplete="off"
                    />

                    <!-- Dropdown List -->
                    <div
                      v-if="showDropdown && filteredBrands.length > 0"
                      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                    >
                      <div
                        v-for="(brand, index) in filteredBrands"
                        :key="brand?.make_id || brand?.id"
                        :class="[
                          'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                          selectedIndex === index ? 'bg-blue-100' : '',
                        ]"
                        @mousedown="selectBrand(brand)"
                        @mouseenter="selectedIndex = index"
                      >
                        <div class="font-medium text-gray-900 flex flex-nowrap">
                          {{ brand?.name }}
                        </div>
                      </div>
                    </div>

                    <!-- No results message -->
                    <div
                      v-if="
                        showDropdown &&
                        filteredBrands.length === 0 &&
                        searchQuery
                      "
                      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-gray-500 text-center"
                    >
                      No brand found for "{{ searchQuery }}"
                    </div>
                  </div>

                  <!-- Hidden input for form submission -->
                  <input type="hidden" v-model="make_id" required />
                </div>
                <div class="w-[25%] to-full">
                  <div class="relative w-full">
                    <!-- Model Search Input -->
                    <input
                      type="text"
                      class="p-2 w-full border focus:outline-none"
                      placeholder="Any Model"
                      v-model="modelSearchQuery"
                      @focus="modelShowDropdown = true"
                      @blur="handleModelBlur"
                      @keydown="handleModelKeydown"
                      autocomplete="off"
                      :disabled="!make_id"
                    />

                    <!-- Model Dropdown List -->
                    <div
                      v-if="modelShowDropdown && filteredModels.length > 0"
                      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                    >
                      <div
                        v-for="(model, index) in filteredModels"
                        :key="model?.model_id || model?.id"
                        :class="[
                          'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                          modelSelectedIndex === index ? 'bg-blue-100' : '',
                        ]"
                        @mousedown="selectModel(model)"
                        @mouseenter="modelSelectedIndex = index"
                      >
                        <div class="font-medium text-gray-900">
                          {{ model?.model_name }}
                        </div>
                      </div>
                    </div>

                    <!-- No results message -->
                    <div
                      v-if="
                        modelShowDropdown &&
                        filteredModels.length === 0 &&
                        modelSearchQuery &&
                        make_id
                      "
                      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-gray-500 text-center"
                    >
                      No model found for "{{ modelSearchQuery }}"
                    </div>
                  </div>

                  <!-- Hidden input for form submission -->
                  <input type="hidden" v-model="model_id" />
                </div>
                <div class="w-[25%] to-full">
                  <div class="relative w-full">
                    <!-- Body Style Search Input -->
                    <input
                      type="text"
                      class="p-2 w-full border focus:outline-none"
                      placeholder="Any Body Type"
                      v-model="bodyStyleSearchQuery"
                      @focus="bodyStyleShowDropdown = true"
                      @blur="handleBodyStyleBlur"
                      @keydown="handleBodyStyleKeydown"
                      autocomplete="off"
                    />

                    <!-- Body Style Dropdown List -->
                    <div
                      v-if="
                        bodyStyleShowDropdown && filteredBodyStyles.length > 0
                      "
                      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                    >
                      <div
                        v-for="(style, index) in filteredBodyStyles"
                        :key="style?.body_style_id || style?.id"
                        :class="[
                          'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                          bodyStyleSelectedIndex === index ? 'bg-blue-100' : '',
                        ]"
                        @mousedown="selectBodyStyle(style)"
                        @mouseenter="bodyStyleSelectedIndex = index"
                      >
                        <div class="font-medium text-gray-900">
                          {{ style?.name }}
                        </div>
                      </div>
                    </div>

                    <!-- No results message -->
                    <div
                      v-if="
                        bodyStyleShowDropdown &&
                        filteredBodyStyles.length === 0 &&
                        bodyStyleSearchQuery
                      "
                      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-gray-500 text-center"
                    >
                      No body style found for "{{ bodyStyleSearchQuery }}"
                    </div>
                  </div>

                  <!-- Hidden input for form submission -->
                  <input type="hidden" v-model="body_style_id" />
                </div>
                <div class="w-[25%] to-full">
                  <button
                    @click="filter_review"
                    class="bg-[#ffcd00] text-white h-full p-2 w-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <!-- sort -->
          </div>

          <!-- list view -->
          <div class="w-full flex flex-wrap mt-6 gap-2 review-card-holder">
            <div v-if="reviews.length < 1" class="w-full text-center">
              <i class="fa-solid fa-car text-6xl text-gray-300 mb-4"></i>
              <h3 class="text-xl font-bold mb-2">No reviews found</h3>
              <p class="text-gray-600 mb-4">
                Try adjusting your search filters
              </p>
              <button
                @click="clearAllFilters"
                class="bg-theme-yellow px-6 py-2 font-semibold"
              >
                Clear Filters
              </button>
            </div>
            <Card
              v-else
              review_card
              :reviews="paginated_reviews"
              class="w-full"
            />
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
import Navbar from "@/components/general/Navbar.vue";
import Card from "../components/ui/Card.vue";
import Spinner from "../components/general/Spinner.vue";
import Footer from "../components/general/Footer.vue";
import Search from "../components/general/Search.vue";
import axios from "axios";
import { api, slugify } from "../utils/store";
export default {
  name: "Reviews",
  props: {
    brands: Array,
    body_styles: Array,
    models: Array,
    other_categories: Array,
    price_ranges: Array,
    locations: Array,
    contacts: Array,
  },
  components: { Navbar, Card, Spinner, Footer, Search },
  data() {
    return {
      page_is_loading: true,
      review_status: "Active",

      // data arrays
      reviews: [],
      average_rating: "",
      rating_balance: "",

      //pagination
      currentPage: 0, // start on first page
      pageSize: 10, // rows per page

      // make search query
      make_id: "",
      searchQuery: "",
      showDropdown: false,
      selectedIndex: -1,

      // model search query
      model_id: "",
      modelSearchQuery: "",
      modelShowDropdown: false,
      modelSelectedIndex: -1,

      // body style search query
      body_style_id: "",
      bodyStyleSearchQuery: "",
      bodyStyleShowDropdown: false,
      bodyStyleSelectedIndex: -1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reviews.length / this.pageSize);
    },

    paginated_reviews() {
      const start = this.currentPage * this.pageSize;
      return this.reviews.slice(start, start + this.pageSize);
    },

    filteredBrands() {
      if (!this.searchQuery) {
        return this.brands;
      }
      return this.brands.filter((brand) =>
        brand.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    filteredModels() {
      if (!this.make_id) {
        return [];
      }

      // Check both possible property names for the foreign key
      let filtered = this.models.filter(
        (model) =>
          model.make_id === this.make_id || model.brand_id === this.make_id
      );

      // Further filter by search query if present
      if (this.modelSearchQuery) {
        filtered = filtered.filter((model) =>
          model.model_name
            .toLowerCase()
            .includes(this.modelSearchQuery.toLowerCase())
        );
      }

      return filtered;
    },

    filteredBodyStyles() {
      if (!this.bodyStyleSearchQuery) {
        return this.body_styles;
      }
      return this.body_styles.filter((style) =>
        style.name
          .toLowerCase()
          .includes(this.bodyStyleSearchQuery.toLowerCase())
      );
    },
  },

  /* mounted */
  async mounted() {
    document.title = "Drivate - Reviews";
    try {
      await Promise.race([
        Promise.all([this.getReviews()]),
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

  /* methods */
  methods: {
    slugify,
    async filter_review() {
      if (
        this.model_id == "" &&
        this.make_id == "" &&
        this.body_style_id == ""
      ) {
        return;
      }
      try {
        const formData = new FormData();
        formData.append("model", this.model_id);
        formData.append("make", this.make_id);
        formData.append("body", this.body_style_id);

        const response = await axios.post(
          api + "/filter-reviews/" + this.review_status,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const data = response.data;
        if (data.success) {
          this.reviews = data.reviews;
        }
      } catch (error) {
        console.error(error);
      }
    },
    clearAllFilters() {
      // make search query
      this.make_id = "";
      this.searchQuery = "";
      this.showDropdown = "";
      this.selectedIndex = "";

      // model search query
      this.model_id = "";
      this.modelSearchQuery = "";
      this.modelShowDropdown = "";
      this.modelSelectedIndex = "";

      // body style search query
      this.body_style_id = "";
      this.bodyStyleSearchQuery = "";
      this.bodyStyleShowDropdown = "";
      this.bodyStyleSelectedIndex = "";
      this.getReviews();
    },
    async getReviews() {
      try {
        const response = await axios.get(
          `${api}/get-reviews/${this.review_status}`
        );
        const data = response.data;
        console.log(data);
        if (data.success) {
          this.reviews = data.reviews; // Extract the array
          this.average_rating = Math.round(data.average_rating);
          this.rating_balance = 5 - this.average_rating;
        } else {
          this.reviews = []; // Fallback to empty array
        }
      } catch (error) {
        console.error(error);
        this.reviews = []; // Set to empty array on error
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

    /// Brand search and selection logic
    selectBrand(brand) {
      this.make_id = brand.make_id || brand.id;
      this.make = brand.name;
      this.searchQuery = brand.name;
      this.showDropdown = false;
      this.selectedIndex = -1;

      // Reset model selection when brand changes
      this.model_id = "";
      this.modelSearchQuery = "";
    },

    handleBlur() {
      // Delay hiding dropdown to allow for selection
      setTimeout(() => {
        this.showDropdown = false;
        this.selectedIndex = -1;
      }, 200);
    },

    handleKeydown(event) {
      if (!this.showDropdown) {
        this.showDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.selectedIndex = Math.min(
            this.selectedIndex + 1,
            this.filteredBrands.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.selectedIndex >= 0 &&
            this.filteredBrands[this.selectedIndex]
          ) {
            this.selectBrand(this.filteredBrands[this.selectedIndex]);
          }
          break;
        case "Escape":
          this.showDropdown = false;
          this.selectedIndex = -1;
          break;
      }
    },

    /// Model search and selection logic
    selectModel(model) {
      this.model_id = model.model_id || model.id;
      this.modelSearchQuery = model.model_name;
      this.modelShowDropdown = false;
      this.modelSelectedIndex = -1;
    },

    handleModelBlur() {
      setTimeout(() => {
        this.modelShowDropdown = false;
        this.modelSelectedIndex = -1;
      }, 200);
    },

    handleModelKeydown(event) {
      if (!this.modelShowDropdown) {
        this.modelShowDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.modelSelectedIndex = Math.min(
            this.modelSelectedIndex + 1,
            this.filteredModels.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.modelSelectedIndex = Math.max(this.modelSelectedIndex - 1, -1);
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.modelSelectedIndex >= 0 &&
            this.filteredModels[this.modelSelectedIndex]
          ) {
            this.selectModel(this.filteredModels[this.modelSelectedIndex]);
          }
          break;
        case "Escape":
          this.modelShowDropdown = false;
          this.modelSelectedIndex = -1;
          break;
      }
    },

    /// Body Style search and selection logic
    selectBodyStyle(style) {
      this.body_style_id = style.body_style_id || style.id;
      this.bodyStyleSearchQuery = style.name;
      this.bodyStyleShowDropdown = false;
      this.bodyStyleSelectedIndex = -1;
    },

    handleBodyStyleBlur() {
      setTimeout(() => {
        this.bodyStyleShowDropdown = false;
        this.bodyStyleSelectedIndex = -1;
      }, 200);
    },

    handleBodyStyleKeydown(event) {
      if (!this.bodyStyleShowDropdown) {
        this.bodyStyleShowDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.bodyStyleSelectedIndex = Math.min(
            this.bodyStyleSelectedIndex + 1,
            this.filteredBodyStyles.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.bodyStyleSelectedIndex = Math.max(
            this.bodyStyleSelectedIndex - 1,
            -1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.bodyStyleSelectedIndex >= 0 &&
            this.filteredBodyStyles[this.bodyStyleSelectedIndex]
          ) {
            this.selectBodyStyle(
              this.filteredBodyStyles[this.bodyStyleSelectedIndex]
            );
          }
          break;
        case "Escape":
          this.bodyStyleShowDropdown = false;
          this.bodyStyleSelectedIndex = -1;
          break;
      }
    },

    // New filter methods for sidebar clicks
    filterByMake(makeId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, make: makeId },
      });
    },

    filterByModel(modelId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, model: modelId },
      });
    },

    filterByBodyType(bodyId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, body: bodyId },
      });
    },

    filterByPrice(priceRange) {
      // Assuming price_ranges have min_price and max_price properties
      const query = { ...this.$route.query };
      if (priceRange.min_price) query.min_price = priceRange.min_price;
      if (priceRange.max_price) query.max_price = priceRange.max_price;
      this.$router.push({ path: "/vehicles", query });
    },

    filterByLocation(locationId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, location: locationId },
      });
    },

    filterByCategory(categoryId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, category: categoryId },
      });
    },
  },
};
</script>
