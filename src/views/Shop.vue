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
                class="flex flex-nowrap gap-2 p-2 hover:bg-white category"
                style="border-bottom: 1px solid #f4f5f4"
              >
                <router-link
                  :to="`/vehicles/${is_make}/${slugify(make?.name)}`"
                  class="w-full flex gap-2 flex-nowrap inner-cat"
                >
                  <img
                    :src="make?.image_url"
                    class="w-[30px] min-w-[30px] h-fit"
                  />
                  <p class="font-semibold cursor-pointer">{{ make?.name }}</p>
                </router-link>
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
              class="flex flex-nowrap gap-2 py-2"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <router-link
                :to="`/vehicles/${is_model}/${slugify(model?.model_name)}`"
              >
                <span
                  class="font-semibold cursor-pointer hover:underline text-sm"
                >
                  {{ model?.make_name }} {{ model?.model_name }}
                </span>
              </router-link>
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
                class="flex flex-nowrap gap-2 p-2 hover:bg-white category"
                style="border-bottom: 1px solid #f4f5f4"
              >
                <router-link
                  :to="`/vehicles/${is_body_type}/${slugify(type?.name)}`"
                  class="w-full flex gap-2 flex-nowrap inner-cat"
                >
                  <img
                    :src="type?.image_url"
                    class="w-[30px] min-w-[30px] filter grayscale h-fit"
                  />
                  <p class="font-semibold cursor-pointer">{{ type?.name }}</p>
                </router-link>
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
                class="flex flex-nowrap gap-2 py-2 category"
                style="border-bottom: 1px solid #f4f5f4"
              >
                <img
                  src="/icons/coin.png"
                  class="w-[20px] h-[20px] h-fit to-hide"
                />
                <span
                  class="font-semibold cursor-pointer hover:underline ml-2 text-sm"
                  >{{ price?.price }}</span
                >
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
                class="flex flex-nowrap gap-2 py-2 category"
                style="border-bottom: 1px solid #f4f5f4"
              >
                <i class="fa-solid fa-location-dot text-gray-600"></i>
                <span
                  class="font-semibold cursor-pointer hover:underline ml-2 text-sm"
                  >{{ location?.location_name }}</span
                >
              </div>
            </div>
          </div>

          <div class="w-full mt-8 heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Other Categories
            </h4>
            <div class="w-full to-flex">
              <div
                v-for="(category, index) in other_categories"
                :key="index"
                class="flex flex-nowrap gap-2 py-2 category"
                style="border-bottom: 1px solid #f4f5f4"
              >
                <img
                  src="/icons/category.png"
                  class="w-[18px] h-[18px] h-fit"
                />
                <span
                  class="font-semibold cursor-pointer hover:underline ml-2 text-sm"
                  >{{ category?.category }}</span
                >
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
            <!-- sort -->
            <div class="w-full bg-third p-4 flex flex-nowrap">
              <p class="text-sm font-semibold">Sort By:</p>
              <select class="ml-1 h-fit">
                <option>None</option>
                <option>Price - Low to high</option>
                <option>Price - High to low</option>
                <option>Year - Old to new</option>
                <option>Mileage - Low to high</option>
                <option>Mileage - High to low</option>
              </select>
              <div
                @click="is_grid_view = true"
                class="w-[24px] h-[24px] flex flex-wrap gap-[1px] cursor-pointer ml-2 to-hide"
              >
                <div
                  v-for="i in 4"
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
                  class="h-[6px] w-full rounded-[2px]"
                  :class="!is_grid_view ? 'bg-theme-yellow' : 'bg-black'"
                ></div>
              </div>
            </div>
          </div>
          <!-- grid view -->
          <div
            v-if="is_grid_view"
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
          <div v-if="!is_grid_view" class="w-full flex flex-wrap mt-6 gap-2">
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
                  {{ current_list_page }}</span
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

      // data arrays
      all_vehicles: [],
      is_make: "make",
      is_body_type: "body",
      is_brand: "brand",
      is_model: "model",

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
    document.title = "Drivate - All vehicles";
    try {
      await Promise.race([
        Promise.all([
          // this.getMakes(),
          this.fetchVehicles(),
          // this.getBodyStyles(),
          // this.getModels(),
          // this.getLocations(),
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
  },
  /* methods */
  methods: {
    slugify,
    async getLocations() {
      try {
        const response = await axios.get(`${api}/get-locations`);
        const data = response.data;

        console.log("locations response:", data); // Debug log

        if (data.success) {
          this.locations = data.locations; // Extract the array
        } else {
          this.locations = []; // Fallback to empty array
          this.show_error(data.error);
        }
      } catch (error) {
        this.show_error(error);
        this.locations = []; // Set to empty array on error
      }
    },
    async fetchVehicles() {
      try {
        const response = await axios.get(`${api}/get-vehicles`);

        const data = response.data;

        // Check if the request was successful
        if (data.success) {
          this.all_vehicles = data.vehicles;

          // this.all_loan_tracker = data.vehicles;

          // Hide message after 3 seconds
          setTimeout(() => {
            this.response_is_visible = false;
          }, 3000);
        } else {
          // Handle API error response
          throw new Error(data.error || "Failed to fetch vehicles");
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // Initialize empty array on error
        this.all_vehicles = [];
      }
    },
    // get makes
    async getMakes() {
      try {
        const response = await axios.get(`${api}/get-makes`);
        const data = response.data;

        console.log("Full response:", data); // Debug log

        if (data.success) {
          this.brands = data.brands;
        } else {
          console.log("Error fetching brands");
        }

        console.log("brands array:", this.brands); // Debug log
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    //get body styles
    async getBodyStyles() {
      try {
        const response = await axios.get(`${api}/get-body-styles`);
        const data = response.data;

        console.log("Full response:", data); // Debug log

        if (data.success) {
          this.body_styles = data.body_styles; // Extract the array
        } else {
          this.body_styles = []; // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching body styles:", error);
      }
    },
    async getModels() {
      try {
        const response = await axios.get(`${api}/get-models`);
        const data = response.data;

        if (data.success) {
          this.models = data.models; // Extract the array
        } else {
          this.models = []; // Fallback to empty array
          console.warn("No models found in response");
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
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
  },
};
</script>
