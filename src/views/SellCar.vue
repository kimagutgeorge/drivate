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
    <!-- body -->
    <div
      class="w-full flex flex-wrap justify-center relative overflow-hidden mt-6 sell"
    >
      <div class="w-[90%] flex justify-center flex-wrap content pb-4">
        <div class="flex w-full justify-center gap-1 self-start">
          <p
            v-for="(item, index) in navigation"
            :key="index"
            @click="tab_in_view = index"
            class="p-1 px-4 font-bold cursor-pointer"
            :class="tab_in_view === index ? 'bg-[#E6B800]' : 'bg-third'"
          >
            {{ item.name }}
          </p>
        </div>

        <!-- response message -->
        <div class="flex w-full justify-center mt-2 self-start">
          <p>{{ response_message }}</p>
        </div>

        <!-- TAB 0: Personal Details -->
        <div
          v-if="tab_in_view === 0"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div class="w-1/2 p-4 half-to-full to-flex">
            <label class="text-sm font-bold">Full Name</label>
            <input
              type="text"
              v-model="form.full_name"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="Full Name"
            />
            <label class="text-sm font-bold">Phone Number</label>
            <input
              type="text"
              v-model="form.phone"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="0700000"
            />
            <label class="text-sm font-bold">Email</label>
            <input
              type="email"
              v-model="form.email"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="someone@example.com"
              maxlength="50"
            />
            <label class="text-sm font-bold">Location</label>
            <div class="relative">
              <input
                type="text"
                class="p-2 w-full border focus:outline-none focus:border-[#3BC57E]"
                placeholder="Search by location name"
                v-model="locationSearchQuery"
                @focus="showLocationDropdown = true"
                @blur="handleLocationBlur"
                @keydown="handleLocationKeydown"
                @input="onLocationSearchInput"
                autocomplete="off"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >
                <i
                  class="fa-solid"
                  :class="
                    showLocationDropdown && filteredLocations.length > 0
                      ? 'fa-angle-up'
                      : 'fa-angle-down'
                  "
                ></i>
              </div>
              <div
                v-if="showLocationDropdown && filteredLocations.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
              >
                <div
                  v-for="(location, index) in filteredLocations"
                  :key="location?.id"
                  :class="[
                    'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                    locationSelectedIndex === index ? 'bg-blue-100' : '',
                  ]"
                  @mousedown="selectLocation(location)"
                  @mouseenter="locationSelectedIndex = index"
                >
                  <div class="font-medium text-gray-900">
                    {{ location?.Location_Name }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  showLocationDropdown &&
                  filteredLocations.length === 0 &&
                  locationSearchQuery
                "
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg p-3 text-gray-500 text-center"
              >
                No location found for "{{ locationSearchQuery }}"
              </div>
            </div>
          </div>
          <div class="w-1/2 border p-4 half-to-full to-flex">
            <h1 class="font-bold text-xl">Fill in your details to continue</h1>
          </div>
          <div class="w-full flex justify-end mt-4">
            <button class="bg-[#E6B800] p-2 px-4" @click="goToNextTab">
              Next <i class="fa-solid fa-angle-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- TAB 1: Basic Info -->
        <div
          v-if="tab_in_view === 1"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div class="w-1/2 p-4 half-to-full to-flex">
            <label class="text-sm font-bold">Make</label>
            <div class="relative mb-4">
              <input
                type="text"
                class="p-2 w-full border focus:outline-none focus:border-[#3BC57E]"
                placeholder="Search by make"
                v-model="brandSearchQuery"
                @focus="showDropdown = true"
                @blur="handleBlur"
                @keydown="handleKeydown"
                @input="onBrandSearchInput"
                autocomplete="off"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >
                <i
                  class="fa-solid"
                  :class="
                    showDropdown && filteredBrands.length > 0
                      ? 'fa-angle-up'
                      : 'fa-angle-down'
                  "
                ></i>
              </div>
              <div
                v-if="showDropdown && filteredBrands.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
              >
                <div
                  v-for="(brand, index) in filteredBrands"
                  :key="brand?.id"
                  :class="[
                    'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                    brandSelectedIndex === index ? 'bg-blue-100' : '',
                  ]"
                  @mousedown="selectBrand(brand)"
                  @mouseenter="brandSelectedIndex = index"
                >
                  <div class="font-medium text-gray-900">
                    {{ brand?.Make_Name }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  showDropdown &&
                  filteredBrands.length === 0 &&
                  brandSearchQuery
                "
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg p-3 text-gray-500 text-center"
              >
                No make found for "{{ brandSearchQuery }}"
              </div>
            </div>

            <label class="text-sm font-bold">Model</label>
            <div class="relative mb-4">
              <input
                type="text"
                class="p-2 w-full border focus:outline-none focus:border-[#3BC57E]"
                :placeholder="
                  form.make_id ? 'Search by model' : 'Select a make first'
                "
                v-model="modelSearchQuery"
                :disabled="!form.make_id"
                @focus="showModelDropdown = true"
                @blur="handleModelBlur"
                @keydown="handleModelKeydown"
                @input="onModelSearchInput"
                autocomplete="off"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >
                <i
                  class="fa-solid"
                  :class="
                    showModelDropdown && filteredModels.length > 0
                      ? 'fa-angle-up'
                      : 'fa-angle-down'
                  "
                ></i>
              </div>
              <div
                v-if="showModelDropdown && filteredModels.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
              >
                <div
                  v-for="(model, index) in filteredModels"
                  :key="model?.id"
                  :class="[
                    'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                    modelSelectedIndex === index ? 'bg-blue-100' : '',
                  ]"
                  @mousedown="selectModel(model)"
                  @mouseenter="modelSelectedIndex = index"
                >
                  <div class="font-medium text-gray-900">
                    {{ model?.Model_Name || model?.name }}
                  </div>
                </div>
              </div>
              <div
                v-if="
                  showModelDropdown &&
                  filteredModels.length === 0 &&
                  modelSearchQuery &&
                  form.make_id
                "
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg p-3 text-gray-500 text-center"
              >
                No model found for "{{ modelSearchQuery }}"
              </div>
            </div>

            <label class="text-sm font-bold">Year</label>
            <select v-model="form.year" class="p-2 w-full border mb-4 mt-1">
              <option value="" selected disabled>Pick a year</option>
              <option v-for="(year, index) in years" :key="index" :value="year">
                {{ year }}
              </option>
            </select>

            <label class="text-sm font-bold">Mileage</label>
            <input
              type="number"
              v-model="form.mileage"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="Mileage"
              min="0"
            />

            <label class="text-sm font-bold">Selling Price</label>
            <input
              type="number"
              v-model="form.price"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="Your price"
              min="0"
            />
          </div>
          <div class="w-1/2 border p-4 half-to-full to-flex">
            <h1 class="font-bold text-xl">Fill in basic car details</h1>
            <!-- Debug: show selected make and available models -->
            <!-- <p class="text-xs text-gray-400 mt-2">Selected make_id: {{ form.make_id }}</p>
            <p class="text-xs text-gray-400">Models available: {{ filteredModels.length }}</p> -->
          </div>
          <div class="w-full flex justify-end mt-4 gap-2">
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view--">
              <i class="fa-solid fa-angle-left mr-2"></i>
              Previous
            </button>
            <button class="bg-[#E6B800] p-2 px-4" @click="goToNextTab">
              Next <i class="fa-solid fa-angle-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- TAB 2: Upload Pictures -->
        <div
          v-if="tab_in_view === 2"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div
            class="w-1/2 p-4 flex flex-col justify-center half-to-full to-flex"
          >
            <label class="text-sm font-bold"
              >Select Images (Max 6, 3MB each)</label
            >
            <input
              ref="fileInput"
              type="file"
              class="p-2 w-full border mb-4 mt-1"
              accept="image/*"
              multiple
              @change="handleImageUpload"
            />
          </div>
          <div class="w-1/2 border p-4 half-to-full to-flex">
            <div
              v-if="imagePreviews.length > 0"
              class="grid grid-cols-3 gap-2 mt-4"
            >
              <div
                v-for="(image, index) in imagePreviews"
                :key="index"
                class="relative w-full h-32 border rounded overflow-hidden"
              >
                <button
                  @click="removeImage(index)"
                  class="absolute top-1 right-1 bg-white rounded-full p-1 px-2 shadow text-red-500 hover:text-red-700 z-10"
                >
                  <i class="fas fa-times"></i>
                </button>
                <img
                  :src="image"
                  alt="Preview"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
            <div v-if="imagePreviews.length < 1" class="w-full">
              <h1 class="font-bold text-xl">Upload your car images</h1>
              <ul class="mt-4 ml-5">
                <li class="list-disc">Front view</li>
                <li class="list-disc">Rear view</li>
                <li class="list-disc">Side views</li>
                <li class="list-disc">Interior dashboard</li>
                <li class="list-disc">Engine</li>
                <li class="list-disc">Any damage areas (if applicable)</li>
              </ul>
            </div>
          </div>
          <div class="w-full flex justify-end mt-4 gap-2">
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view--">
              <i class="fa-solid fa-angle-left mr-2"></i>
              Previous
            </button>
            <button class="bg-[#E6B800] p-2 px-4" @click="goToNextTab">
              Next <i class="fa-solid fa-angle-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- TAB 3: Car Details -->
        <div
          v-if="tab_in_view === 3"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div class="w-1/2 p-4 flex flex-wrap h-fit half-to-full to-flex">
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Fuel type</label>
              <select
                v-model="form.fuel_type"
                class="p-2 w-full border mb-4 mt-1"
              >
                <option value="" selected disabled>Fuel type</option>
                <option
                  v-for="(type, index) in fuel_types"
                  :key="index"
                  :value="type.name"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Body type</label>
              <div class="relative">
                <input
                  type="text"
                  class="p-2 w-full border focus:outline-none focus:border-[#3BC57E]"
                  placeholder="Search by body type"
                  v-model="bodySearchQuery"
                  @focus="showBodyDropdown = true"
                  @blur="handleBodyBlur"
                  @keydown="handleBodyKeydown"
                  @input="onBodySearchInput"
                  autocomplete="off"
                />
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <i
                    class="fa-solid"
                    :class="
                      showBodyDropdown && filteredBodies.length > 0
                        ? 'fa-angle-up'
                        : 'fa-angle-down'
                    "
                  ></i>
                </div>
                <div
                  v-if="showBodyDropdown && filteredBodies.length > 0"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
                >
                  <div
                    v-for="(body, index) in filteredBodies"
                    :key="body?.id"
                    :class="[
                      'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                      bodySelectedIndex === index ? 'bg-blue-100' : '',
                    ]"
                    @mousedown="selectBody(body)"
                    @mouseenter="bodySelectedIndex = index"
                  >
                    <div class="font-medium text-gray-900">
                      {{ body?.Body_style }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    showBodyDropdown &&
                    filteredBodies.length === 0 &&
                    bodySearchQuery
                  "
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg p-3 text-gray-500 text-center"
                >
                  No body type found for "{{ bodySearchQuery }}"
                </div>
              </div>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Transmission</label>
              <select
                v-model="form.transmission"
                class="p-2 w-full border mb-4 mt-1"
              >
                <option value="" selected disabled>Transmission type</option>
                <option
                  v-for="(transmission, index) in transmissions"
                  :key="index"
                  :value="transmission.name"
                >
                  {{ transmission.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Colors</label>
              <select v-model="form.color" class="p-2 w-full border mb-4 mt-1">
                <option value="" selected disabled>Pick a color</option>
                <option
                  v-for="(color, index) in colors"
                  :key="index"
                  :value="color.name"
                >
                  {{ color.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Steering</label>
              <select
                v-model="form.steering"
                class="p-2 w-full border mb-4 mt-1"
              >
                <option value="" selected disabled>Steering position</option>
                <option
                  v-for="(position, index) in steering_positions"
                  :key="index"
                  :value="position.name"
                >
                  {{ position.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Drive Type</label>
              <select
                v-model="form.drive_type"
                class="p-2 w-full border mb-4 mt-1"
              >
                <option value="" selected disabled>Drive type</option>
                <option
                  v-for="(drive, index) in drive_types"
                  :key="index"
                  :value="drive.name"
                >
                  {{ drive.name }}
                </option>
              </select>
            </div>
            <div class="w-full">
              <label class="text-sm font-bold">Description</label>
              <textarea
                v-model="form.description"
                class="p-2 w-full border mb-4 mt-1 h-[120px]"
                placeholder="Description and additional info"
                maxlength="250"
              ></textarea>
            </div>
          </div>
          <div
            class="w-1/2 border p-4 flex flex-wrap gap-2 max-h-[60vh] overflow-y-scroll custom-scrollbar half-to-full to-flex"
          >
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="w-[48%] !h-fit flex flex-nowrap py-2 border-b to-full-smaller"
            >
              <input
                type="checkbox"
                class="w-fit"
                :checked="isFeatureSelected(feature.id)"
                @change="toggleFeature(feature.id)"
              />
              <span class="ml-2">{{ feature.Feature_Name }}</span>
            </div>
          </div>
          <div class="w-full flex justify-end mt-4 gap-2">
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view--">
              <i class="fa-solid fa-angle-left mr-2"></i>
              Previous
            </button>
            <button @click="add_vehicle" class="bg-theme-blue p-2 px-4">
              Submit <i class="fa-regular fa-paper-plane ml-2"></i>
            </button>
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
import { useHead } from "@vueuse/head";

export default {
  name: "SellCar",
  props: {
    /* brands: Array,
    body_styles: Array,
    models: Array, */
    other_categories: Array,
    price_ranges: Array,
    /* locations: Array, */
    contacts: Array,
  },
  components: { Navbar, Footer, Spinner },
  data() {
    return {
      STRAPI_BASE_URL: import.meta.env.VITE_STRAPI_BASE_URL,
      page_is_loading: true,
      tab_in_view: 0,
      imagePreviews: [],
      imageFiles: [],
      response_message: "",
      brands: [],
      body_styles: [],
      models: [],
      locations: [],

      form: {
        full_name: "",
        phone: "",
        email: "",
        location: "",
        make_id: "",
        model_id: "",
        year: "",
        mileage: "",
        price: "",
        fuel_type: "",
        body_id: "",
        transmission: "",
        color: "",
        steering: "",
        drive_type: "",
        description: "",
      },

      selectedFeatures: new Set(),

      fuel_types: [
        { name: "Petrol" },
        { name: "Diesel" },
        { name: "Hybrid" },
        { name: "Electric" },
        { name: "Other" },
      ],
      colors: [
        { name: "White" },
        { name: "Black" },
        { name: "Silver" },
        { name: "Grey" },
        { name: "Blue" },
        { name: "Red" },
        { name: "Green" },
        { name: "Yellow" },
        { name: "Gold" },
        { name: "Other" },
      ],
      drive_types: [
        { name: "4WD (Four-Wheel Drive)" },
        { name: "FWD (Front-Wheel Drive)" },
        { name: "RWD (Rear-Wheel Drive)" },
        { name: "AWD (All-Wheel Drive)" },
        { name: "Other" },
      ],
      steering_positions: [
        { name: "Right" },
        { name: "Left" },
        { name: "Center" },
        { name: "Other" },
      ],
      transmissions: [
        { name: "Automatic" },
        { name: "Manual" },
        { name: "CVT" },
        { name: "Tiptronic" },
        { name: "Other" },
      ],
      features: [],
      years: [],
      navigation: [
        { name: "Personal Details" },
        { name: "Basic Info." },
        { name: "Upload Pictures" },
        { name: "Car Details" },
      ],

      // Brand dropdown
      brandSearchQuery: "",
      showDropdown: false,
      brandSelectedIndex: -1,

      // Model dropdown
      modelSearchQuery: "",
      showModelDropdown: false,
      modelSelectedIndex: -1,

      // Body dropdown
      bodySearchQuery: "",
      showBodyDropdown: false,
      bodySelectedIndex: -1,

      // Location dropdown
      locationSearchQuery: "",
      showLocationDropdown: false,
      locationSelectedIndex: -1,

      dropdownTimeouts: [],
    };
  },

  async mounted() {
    this.setupSEO();
    this.generateYears();
    this.page_is_loading = true;

    try {
      await Promise.race([
        Promise.all([this.getFeatures(), this.getBodyStyles(), this.getMakes(), this.getModels(), this.getLocations()]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
        ),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
      this.response_message = "Failed to load some data. Please refresh the page.";
    } finally {
      this.page_is_loading = false;
    }

    // Debug: log the first model to understand the structure
    if (this.models && this.models.length > 0) {
      /* console.log("Sample model structure:", JSON.stringify(this.models[0], null, 2)); */
    }
    if (this.brands && this.brands.length > 0) {
      /* console.log("Sample brand structure:", JSON.stringify(this.brands[0], null, 2)); */
    }
  },

  beforeUnmount() {
    this.dropdownTimeouts.forEach((timeout) => clearTimeout(timeout));
  },

  computed: {
    filteredBrands() {
      if (!Array.isArray(this.brands)) return [];
      if (!this.brandSearchQuery.trim()) return this.brands.slice(0, 50);
      return this.brands
        .filter((brand) =>
          brand?.Make_Name?.toLowerCase().includes(this.brandSearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },

    filteredModels() {
      if (!Array.isArray(this.models) || !this.form.make_id) return [];

      const makeId = this.form.make_id;

      const brandModels = this.models.filter((model) => {
        // Try all common Strapi relation structures
        return (
          model?.make?.id === makeId ||           // populated relation: { make: { id: X } }
          model?.make_id === makeId ||             // flat foreign key
          model?.Make?.id === makeId ||            // capitalised relation name
          model?.make?.data?.id === makeId         // Strapi v4 style: { make: { data: { id: X } } }
        );
      });

      if (!this.modelSearchQuery.trim()) return brandModels.slice(0, 50);

      return brandModels
        .filter((model) =>
          (model?.Model_Name || model?.name)
            ?.toLowerCase()
            .includes(this.modelSearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },

    // ✅ Fixed: search by Body_style (Strapi field) not name
    filteredBodies() {
      if (!Array.isArray(this.body_styles)) return [];
      if (!this.bodySearchQuery.trim()) return this.body_styles.slice(0, 50);
      return this.body_styles
        .filter((body) =>
          body?.Body_style?.toLowerCase().includes(this.bodySearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },

    filteredLocations() {
      if (!Array.isArray(this.locations)) return [];
      if (!this.locationSearchQuery.trim()) return this.locations.slice(0, 50);
      return this.locations
        .filter((location) =>
          location?.Location_Name?.toLowerCase().includes(this.locationSearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },
  },

  methods: {
    async getMakes() {
      try {
        const response = await fetch(import.meta.env.VITE_MAKES_ENDPOINT);
        const data = await response.json();

          this.brands = data.data;
        

      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    async getLocations() {
      try {
        const response = await fetch(import.meta.env.VITE_LOCATIONS_ENDPOINT);
        
        const data = await response.json();
          this.locations = data.data;
      } catch (error) {
        console.error("Error fetching locations:", error);
        this.locations = [];
        throw error;
      }
    },
     async getBodyStyles() {
      try {
        const reponse = await fetch(import.meta.env.VITE_BODY_STYLES_ENDPOINT);
        const data = await reponse.json();

          this.body_styles = data.data; // Extract the array
        
      } catch (error) {
        console.error("Error fetching body styles:", error);
      }
    },
    async getModels() {
      try {
        const response = await fetch(import.meta.env.VITE_MODELS_ENDPOINT);
        const data = await response.json();

        this.models = data.data;
      
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      this.years = [];
      for (let year = currentYear; year >= 2000; year--) {
        this.years.push(year);
      }
    },

    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      if (files.length > 6) {
        this.response_message = "You can only upload up to 6 images.";
        event.target.value = "";
        return;
      }
      const maxSize = 3 * 1024 * 1024;
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith("image/")) {
          this.response_message = `File ${i + 1} is not a valid image.`;
          event.target.value = "";
          return;
        }
        if (files[i].size > maxSize) {
          this.response_message = `Image ${i + 1} exceeds the 3MB size limit.`;
          event.target.value = "";
          return;
        }
      }
      this.imagePreviews = [];
      this.imageFiles = files;
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },

    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      const dt = new DataTransfer();
      this.imageFiles.forEach((file, i) => {
        if (i !== index) dt.items.add(file);
      });
      if (this.$refs.fileInput) {
        this.$refs.fileInput.files = dt.files;
      }
      this.imageFiles = Array.from(dt.files);
    },

    validateTab(tabIndex) {
      switch (tabIndex) {
        case 0:
          if (!this.form.full_name.trim()) { this.response_message = "Please enter your full name."; return false; }
          if (!this.form.phone.trim()) { this.response_message = "Please enter your phone number."; return false; }
          if (!this.form.email.trim()) { this.response_message = "Please enter your email."; return false; }
          if (!this.form.location) { this.response_message = "Please select a location."; return false; }
          return true;
        case 1:
          if (!this.form.make_id) { this.response_message = "Please select a make."; return false; }
          if (!this.form.model_id) { this.response_message = "Please select a model."; return false; }
          if (!this.form.year) { this.response_message = "Please select a year."; return false; }
          if (!this.form.mileage) { this.response_message = "Please enter mileage."; return false; }
          if (!this.form.price) { this.response_message = "Please enter selling price."; return false; }
          return true;
        case 2:
          if (this.imagePreviews.length === 0) { this.response_message = "Please upload at least one image."; return false; }
          return true;
        default:
          return true;
      }
    },

    goToNextTab() {
      this.response_message = "";
      if (this.validateTab(this.tab_in_view)) {
        this.tab_in_view++;
      }
    },

    async getFeatures() {
      try {
        const response = await fetch(
          `${this.STRAPI_BASE_URL}/api/features?fields[0]=id&fields[1]=Feature_Name`
        );
        const data = await response.json();
        this.features = data.data;
      } catch (error) {
        console.error("Failed to load features:", error);
        this.features = [];
      }
    },

    // ── Brand ──────────────────────────────────────────
    selectBrand(brand) {
      this.form.make_id = brand.id;
      this.brandSearchQuery = brand.Make_Name;
      this.showDropdown = false;
      this.brandSelectedIndex = -1;
      // Reset model when make changes
      this.form.model_id = "";
      this.modelSearchQuery = "";
    },

    onBrandSearchInput() {
      this.showDropdown = true;
      this.brandSelectedIndex = -1;
      // Clear make_id if user edits the field manually
      if (this.form.make_id) {
        const selected = this.brands.find((b) => b.id === this.form.make_id);
        if (!selected || selected.Make_Name !== this.brandSearchQuery) {
          this.form.make_id = "";
          this.form.model_id = "";
          this.modelSearchQuery = "";
        }
      }
    },

    handleBlur() {
      const t = setTimeout(() => { this.showDropdown = false; this.brandSelectedIndex = -1; }, 200);
      this.dropdownTimeouts.push(t);
    },

    handleKeydown(event) {
      if (!this.showDropdown) { this.showDropdown = true; return; }
      switch (event.key) {
        case "ArrowDown": event.preventDefault(); this.brandSelectedIndex = Math.min(this.brandSelectedIndex + 1, this.filteredBrands.length - 1); break;
        case "ArrowUp": event.preventDefault(); this.brandSelectedIndex = Math.max(this.brandSelectedIndex - 1, -1); break;
        case "Enter": event.preventDefault(); if (this.brandSelectedIndex >= 0 && this.filteredBrands[this.brandSelectedIndex]) { this.selectBrand(this.filteredBrands[this.brandSelectedIndex]); } break;
        case "Escape": this.showDropdown = false; this.brandSelectedIndex = -1; break;
      }
    },

    // ── Model ──────────────────────────────────────────
    selectModel(model) {
      this.form.model_id = model.id;
      this.modelSearchQuery = model.Model_Name || model.name;
      this.showModelDropdown = false;
      this.modelSelectedIndex = -1;
    },

    onModelSearchInput() {
      if (!this.form.make_id) return;
      this.showModelDropdown = true;
      this.modelSelectedIndex = -1;
      if (this.form.model_id) {
        const selected = this.models.find((m) => m.id === this.form.model_id);
        if (!selected || (selected.Model_Name || selected.name) !== this.modelSearchQuery) {
          this.form.model_id = "";
        }
      }
    },

    handleModelBlur() {
      const t = setTimeout(() => { this.showModelDropdown = false; this.modelSelectedIndex = -1; }, 200);
      this.dropdownTimeouts.push(t);
    },

    handleModelKeydown(event) {
      if (!this.form.make_id) return;
      if (!this.showModelDropdown) { this.showModelDropdown = true; return; }
      switch (event.key) {
        case "ArrowDown": event.preventDefault(); this.modelSelectedIndex = Math.min(this.modelSelectedIndex + 1, this.filteredModels.length - 1); break;
        case "ArrowUp": event.preventDefault(); this.modelSelectedIndex = Math.max(this.modelSelectedIndex - 1, -1); break;
        case "Enter": event.preventDefault(); if (this.modelSelectedIndex >= 0 && this.filteredModels[this.modelSelectedIndex]) { this.selectModel(this.filteredModels[this.modelSelectedIndex]); } break;
        case "Escape": this.showModelDropdown = false; this.modelSelectedIndex = -1; break;
      }
    },

    // ── Body ──────────────────────────────────────────
    selectBody(body) {
      this.form.body_id = body.id;
      this.bodySearchQuery = body.Body_style;
      this.showBodyDropdown = false;
      this.bodySelectedIndex = -1;
    },

    onBodySearchInput() {
      this.showBodyDropdown = true;
      this.bodySelectedIndex = -1;
      if (this.form.body_id) {
        const selected = this.body_styles.find((b) => b.id === this.form.body_id);
        if (!selected || selected.Body_style !== this.bodySearchQuery) {
          this.form.body_id = "";
        }
      }
    },

    handleBodyBlur() {
      const t = setTimeout(() => { this.showBodyDropdown = false; this.bodySelectedIndex = -1; }, 200);
      this.dropdownTimeouts.push(t);
    },

    handleBodyKeydown(event) {
      if (!this.showBodyDropdown) { this.showBodyDropdown = true; return; }
      switch (event.key) {
        case "ArrowDown": event.preventDefault(); this.bodySelectedIndex = Math.min(this.bodySelectedIndex + 1, this.filteredBodies.length - 1); break;
        case "ArrowUp": event.preventDefault(); this.bodySelectedIndex = Math.max(this.bodySelectedIndex - 1, -1); break;
        case "Enter": event.preventDefault(); if (this.bodySelectedIndex >= 0 && this.filteredBodies[this.bodySelectedIndex]) { this.selectBody(this.filteredBodies[this.bodySelectedIndex]); } break;
        case "Escape": this.showBodyDropdown = false; this.bodySelectedIndex = -1; break;
      }
    },

    // ── Location ──────────────────────────────────────
    selectLocation(location) {
      this.form.location = location.id;
      this.locationSearchQuery = location.Location_Name;
      this.showLocationDropdown = false;
      this.locationSelectedIndex = -1;
    },

    onLocationSearchInput() {
      this.showLocationDropdown = true;
      this.locationSelectedIndex = -1;
      if (this.form.location) {
        const selected = this.locations.find((l) => l.id === this.form.location);
        if (!selected || selected.Location_Name !== this.locationSearchQuery) {
          this.form.location = "";
        }
      }
    },

    handleLocationBlur() {
      const t = setTimeout(() => { this.showLocationDropdown = false; this.locationSelectedIndex = -1; }, 200);
      this.dropdownTimeouts.push(t);
    },

    handleLocationKeydown(event) {
      if (!this.showLocationDropdown) { this.showLocationDropdown = true; return; }
      switch (event.key) {
        case "ArrowDown": event.preventDefault(); this.locationSelectedIndex = Math.min(this.locationSelectedIndex + 1, this.filteredLocations.length - 1); break;
        case "ArrowUp": event.preventDefault(); this.locationSelectedIndex = Math.max(this.locationSelectedIndex - 1, -1); break;
        case "Enter": event.preventDefault(); if (this.locationSelectedIndex >= 0 && this.filteredLocations[this.locationSelectedIndex]) { this.selectLocation(this.filteredLocations[this.locationSelectedIndex]); } break;
        case "Escape": this.showLocationDropdown = false; this.locationSelectedIndex = -1; break;
      }
    },

    // ── Features ──────────────────────────────────────
    isFeatureSelected(featureId) {
      return this.selectedFeatures.has(featureId);
    },

    toggleFeature(featureId) {
      if (this.selectedFeatures.has(featureId)) {
        this.selectedFeatures.delete(featureId);
      } else {
        this.selectedFeatures.add(featureId);
      }
    },

    // ── Submit ────────────────────────────────────────
    async add_vehicle() {
      const requiredFields = {
        full_name: "Full Name",
        phone: "Phone Number",
        email: "Email",
        location: "Location",
        make_id: "Make",
        model_id: "Model",
        year: "Year",
        mileage: "Mileage",
        price: "Selling Price",
        fuel_type: "Fuel Type",
        body_id: "Body Type",
        transmission: "Transmission",
        color: "Color",
        steering: "Steering Position",
        drive_type: "Drive Type",
      };

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!this.form[field]) {
          this.response_message = `Please fill in the ${label} field.`;
          return;
        }
      }

      if (this.imageFiles.length === 0) {
        this.response_message = "Please upload at least one image.";
        return;
      }

      try {
        this.page_is_loading = true;

        // Step 1: Upload images
        const imageFormData = new FormData();
        this.imageFiles.forEach((file) => {
          imageFormData.append("files", file);
        });

        const uploadResponse = await fetch(
          `${import.meta.env.VITE_STRAPI_BASE_URL}/api/upload`,
          { method: "POST", body: imageFormData }
        );
        const uploadedImages = await uploadResponse.json();
        const imageIds = uploadedImages.map((img) => img.id);

        // Step 2: Submit vehicle data
        const response = await fetch(import.meta.env.VITE_SELLING_REQUEST_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              Seller_Name: this.form.full_name,
              Selling_Price: String(this.form.price),
              Mileage: String(this.form.mileage),
              Steering_Wheel: this.form.steering,
              Fuel: this.form.fuel_type,
              Color: this.form.color,
              Location: this.locationSearchQuery,
              Drive: this.form.drive_type,
              Transmission: this.form.transmission,
              Registration_Year: String(this.form.year),
              Body_Style: this.bodySearchQuery,
              Make: this.brandSearchQuery,
              Model: this.modelSearchQuery,
              Features: Array.from(this.selectedFeatures).join(", "),
              Images: imageIds,
            },
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.response_message = "Vehicle submitted successfully!";
          this.resetForm();
          this.tab_in_view = 0;
        } else {
          this.response_message = data?.error?.message || "Failed to submit. Please try again.";
        }
      } catch (error) {
        console.error("Error submitting vehicle:", error);
        this.response_message = "An error occurred. Please try again.";
      } finally {
        this.page_is_loading = false;
      }
    },

    resetForm() {
      this.form = {
        full_name: "", phone: "", email: "", location: "",
        make_id: "", model_id: "", year: "", mileage: "", price: "",
        fuel_type: "", body_id: "", transmission: "", color: "",
        steering: "", drive_type: "", description: "",
      };
      this.selectedFeatures = new Set();
      this.imagePreviews = [];
      this.imageFiles = [];
      this.brandSearchQuery = "";
      this.modelSearchQuery = "";
      this.bodySearchQuery = "";
      this.locationSearchQuery = "";
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
    },

    setupSEO() {
      const getContact = (type) => this.contacts?.find((c) => c.type === type)?.value || null;
      const getSocialLinks = () => (this.contacts?.filter((c) => c.type === "social" && c.social_link) || []).map((s) => s.social_link);
      const formatPhoneNumber = (phone) => { if (!phone) return "+254-XXX-XXXXXX"; return `+254${phone.replace(/^0/, "")}`; };

      const phone = getContact("phone");
      const email = getContact("email");
      const whatsapp = getContact("whatsapp");
      const socialLinks = getSocialLinks();

      useHead({
        title: "Drivate Kenya - Sell Your Car | Get the Best Price",
        meta: [
          { name: "description", content: "Sell your car on Drivate Kenya. List your vehicle easily and reach thousands of buyers across Kenya." },
          { name: "robots", content: "index, follow" },
          { property: "og:type", content: "website" },
          { property: "og:url", content: "https://www.drivate.co.ke/sell" },
          { property: "og:title", content: "Sell Your Car - Drivate Kenya" },
          { property: "og:site_name", content: "Drivate Kenya" },
          { name: "theme-color", content: "#E6B800" },
          { name: "geo.region", content: "KE" },
          { name: "geo.placename", content: "Nairobi" },
        ],
        link: [
          { rel: "canonical", href: "https://www.drivate.co.ke/sell" },
          { rel: "icon", type: "image/png", href: "/favicon.png" },
        ],
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Drivate Kenya",
              url: "https://www.drivate.co.ke",
              telephone: phone ? formatPhoneNumber(phone) : "+254759200998",
              email: email || "info@drivate.co.ke",
              sameAs: socialLinks.length > 0 ? socialLinks : ["https://www.facebook.com/drivate"],
            }),
          },
        ],
        htmlAttrs: { lang: "en", dir: "ltr" },
      });
    },
  },
};
</script>

<!-- <style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
</style> -->