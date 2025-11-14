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
              type="number"
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
                  :key="location?.location_id || location?.id"
                  :class="[
                    'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                    locationSelectedIndex === index ? 'bg-blue-100' : '',
                  ]"
                  @mousedown="selectLocation(location)"
                  @mouseenter="locationSelectedIndex = index"
                >
                  <div class="font-medium text-gray-900">
                    {{ location?.location_name }}
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
                  :key="brand?.make_id || brand?.id"
                  :class="[
                    'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                    brandSelectedIndex === index ? 'bg-blue-100' : '',
                  ]"
                  @mousedown="selectBrand(brand)"
                  @mouseenter="brandSelectedIndex = index"
                >
                  <div class="font-medium text-gray-900">
                    {{ brand?.name }}
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
                  :key="model?.model_id || model?.id"
                  :class="[
                    'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                    modelSelectedIndex === index ? 'bg-blue-100' : '',
                  ]"
                  @mousedown="selectModel(model)"
                  @mouseenter="modelSelectedIndex = index"
                >
                  <div class="font-medium text-gray-900">
                    {{ model?.model_name || model?.name }}
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
                    :key="body?.body_id || body?.id"
                    :class="[
                      'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                      bodySelectedIndex === index ? 'bg-blue-100' : '',
                    ]"
                    @mousedown="selectBody(body)"
                    @mouseenter="bodySelectedIndex = index"
                  >
                    <div class="font-medium text-gray-900">
                      {{ body?.name }}
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
                :checked="isFeatureSelected(feature.feature_id || feature.id)"
                @change="toggleFeature(feature.feature_id || feature.id)"
              />
              <span class="ml-2">{{ feature.name }}</span>
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
import { api } from "../utils/store";
import axios from "axios";
import { useHead } from "@vueuse/head";

