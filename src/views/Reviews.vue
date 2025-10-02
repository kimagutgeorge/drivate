<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex justify-center flex-wrap">
    <Navbar :categories="categories" :contacts="contacts" has_top_bar />
    <div class="w-[90%] flex flex-wrap mt-6">
      <div class="w-full flex">
        <!-- left -->
        <div class="w-[20%] px-2 to-full to-hide">
          <div class="w-full">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by make
            </h4>
            <div
              v-for="(make, index) in makes"
              :key="index"
              class="flex flex-nowrap gap-2 p-2 hover:bg-white"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <img :src="make.icon" class="w-[30px] min-w-[30px] h-fit" />
              <span class="font-semibold cursor-pointer">{{ make.make }}</span>
            </div>
          </div>
          <div class="w-full mt-8">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by body type
            </h4>
            <div
              v-for="(type, index) in types"
              :key="index"
              class="flex flex-nowrap gap-2 p-2 hover:bg-white"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <img
                :src="type.icon"
                class="w-[30px] min-w-[30px] filter grayscale h-fit"
              />
              <span class="font-semibold cursor-pointer">{{ type.type }}</span>
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
            >
              <img src="/icons/coin.png" class="w-[20px] h-[20px] h-fit" />
              <span
                class="font-semibold cursor-pointer hover:underline ml-2 text-sm"
                >{{ price.price }}</span
              >
            </div>
          </div>
          <div class="w-full mt-8">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Other Categories
            </h4>
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="flex flex-nowrap gap-2 py-2"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <img src="/icons/category.png" class="w-[18px] h-[18px]" />
              <span
                class="font-semibold cursor-pointer hover:underline ml-2 text-sm"
                >{{ category.category }}</span
              >
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
                  <span class="underline">{{ reviews.length }}</span>
                  Review{{ reviews.length > 1 ? "s" : "" }}
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
              <div
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
              </div>
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
                  <button class="bg-[#ffcd00] text-white h-full p-2 w-full">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <!-- sort -->
          </div>

          <!-- list view -->
          <div class="w-full flex flex-wrap mt-6 gap-2 review-card-holder">
            <Card review_card :reviews="paginated_reviews" class="w-full" />
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
    <!-- <Footer
      :makes="makes"
      :prices="price_ranges"
      :body_styles="types"
      :categories="categories"
      :locations="locations"
      :contacts="contacts"
    /> -->
  </div>
