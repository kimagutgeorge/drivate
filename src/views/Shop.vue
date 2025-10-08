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
      <div class="w-full flex to-wrap">
        <!-- left -->
        <div class="w-[20%] px-2 filter to-full to-second">
          <div class="w-full heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by make
            </h4>
            <div class="w-full to-flex">
              <div
                v-for="(make, index) in brands"
                :key="index"
                class="flex flex-nowrap gap-2 p-2 hover:bg-white category cursor-pointer"
                style="border-bottom: 1px solid #f4f5f4"
                @click="filterByMake(make?.id)"
              >
                <div class="w-full flex gap-2 flex-nowrap inner-cat">
                  <img
                    :src="make?.image_url"
                    class="w-[30px] min-w-[30px] h-fit"
                  />
                  <p class="font-semibold">{{ make?.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full mt-8 heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by Models
            </h4>
            <div
              v-for="(model, index) in models"
              :key="index"
              class="flex flex-nowrap gap-2 py-2 cursor-pointer hover:bg-white"
              style="border-bottom: 1px solid #f4f5f4"
              @click="filterByModel(model.model_id)"
            >
              <span class="font-semibold hover:underline text-sm">
                {{ model?.make_name }} {{ model?.model_name }}
              </span>
            </div>
          </div>
          <div class="w-full mt-8 heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by body type
            </h4>
            <div class="w-full to-flex">
              <div
                v-for="(type, index) in body_styles"
                :key="index"
                class="flex flex-nowrap gap-2 p-2 hover:bg-white category cursor-pointer"
                style="border-bottom: 1px solid #f4f5f4"
                @click="filterByBodyType(type.id)"
              >
                <div class="w-full flex gap-2 flex-nowrap inner-cat">
                  <img
                    :src="type?.image_url"
                    class="w-[30px] min-w-[30px] filter grayscale h-fit"
                  />
                  <p class="font-semibold">{{ type?.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full mt-8 heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by price
            </h4>
            <div class="w-full to-flex">
              <div
                v-for="(price, index) in price_ranges"
                :key="index"
                class="flex flex-nowrap gap-2 py-2 category cursor-pointer hover:bg-white"
                style="border-bottom: 1px solid #f4f5f4"
                @click="filterByPrice(price)"
              >
                <img
                  src="/icons/coin.png"
                  class="w-[20px] h-[20px] h-fit to-hide"
                />
                <span class="font-semibold hover:underline ml-2 text-sm">
                  {{
                    price?.min_price === 0
                      ? "Less than"
                      : price?.min_price.toLocaleString()
                  }}
                  -
                  {{
                    price?.max_price === 0
                      ? "More than"
                      : price?.max_price.toLocaleString()
                  }}
                </span>
              </div>
            </div>
          </div>

          <div class="w-full mt-8 heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by Location
            </h4>
            <div class="w-full to-flex">
              <div
                v-for="(location, index) in locations"
                :key="index"
                class="flex flex-nowrap gap-2 py-2 category cursor-pointer hover:bg-white"
                style="border-bottom: 1px solid #f4f5f4"
                @click="filterByLocation(location.location_id)"
              >
                <i class="fa-solid fa-location-dot text-gray-600"></i>
                <span class="font-semibold hover:underline ml-2 text-sm">
                  {{ location?.location_name }}
                </span>
              </div>
            </div>
          </div>

          <div class="w-full mt-8 heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Other Categories
            </h4>
            <div class="w-full to-flex">
              <div
                v-for="(category, index) in categories"
                :key="index"
                class="flex flex-nowrap gap-2 py-2 category cursor-pointer hover:bg-white"
                style="border-bottom: 1px solid #f4f5f4"
                @click="filterByCategory(category?.name)"
              >
                <img
                  src="/icons/category.png"
                  class="w-[18px] h-[18px] h-fit"
                />
                <span class="font-semibold hover:underline ml-2 text-sm">
                  {{ category?.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- shop panel -->
        <div class="w-[80%] to-full to-first">
          <!-- search panel -->
          <div class="w-full p-4 bg-third h-fit">
            <Search
              :makes="brands"
              :fetched_models="models"
              :body_styles="body_styles"
            />
            <!-- Results count -->
            <div v-if="search_params_exist" class="w-full bg-white p-3 mt-2">
              <p class="text-sm">
                <strong>{{ all_vehicles.length }}</strong> vehicles found
                <span v-if="active_filters.length > 0">
                  matching your search criteria
                </span>
              </p>
              <!-- Active filters -->
              <div
                v-if="active_filters.length > 0"
                class="flex flex-wrap gap-2 mt-2"
              >
                <span
                  v-for="(filter, index) in active_filters"
                  :key="index"
                  class="bg-theme-yellow px-3 py-1 text-sm"
                >
                  {{ filter }}
                </span>
                <button
                  @click="clearAllFilters"
                  class="text-sm text-red-600 hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            </div>
            <!-- sort -->
            <div class="w-full bg-third p-4 flex flex-nowrap">
              <p class="text-sm font-semibold">Sort By:</p>
              <select
                v-model="sort_option"
                @change="sortVehicles"
                class="ml-1 h-fit"
              >
                <option value="">None</option>
                <option value="price_asc">Price - Low to high</option>
                <option value="price_desc">Price - High to low</option>
                <option value="year_asc">Year - Old to new</option>
                <option value="year_desc">Year - New to old</option>
                <option value="mileage_asc">Mileage - Low to high</option>
                <option value="mileage_desc">Mileage - High to low</option>
              </select>
              <div
                @click="is_grid_view = true"
                class="w-[24px] h-[24px] flex flex-wrap gap-[1px] cursor-pointer ml-2 to-hide"
              >
                <div
                  v-for="i in 4"
                  :key="i"
                  class="h-[11px] w-[11px] rounded-[2px]"
                  :class="is_grid_view ? 'bg-theme-yellow' : 'bg-black'"
                ></div>
              </div>
              <div
                @click="is_grid_view = false"
                class="w-[25px] h-[22px] flex flex-col gap-[2px] cursor-pointer ml-2 to-hide"
              >
                <div
                  v-for="i in 3"
                  :key="i"
                  class="h-[6px] w-full rounded-[2px]"
                  :class="!is_grid_view ? 'bg-theme-yellow' : 'bg-black'"
                ></div>
              </div>
            </div>
          </div>
          <!-- No results message -->
          <div
            v-if="all_vehicles.length === 0 && !page_is_loading"
            class="w-full p-8 text-center"
          >
            <i class="fa-solid fa-car text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-bold mb-2">No vehicles found</h3>
            <p class="text-gray-600 mb-4">Try adjusting your search filters</p>
            <button
              @click="clearAllFilters"
              class="bg-theme-yellow px-6 py-2 rounded font-semibold"
            >
              Clear Filters
            </button>
          </div>
          <!-- grid view -->
          <div
            v-if="is_grid_view && all_vehicles.length > 0"
            class="w-full flex flex-wrap mt-6 gap-2 shop-car-holder"
          >
            <Card
              car_card
              :vehicles="paginated_grid_vehicles"
              class="w-[32%] mb-2"
            />

            <!-- pagination -->
            <div class="w-full flex py-2 to-wrap mt-8">
              <div class="w-1/2 to-w-full">
                <span
                  >Page {{ current_grid_page + 1 }} of
                  {{ total_grid_pages }}</span
                >
              </div>
              <div class="w-1/2 flex justify-end gap-1 to-w-full">
                <button
                  @click="prev_grid_page"
                  :disabled="current_grid_page === 0"
                  class="px-3 py-1 border border-[#4d4d4d] disabled:opacity-50"
                >
                  <i class="fa-solid fa-angle-left"></i>
                  Prev
                </button>
                <!-- numbering pages -->
                <button
                  v-for="index in total_grid_pages"
                  :key="index"
                  @click="select_specific_grid_page(index)"
                  class="px-3 py-1 border border-[#4d4d4d]"
                  :class="
                    current_grid_page + 1 === index
                      ? 'bg-[#4d4d4d] text-white'
                      : ''
                  "
                >
                  {{ index }}
                </button>
                <!-- end of numbering -->
                <button
                  @click="next_grid_page"
                  :disabled="current_grid_page >= total_grid_pages - 1"
                  class="px-3 py-1 border border-[#4d4d4d] disabled:opacity-50"
                >
                  Next
                  <i class="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- list view -->
          <div
            v-if="!is_grid_view && all_vehicles.length > 0"
            class="w-full flex flex-wrap mt-6 gap-2"
          >
            <Card
              list_card
              :vehicles="paginated_list_vehicles"
              class="w-full mb-2"
            />

            <!-- pagination -->
            <div class="w-full flex py-2 to-wrap mt-8">
              <div class="w-1/2 to-w-full">
                <span
                  >Page {{ current_list_page + 1 }} of
                  {{ total_list_pages }}</span
                >
              </div>
              <div class="w-1/2 flex justify-end gap-1 to-w-full">
                <button
                  @click="prev_list_page"
                  :disabled="current_list_page === 0"
                  class="px-3 py-1 border border-[#4d4d4d] disabled:opacity-50"
                >
                  <i class="fa-solid fa-angle-left"></i>
                  Prev
                </button>
                <!-- numbering pages -->
                <button
                  v-for="index in total_list_pages"
                  :key="index"
                  @click="select_specific_list_page(index)"
                  class="px-3 py-1 border border-[#4d4d4d]"
                  :class="
                    current_list_page + 1 === index
                      ? 'bg-[#4d4d4d] text-white'
                      : ''
                  "
                >
                  {{ index }}
                </button>
                <!-- end of numbering -->
                <button
                  @click="next_list_page"
                  :disabled="current_list_page >= total_list_pages - 1"
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
import { api, slugify } from "../utils/store";
import axios from "axios";
import { useHead } from "@vueuse/head";

export default {
  name: "Shop",
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
      is_grid_view: true,
      sort_option: "",

      // data arrays
      categories: [
        { name: "Petrol" },
        { name: "Diesel" },
        { name: "Hybrid" },
        { name: "Electric" },
        { name: "Other" },
        // <select v-model="fuel_type" class="py-1 rounded-0 bg-white w-full mt-1">
        //   <option value="">Select Fuel Type</option>
        //   <option value="Petrol">Petrol</option>
        //   <option value="Diesel">Diesel</option>
        //   <option value="Hybrid">Hybrid</option>
        //   <option value="Electric">Electric</option>
        //   <option value="Other">Other</option>
        // </select>
      ],
      all_vehicles: [],
      is_make: "make",
      is_body_type: "body",
      is_brand: "brand",
      is_model: "model",

      // Search parameters
      search_params: {},

      // pagination
      grid_page_size: 30,
      current_grid_page: 0,

      //list style
      list_page_size: 20,
      current_list_page: 0,
    };
  },
  /* mounted */
  async mounted() {
    this.setupSEO();
    document.title = "Drivate - All vehicles";

    // Get search parameters from URL
    this.search_params = { ...this.$route.query };

    try {
      await Promise.race([
        this.filterVehicles(),
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
  /* watch for route changes */
  watch: {
    "$route.query": {
      handler(newQuery) {
        this.search_params = { ...newQuery };
        this.filterVehicles();
      },
      deep: true,
    },
  },
  computed: {
    total_grid_pages() {
      return Math.ceil(this.all_vehicles.length / this.grid_page_size);
    },
    paginated_grid_vehicles() {
      const start = this.current_grid_page * this.grid_page_size;
      return this.all_vehicles.slice(start, start + this.grid_page_size);
    },

    // computed grid
    total_list_pages() {
      return Math.ceil(this.all_vehicles.length / this.list_page_size);
    },
    paginated_list_vehicles() {
      const start = this.current_list_page * this.list_page_size;
      return this.all_vehicles.slice(start, start + this.list_page_size);
    },

    // Check if search params exist
    search_params_exist() {
      return Object.keys(this.search_params).length > 0;
    },

    // Get active filters for display
    active_filters() {
      const filters = [];
      const params = this.search_params;

      if (params.keywords) filters.push(`Keywords: ${params.keywords}`);
      if (params.make) {
        const make = this.brands.find((b) => b.id == params.make);
        if (make) filters.push(`Make: ${make.name}`);
      }
      if (params.model) {
        const model = this.models.find((m) => m.id == params.model);
        if (model) filters.push(`Model: ${model.model_name}`);
      }
      if (params.condition) filters.push(`Condition: ${params.condition}`);
      if (params.fuel) filters.push(`Fuel: ${params.fuel}`);
      if (params.min_year || params.max_year) {
        filters.push(
          `Year: ${params.min_year || "Any"} - ${params.max_year || "Any"}`
        );
      }
      if (params.min_price || params.max_price) {
        filters.push(
          `Price: ${params.min_price || "Any"} - ${params.max_price || "Any"}`
        );
      }
      if (params.body) {
        const body = this.body_styles.find((b) => b.id == params.body);
        if (body) filters.push(`Body: ${body.name}`);
      }
      if (params.transmission)
        filters.push(`Transmission: ${params.transmission}`);
      if (params.location) {
        const location = this.locations.find((l) => l.id == params.location);
        if (location) filters.push(`Location: ${location.location_name}`);
      }
      if (params.category) {
        const category = this.other_categories.find(
          (c) => c.id == params.category
        );
        if (category) filters.push(`Category: ${category.category}`);
      }

      return filters;
    },
  },
  /* methods */
  methods: {
    slugify,

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

    async filterVehicles() {
      try {
        this.page_is_loading = true;

        // Create FormData with search parameters
        const formData = new FormData();

        // Add all search parameters from URL query
        if (this.search_params.keywords)
          formData.append("keywords", this.search_params.keywords);
        if (this.search_params.make)
          formData.append("make", this.search_params.make);
        if (this.search_params.model)
          formData.append("model", this.search_params.model);
        if (this.search_params.condition)
          formData.append("condition", this.search_params.condition);
        if (this.search_params.fuel)
          formData.append("fuel", this.search_params.fuel);
        if (this.search_params.min_year)
          formData.append("min_year", this.search_params.min_year);
        if (this.search_params.max_year)
          formData.append("max_year", this.search_params.max_year);
        if (this.search_params.min_price)
          formData.append("min_price", this.search_params.min_price);
        if (this.search_params.max_price)
          formData.append("max_price", this.search_params.max_price);
        if (this.search_params.body)
          formData.append("body", this.search_params.body);
        if (this.search_params.transmission)
          formData.append("transmission", this.search_params.transmission);
        if (this.search_params.location)
          formData.append("location", this.search_params.location);
        else formData.append("location", "");
        if (this.search_params.category)
          formData.append("category", this.search_params.category);

        formData.append("status", "");

        const response = await axios.post(`${api}/filter-vehicles`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data;

        if (data.success) {
          this.all_vehicles = data.vehicles;
          console.log("Filtered vehicles:", data.vehicles);

          // Reset to first page when new results come in
          this.current_grid_page = 0;
          this.current_list_page = 0;
        } else {
          console.error("Filter error:", data.error);
          this.all_vehicles = [];
        }
      } catch (error) {
        console.error("Error filtering vehicles:", error);
        this.all_vehicles = [];
      } finally {
        this.page_is_loading = false;
      }
    },

    clearAllFilters() {
      // Navigate to /vehicles without any query parameters
      this.$router.push("/vehicles");
    },

    sortVehicles() {
      if (!this.sort_option) return;

      const sorted = [...this.all_vehicles];

      switch (this.sort_option) {
        case "price_asc":
          sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "price_desc":
          sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "year_asc":
          sorted.sort((a, b) => parseInt(a.year) - parseInt(b.year));
          break;
        case "year_desc":
          sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
          break;
        case "mileage_asc":
          sorted.sort((a, b) => parseFloat(a.mileage) - parseFloat(b.mileage));
          break;
        case "mileage_desc":
          sorted.sort((a, b) => parseFloat(b.mileage) - parseFloat(a.mileage));
          break;
      }

      this.all_vehicles = sorted;
    },

    //pagination methods
    next_grid_page() {
      if (this.current_grid_page < this.total_grid_pages - 1) {
        this.current_grid_page++;
      }
    },
    prev_grid_page() {
      if (this.current_grid_page > 0) {
        this.current_grid_page--;
      }
    },
    select_specific_grid_page(index) {
      this.current_grid_page = index - 1;
    },

    //list pagination
    next_list_page() {
      if (this.current_list_page < this.total_list_pages - 1) {
        this.current_list_page++;
      }
    },
    prev_list_page() {
      if (this.current_list_page > 0) {
        this.current_list_page--;
      }
    },
    select_specific_list_page(index) {
      this.current_list_page = index - 1;
    },
    /*
     *
     * SEO SETUP
     *
     *
     */
    setupSEO() {
      // Helper function to get contact by type
      const getContact = (type) => {
        return this.contacts?.find((c) => c.type === type)?.value || null;
      };

      // Get social media links
      const getSocialLinks = () => {
        const socials =
          this.contacts?.filter((c) => c.type === "social" && c.social_link) ||
          [];
        return socials.map((s) => s.social_link);
      };

      // Format phone number for international use
      const formatPhoneNumber = (phone) => {
        if (!phone) return "+254-XXX-XXXXXX";
        const cleanPhone = phone.replace(/^0/, "");
        return `+254${cleanPhone}`;
      };

      const phone = getContact("phone");
      const email = getContact("email");
      const whatsapp = getContact("whatsapp");
      const socialLinks = getSocialLinks();

      useHead({
        title:
          "Drivate Kenya - Buy & Sell Quality Cars in Kenya | New & Used Vehicles",

        meta: [
          {
            name: "description",
            content:
              "Drivate is Kenya's premier car marketplace. Browse thousands of quality new and used cars for sale across Kenya. Find your dream car with verified dealers, competitive prices, and flexible financing options. Shop sedans, SUVs, trucks, and more from top brands.",
          },
          {
            name: "keywords",
            content:
              "buy cars Kenya, sell cars Kenya, used cars Nairobi, new cars Kenya, car dealership Kenya, vehicles for sale Kenya, affordable cars Kenya, car financing Kenya, Japanese used cars Kenya, SUVs Kenya, sedan Kenya, trucks Kenya, Drivate Kenya, car marketplace Kenya",
          },
          {
            name: "author",
            content: "Drivate Kenya",
          },
          {
            name: "robots",
            content:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            name: "language",
            content: "English",
          },
          {
            name: "revisit-after",
            content: "7 days",
          },
          {
            name: "coverage",
            content: "Kenya",
          },
          {
            name: "distribution",
            content: "global",
          },
          {
            name: "rating",
            content: "general",
          },

          // Open Graph / Facebook Meta Tags
          {
            property: "og:type",
            content: "website",
          },
          {
            property: "og:url",
            content: "https://www.drivate.co.ke/",
          },
          {
            property: "og:title",
            content: "Drivate Kenya - Buy & Sell Quality Cars in Kenya",
          },
          {
            property: "og:description",
            content:
              "Kenya's trusted car marketplace. Browse thousands of quality new and used vehicles. Find sedans, SUVs, trucks from verified dealers with competitive prices and financing options.",
          },
          {
            property: "og:image",
            content: "https://www.drivate.co.ke/og-image.jpg",
          },
          {
            property: "og:image:width",
            content: "1200",
          },
          {
            property: "og:image:height",
            content: "630",
          },
          {
            property: "og:site_name",
            content: "Drivate Kenya",
          },
          {
            property: "og:locale",
            content: "en_KE",
          },

          // Twitter Card Meta Tags
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:url",
            content: "https://www.drivate.co.ke/",
          },
          {
            name: "twitter:title",
            content: "Drivate Kenya - Buy & Sell Quality Cars",
          },
          {
            name: "twitter:description",
            content:
              "Kenya's premier car marketplace. Browse quality new & used vehicles with verified dealers and flexible financing.",
          },
          {
            name: "twitter:image",
            content: "https://www.drivate.co.ke/twitter-image.jpg",
          },

          // Mobile Optimization
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
          },
          {
            name: "theme-color",
            content: "#E6B800",
          },
          {
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
          },

          // Geographic Targeting
          {
            name: "geo.region",
            content: "KE",
          },
          {
            name: "geo.placename",
            content: "Nairobi",
          },
          {
            name: "geo.position",
            content: "-1.286389;36.817223",
          },
          {
            name: "ICBM",
            content: "-1.286389, 36.817223",
          },
        ],

        link: [
          {
            rel: "canonical",
            href: "https://www.drivate.co.ke/",
          },
          {
            rel: "icon",
            type: "image/png",
            href: "/favicon.png",
          },
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
          },
          {
            rel: "alternate",
            hreflang: "en-ke",
            href: "https://www.drivate.co.ke/",
          },
          {
            rel: "alternate",
            hreflang: "x-default",
            href: "https://www.drivate.co.ke/",
          },
        ],

        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Drivate Kenya",
              description:
                "Kenya's premier car marketplace for buying and selling quality new and used vehicles",
              url: "https://www.drivate.co.ke",
              logo: "https://www.drivate.co.ke/logo.png",
              image: "https://www.drivate.co.ke/og-image.jpg",
              telephone: phone ? formatPhoneNumber(phone) : "+254759200998",
              email: email || "geojimagut@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tom Mboya Street",
                addressLocality: "Mombasa",
                addressRegion: "Mombasa County",
                postalCode: "00100",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "4.0435",
                longitude: "39.6682",
              },
              priceRange: "KES 500,000 - KES 20,000,000",
              areaServed: {
                "@type": "Country",
                name: "Kenya",
              },
              sameAs:
                socialLinks.length > 0
                  ? socialLinks
                  : [
                      "https://www.facebook.com/drivate",
                      "https://www.instagram.com/drivate",
                      "https://twitter.com/drivate",
                    ],
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Drivate Kenya",
              url: "https://www.drivate.co.ke",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.drivate.co.ke/vehicles?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Drivate Kenya",
              url: "https://www.drivate.co.ke",
              logo: "https://www.drivate.co.ke/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: phone ? formatPhoneNumber(phone) : "+254759200998",
                  contactType: "Customer Service",
                  areaServed: "KE",
                  availableLanguage: ["English", "Swahili"],
                },
                ...(whatsapp
                  ? [
                      {
                        "@type": "ContactPoint",
                        telephone: formatPhoneNumber(whatsapp),
                        contactType: "Customer Support",
                        contactOption: "TollFree",
                        areaServed: "KE",
                        availableLanguage: ["English", "Swahili"],
                      },
                    ]
                  : []),
              ],
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.drivate.co.ke",
              name: "Drivate Kenya",
              image: "https://www.drivate.co.ke/logo.png",
              telephone: phone ? formatPhoneNumber(phone) : "+254759200998",
              email: email || "geojimagut@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tom Mboya Street",
                addressLocality: "Mombasa",
                addressRegion: "Mombasa County",
                postalCode: "00100",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "4.0435",
                longitude: "39.6682",
              },
              url: "https://www.drivate.co.ke",
              priceRange: "KES 500,000 - KES 20,000,000",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "08:00",
                  closes: "18:00",
                },
              ],
              sameAs:
                socialLinks.length > 0
                  ? socialLinks
                  : [
                      "https://www.facebook.com/drivate",
                      "https://www.instagram.com/drivate",
                      "https://twitter.com/drivate",
                    ],
            }),
          },
        ],

        htmlAttrs: {
          lang: "en",
          dir: "ltr",
        },

        bodyAttrs: {
          class: "drivate-home",
        },
      });
    },
  },
};
</script>