export default {
  name: "SellCar",
  props: {
    brands: Array,
    body_styles: Array,
    models: Array,
    other_categories: Array,
    price_ranges: Array,
    locations: Array,
    contacts: Array,
  },
  components: { Navbar, Footer, Spinner },
  data() {
    return {
      page_is_loading: true,
      tab_in_view: 0,
      imagePreviews: [],
      imageFiles: [],
      response_message: "",

      // Form data
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

      // Feature selection
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
      body_types: [],
      features: [],
      years: [],
      navigation: [
        { name: "Personal Details" },
        { name: "Basic Info." },
        { name: "Upload Pictures" },
        { name: "Car Details" },
      ],

      // API Data
      // brands: [],
      // models: [],
      // locations: [],

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

      // Timeout refs for cleanup
      dropdownTimeouts: [],

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

  async mounted() {
    this.setupSEO();
    document.title = "Sparkle wave - Sell Vehicle";
    this.generateYears();
    this.page_is_loading = true;

    try {
      await Promise.race([
        Promise.all([this.getFeatures()]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
        ),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
      this.response_message =
        "Failed to load some data. Please refresh the page.";
    } finally {
      this.page_is_loading = false;
    }
  },

  beforeUnmount() {
    // Clean up any pending timeouts
    this.dropdownTimeouts.forEach((timeout) => clearTimeout(timeout));
  },

  computed: {
    filteredBrands() {
      if (!Array.isArray(this.brands)) return [];
      if (!this.brandSearchQuery.trim()) return this.brands.slice(0, 50);

      return this.brands
        .filter((brand) =>
          brand?.name
            ?.toLowerCase()
            .includes(this.brandSearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },

    filteredModels() {
      if (!Array.isArray(this.models) || !this.form.make_id) return [];

      let brandModels = this.models.filter(
        (model) =>
          model.make_id === this.form.make_id ||
          model.brand_id === this.form.make_id
      );

      if (!this.modelSearchQuery.trim()) return brandModels.slice(0, 50);

      return brandModels
        .filter((model) =>
          (model?.model_name || model?.name)
            ?.toLowerCase()
            .includes(this.modelSearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },

    filteredBodies() {
      if (!Array.isArray(this.body_styles)) return [];
      if (!this.bodySearchQuery.trim()) return this.body_styles.slice(0, 50);

      return this.body_styles
        .filter((body) =>
          body?.name?.toLowerCase().includes(this.bodySearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },

    filteredLocations() {
      if (!Array.isArray(this.locations)) return [];
      if (!this.locationSearchQuery.trim()) return this.locations.slice(0, 50);

      return this.locations
        .filter((location) =>
          location?.location_name
            ?.toLowerCase()
            .includes(this.locationSearchQuery.toLowerCase())
        )
        .slice(0, 50);
    },
  },

  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear();
      const startYear = 2000;
      this.years = [];
      for (let year = currentYear; year >= startYear; year--) {
        this.years.push(year);
      }
    },

    // Image handling with validation
    handleImageUpload(event) {
      const files = Array.from(event.target.files);

      if (files.length > 6) {
        this.response_message = "You can only upload up to 6 images.";
        event.target.value = "";
        return;
      }

      // Validate file sizes
      const maxSize = 3 * 1024 * 1024; // 3MB
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith("image/")) {
          this.response_message = `File ${i + 1} is not a valid image.`;
          event.target.value = "";
          return;
        }
        if (files[i].size > maxSize) {
          this.response_message = `Image ${
            i + 1
          } exceeds the 3MB size limit. Please compress or choose a smaller image.`;
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
      // Update imageFiles array
      const dt = new DataTransfer();
      this.imageFiles.forEach((file, i) => {
        if (i !== index) dt.items.add(file);
      });
      if (this.$refs.fileInput) {
        this.$refs.fileInput.files = dt.files;
      }
      this.imageFiles = Array.from(dt.files);
    },

    // Validation for tab navigation
    validateTab(tabIndex) {
      switch (tabIndex) {
        case 0:
          if (!this.form.full_name.trim()) {
            this.response_message = "Please enter your full name.";
            return false;
          }
          if (!this.form.phone.trim()) {
            this.response_message = "Please enter your phone number.";
            return false;
          }
          if (!this.form.email.trim()) {
            this.response_message = "Please enter your email.";
            return false;
          }
          if (!this.form.location) {
            this.response_message = "Please select a location.";
            return false;
          }
          return true;

        case 1:
          if (!this.form.make_id) {
            this.response_message = "Please select a make.";
            return false;
          }
          if (!this.form.model_id) {
            this.response_message = "Please select a model.";
            return false;
          }
          if (!this.form.year) {
            this.response_message = "Please select a year.";
            return false;
          }
          if (!this.form.mileage) {
            this.response_message = "Please enter mileage.";
            return false;
          }
          if (!this.form.price) {
            this.response_message = "Please enter selling price.";
            return false;
          }
          return true;

        case 2:
          if (this.imagePreviews.length === 0) {
            this.response_message = "Please upload at least one image.";
            return false;
          }
          return true;

        default:
          return true;
      }
    },

    goToNextTab() {
      if (this.validateTab(this.tab_in_view)) {
        this.tab_in_view++;
      }
    },

    async getFeatures() {
      try {
        const response = await axios.get(`${api}/get-features`);
        const data = response.data;

        if (data.success && data.features) {
          this.features = data.features;
        } else {
          this.features = [];
        }
      } catch (error) {
        console.error("Error fetching features:", error);
        this.features = [];
        throw error;
      }
    },

    // Brand selection
    selectBrand(brand) {
      this.form.make_id = brand.make_id || brand.id;
      this.brandSearchQuery = brand.name;
      this.showDropdown = false;
      this.brandSelectedIndex = -1;

      // Reset model when brand changes
      this.form.model_id = "";
      this.modelSearchQuery = "";
    },

    onBrandSearchInput() {
      this.showDropdown = true;
      this.brandSelectedIndex = -1;
      if (this.form.make_id && this.brandSearchQuery) {
        const selectedBrand = this.brands.find(
          (b) => (b.make_id || b.id) === this.form.make_id
        );
        if (!selectedBrand || selectedBrand.name !== this.brandSearchQuery) {
          this.form.make_id = "";
          this.form.model_id = "";
          this.modelSearchQuery = "";
        }
      }
    },

    handleBlur() {
      const timeout = setTimeout(() => {
        this.showDropdown = false;
        this.brandSelectedIndex = -1;
      }, 200);
      this.dropdownTimeouts.push(timeout);
    },

    handleKeydown(event) {
      if (!this.showDropdown) {
        this.showDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.brandSelectedIndex = Math.min(
            this.brandSelectedIndex + 1,
            this.filteredBrands.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.brandSelectedIndex = Math.max(this.brandSelectedIndex - 1, -1);
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.brandSelectedIndex >= 0 &&
            this.filteredBrands[this.brandSelectedIndex]
          ) {
            this.selectBrand(this.filteredBrands[this.brandSelectedIndex]);
          }
          break;
        case "Escape":
          this.showDropdown = false;
          this.brandSelectedIndex = -1;
          break;
      }
    },

    // Model selection
    selectModel(model) {
      this.form.model_id = model.model_id || model.id;
      this.modelSearchQuery = model.model_name || model.name;
      this.showModelDropdown = false;
      this.modelSelectedIndex = -1;
    },

    onModelSearchInput() {
      if (this.form.make_id) {
        this.showModelDropdown = true;
        this.modelSelectedIndex = -1;
        if (this.form.model_id && this.modelSearchQuery) {
          const selectedModel = this.models.find(
            (m) => (m.model_id || m.id) === this.form.model_id
          );
          if (
            !selectedModel ||
            (selectedModel.model_name || selectedModel.name) !==
              this.modelSearchQuery
          ) {
            this.form.model_id = "";
          }
        }
      }
    },

    handleModelBlur() {
      const timeout = setTimeout(() => {
        this.showModelDropdown = false;
        this.modelSelectedIndex = -1;
      }, 200);
      this.dropdownTimeouts.push(timeout);
    },

    handleModelKeydown(event) {
      if (!this.form.make_id) return;

      if (!this.showModelDropdown) {
        this.showModelDropdown = true;
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
          this.showModelDropdown = false;
          this.modelSelectedIndex = -1;
          break;
      }
    },

    // Body type selection
    selectBody(body) {
      this.form.body_id = body.body_id || body.id;
      this.bodySearchQuery = body.name;
      this.showBodyDropdown = false;
      this.bodySelectedIndex = -1;
    },

    onBodySearchInput() {
      this.showBodyDropdown = true;
      this.bodySelectedIndex = -1;
      if (this.form.body_id && this.bodySearchQuery) {
        const selectedBody = this.body_types.find(
          (b) => (b.body_id || b.id) === this.form.body_id
        );
        if (!selectedBody || selectedBody.name !== this.bodySearchQuery) {
          this.form.body_id = "";
        }
      }
    },

    handleBodyBlur() {
      const timeout = setTimeout(() => {
        this.showBodyDropdown = false;
        this.bodySelectedIndex = -1;
      }, 200);
      this.dropdownTimeouts.push(timeout);
    },

    handleBodyKeydown(event) {
      if (!this.showBodyDropdown) {
        this.showBodyDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.bodySelectedIndex = Math.min(
            this.bodySelectedIndex + 1,
            this.filteredBodies.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.bodySelectedIndex = Math.max(this.bodySelectedIndex - 1, -1);
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.bodySelectedIndex >= 0 &&
            this.filteredBodies[this.bodySelectedIndex]
          ) {
            this.selectBody(this.filteredBodies[this.bodySelectedIndex]);
          }
          break;
        case "Escape":
          this.showBodyDropdown = false;
          this.bodySelectedIndex = -1;
          break;
      }
    },

    // Location selection
    selectLocation(location) {
      this.form.location = location.location_id || location.id;
      this.locationSearchQuery = location.location_name;
      this.showLocationDropdown = false;
      this.locationSelectedIndex = -1;
    },

    onLocationSearchInput() {
      this.showLocationDropdown = true;
      this.locationSelectedIndex = -1;
      if (this.form.location && this.locationSearchQuery) {
        const selectedLocation = this.locations.find(
          (l) => (l.location_id || l.id) === this.form.location
        );
        if (
          !selectedLocation ||
          selectedLocation.location_name !== this.locationSearchQuery
        ) {
          this.form.location = "";
        }
      }
    },

    handleLocationBlur() {
      const timeout = setTimeout(() => {
        this.showLocationDropdown = false;
        this.locationSelectedIndex = -1;
      }, 200);
      this.dropdownTimeouts.push(timeout);
    },

    handleLocationKeydown(event) {
      if (!this.showLocationDropdown) {
        this.showLocationDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.locationSelectedIndex = Math.min(
            this.locationSelectedIndex + 1,
            this.filteredLocations.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.locationSelectedIndex = Math.max(
            this.locationSelectedIndex - 1,
            -1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.locationSelectedIndex >= 0 &&
            this.filteredLocations[this.locationSelectedIndex]
          ) {
            this.selectLocation(
              this.filteredLocations[this.locationSelectedIndex]
            );
          }
          break;
        case "Escape":
          this.showLocationDropdown = false;
          this.locationSelectedIndex = -1;
          break;
      }
    },

    // Feature selection
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

    // Add vehicle
    async add_vehicle() {
      // Validate all required fields
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

      // Check for empty required fields
      for (const [field, label] of Object.entries(requiredFields)) {
        if (!this.form[field]) {
          this.response_message = `Please fill in the ${label} field.`;
          return;
        }
      }

      // Validate images
      if (this.imageFiles.length === 0) {
        this.response_message = "Please upload at least one image.";
        return;
      }

      try {
        // Prepare FormData for multipart/form-data submission
        const formData = new FormData();

        // Add all form fields
        Object.keys(this.form).forEach((key) => {
          formData.append(key, this.form[key] || "");
        });

        // Add selected features as JSON string
        const featuresArray = Array.from(this.selectedFeatures);
        formData.append("features", JSON.stringify(featuresArray));

        // Add images
        this.imageFiles.forEach((file) => {
          formData.append("images", file);
        });

        // Show loading state
        this.page_is_loading = true;

        // Send to API
        const response = await axios.post(
          `${api}/add-vehicle-to-sell`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle success
        if (response.data.success) {
          this.response_message = "Vehicle submitted successfully!";
          this.resetForm();
          this.tab_in_view = 0;
        } else {
          this.response_message =
            response.data.message ||
            "Failed to submit vehicle. Please try again.";
        }
      } catch (error) {
        console.error("Error submitting vehicle:", error);
        this.response_message =
          error.response?.data?.message ||
          "An error occurred while submitting the vehicle. Please try again.";
      } finally {
        this.page_is_loading = false;
      }
    },

    // Helper method to reset the form
    resetForm() {
      this.form = {
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
      };

      this.selectedFeatures = new Set();
      this.imagePreviews = [];
      this.imageFiles = [];
      this.brandSearchQuery = "";
      this.modelSearchQuery = "";
      this.bodySearchQuery = "";
      this.locationSearchQuery = "";

      // Clear file input
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
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
                latitude: "-4.0435",
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
                latitude: "-4.0435",
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

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