</template>
<script>
import Navbar from "@/components/general/Navbar.vue";
import Card from "../components/ui/Card.vue";
import Spinner from "../components/general/Spinner.vue";
import Footer from "../components/general/Footer.vue";
import Search from "../components/general/Search.vue";
import axios from "axios";
import { api } from "../utils/store";
export default {
  name: "Reviews",
  components: { Navbar, Card, Spinner, Footer, Search },
  data() {
    return {
      page_is_loading: true,
      review_status: "Active",

      // data arrays
      reviews: [],
      brands: [],
      models: [],
      body_styles: [],
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

      contacts: [
        { contact: "0759200998", is_phone: true },
        { contact: "info@drivate.co.ke", is_email: true },
        {
          contact: "facebook.com",
          is_handle: true,
          icon: "fa-brands fa-facebook-f",
        },
        { contact: "tiktok.com", is_handle: true, icon: "fa-brands fa-tiktok" },
        {
          contact: "instagram.com",
          is_handle: true,
          icon: "fa-brands fa-instagram",
        },
      ],
      makes: [
        { make: "Toyota" },
        { make: "Suzuki" },
        { make: "Honda" },
        { make: "Nissan" },
        { make: "Mazda" },
        { make: "Mitsubishi" },
        { make: "Subaru" },
        { make: "Ford" },
        { make: "Chevrolet" },
        { make: "Volkswagen" },
        { make: "Hyundai" },
        { make: "Kia" },
        { make: "Mercedes-Benz" },
        { make: "BMW" },
        { make: "Audi" },
      ],
      years: [
        { year: 2000 },
        { year: 2001 },
        { year: 2002 },
        { year: 2003 },
        { year: 2004 },
        { year: 2005 },
        { year: 2006 },
        { year: 2007 },
        { year: 2008 },
        { year: 2009 },
        { year: 2010 },
        { year: 2011 },
        { year: 2012 },
        { year: 2013 },
        { year: 2014 },
        { year: 2015 },
        { year: 2016 },
        { year: 2017 },
        { year: 2018 },
        { year: 2019 },
        { year: 2020 },
        { year: 2021 },
        { year: 2022 },
        { year: 2023 },
        { year: 2024 },
        { year: 2025 },
      ],
      prices: [
        { price: "500,000" },
        { price: "750,000" },
        { price: "1,000,000" },
        { price: "1,500,000" },
        { price: "2,000,000" },
        { price: "2,500,000" },
        { price: "3,000,000" },
        { price: "4,000,000" },
        { price: "5,000,000" },
        { price: "6,000,000" },
        { price: "7,000,000" },
      ],
      categories: [
        { category: "Manual" },
        { category: "Automatic" },
        { category: "New" },
        { category: "Used" },
        { category: "Diesel" },
        { category: "Petrol" },
        { category: "Electric" },
        { category: "Hybrid" },
      ],
      makes: [
        { make: "Toyota", icon: "/static/toyota.png" },
        { make: "Honda", icon: "/static/honda.png" },
        { make: "Nissan", icon: "/static/mazda.png" },
        { make: "Mazda", icon: "/static/mazda.png" },
        { make: "Subaru", icon: "/static/subaru.png" },
        { make: "Ford", icon: "/static/ford.png" },
        { make: "Chevrolet", icon: "/static/chevy.png" },
        { make: "Volkswagen", icon: "/static/vw.png" },
        { make: "Kia", icon: "/static/kia.png" },
        { make: "Mercedes-Benz", icon: "/static/mercedes.png" },
        {
          make: "BMW",
          icon: "/static/bmw.png",
        },
      ],
      categories: [
        { category: "Manual" },
        { category: "Automatic" },
        { category: "New" },
        { category: "Used" },
        { category: "Diesel" },
        { category: "Petrol" },
        { category: "Electric" },
        { category: "Hybrid" },
      ],
      types: [
        { type: "Coupe", icon: "static/bodies/coupe.png" },
        { type: "Sedan", icon: "static/bodies/sedan.png" },
        { type: "Hatchback", icon: "static/bodies/hatchback.png" },
        { type: "SUV", icon: "static/bodies/suv.png" },
        { type: "Crossover", icon: "static/bodies/crossover.png" },
        { type: "Convertible", icon: "static/bodies/convertible.png" },
        { type: "Pickup", icon: "static/bodies/pickup.png" },
        { type: "Van", icon: "static/bodies/van.png" },
      ],
      price_ranges: [
        { price: "Less than 500,000" },
        { price: "500,001 - 1,000,000" },
        { price: "1,000,001 - 1,500,000" },
        { price: "1,500,001 - 2,000,000" },
        { price: "2,000,001 - 2,500,000" },
        { price: "2,500,001 - 3,000,000" },
        { price: "3,000,001 - 4,000,000" },
        { price: "4,000,001 - 5,000,000" },
        { price: "5,000,001 - 6,000,000" },
        { price: "6,000,001 - 7,000,000" },
        { price: "Above 7,000,000" },
      ],
      locations: [
        { name: "Nairobi" },
        { name: "Mombasa" },
        { name: "Japan - Import" },
        { name: "Import - Dubai" },
        { name: "Bute" },
        { name: "Machakos" },
        { name: "Busia" },
        { name: "Bura" },
        { name: "Kiambu" },
        { name: "Changamwe" },
      ],
      most_searched: [
        { name: "Isuzu D-Max" },
        { name: "Toyota Land Cruiser 70 Series" },
        { name: "Toyota Hiace" },
        { name: "Toyota Hilux" },
        { name: "Toyota Prado" },
        { name: "Subaru Forester" },
        { name: "Toyota Axio" },
        { name: "Toyota Vitz" },
        { name: "Nissan X-Trail" },
        { name: "Mahindra Bolero Pickup" },
      ],
      contacts: [
        { contact: "0759200998", is_phone: true },
        { contact: "info@drivate.co.ke", is_email: true },
        {
          contact: "facebook.com",
          is_handle: true,
          icon: "fa-brands fa-facebook-f",
        },
        { contact: "tiktok.com", is_handle: true, icon: "fa-brands fa-tiktok" },
        {
          contact: "instagram.com",
          is_handle: true,
          icon: "fa-brands fa-instagram",
        },
      ],
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
        Promise.all([
          this.getReviews(),
          this.getBrands(),
          this.getModels(),
          this.getBodyStyles(),
        ]),
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

    // get makes
    async getBrands() {
      try {
        const response = await axios.get(`${api}/get-makes`);
        const data = response.data;
        if (data.success && data.brands) {
          this.brands = data.brands;
        } else {
          this.brands = [];
        }

        console.log("brands array:", this.brands); // Debug log
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },

    // get models
    async getModels() {
      try {
        const response = await axios.get(`${api}/get-models`);
        const data = response.data;
        if (data.success && data.models) {
          this.models = data.models;
        } else {
          this.models = [];
        }

        console.log("models array:", this.models); // Debug log
      } catch (error) {
        console.error("Error fetching models:", error);
        this.models = [];
      }
    },

    // get body_styles
    async getBodyStyles() {
      try {
        const response = await axios.get(`${api}/get-body-styles`);
        const data = response.data;
        if (data.success && data.body_styles) {
          this.body_styles = data.body_styles;
        } else {
          this.body_styles = [];
        }

        console.log("body styles array:", this.body_styles); // Debug log
      } catch (error) {
        console.error("Error fetching body styles:", error);
        this.body_styles = [];
      }
    },
  },
};
</script>
