<template>
  <div class="w-full p-4 bg-third h-fit bg-[#E6B800] search">
    <h4
      @click="toggleSearch"
      class="font-bold text-xl theme-blue cursor-pointer flex items-center justify-between"
    >
      <span>Advanced Search</span>
      <i
        class="fa-solid fa-angle-down toggle-icon"
        :class="{ 'rotate-180': search_is_visible }"
      />
    </h4>
    <div class="w-full flex flex-nowrap mt-4">
      <input
        type="text"
        placeholder="Key words"
        v-model="keywords"
        class="focus:outline-none p-2 w-full"
      />
      <button @click="handleSearch" class="bg-theme-gray text-white p-2 px-4">
        <i class="fa-solid fa-search"></i>
      </button>
    </div>
    <div
      v-if="search_is_visible"
      class="w-full flex flex-nowrap mt-2 gap-2 to-flex"
    >
      <div class="w-[25%] search-inner">
        <label class="font-semibold text-sm">Make</label><br />
        <select
          @change="filterModels()"
          v-model="selected_make"
          class="py-1 rounded-0 bg-white w-full mt-1"
        >
          <option value="">Any Make</option>
          <option v-for="(make, index) in makes" :key="index" :value="make.id">
            {{ make.name }}
          </option>
        </select>
      </div>
      <div class="w-[25%] search-inner">
        <label class="font-semibold">Model</label><br />
        <select
          v-model="selected_model"
          class="py-1 rounded-0 bg-white w-full mt-1"
        >
          <option value="">Any Model</option>
          <option
            v-for="(model, index) in models"
            :key="index"
            :value="model.id"
          >
            {{ model.model_name }}
          </option>
        </select>
      </div>
      <div class="w-[25%] search-inner">
        <label class="font-semibold text-sm">Used/New</label><br />
        <select v-model="condition" class="py-1 rounded-0 bg-white w-full mt-1">
          <option value="">Any Condition</option>
          <option value="Used">Used</option>
          <option value="New">New</option>
        </select>
      </div>
      <div class="w-[25%] search-inner">
        <label class="font-semibold text-sm">Fuel</label><br />
        <select v-model="fuel_type" class="py-1 rounded-0 bg-white w-full mt-1">
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
    <!-- row 2 -->
    <div v-if="search_is_visible" class="w-full py-1 bg-third mt-2 search-2">
      <div class="w-full flex flex-nowrap gap-2 to-flex">
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select
            v-model="min_year"
            class="py-1 h-fit rounded-0 bg-white w-full"
          >
            <option value="">Min Year</option>
            <option
              v-for="(year, index) in years"
              :key="index"
              :value="year.year"
            >
              {{ year.year }}
            </option>
          </select>
          <select
            v-model="max_year"
            class="py-1 h-fit rounded-0 bg-white w-full"
          >
            <option value="">Max Year</option>
            <option
              v-for="(year, index) in years"
              :key="index"
              :value="year.year"
            >
              {{ year.year }}
            </option>
          </select>
        </div>
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select
            v-model="min_price_value"
            class="py-1 h-fit rounded-0 bg-white w-full"
          >
            <option value="">Min Price</option>
            <option
              v-for="(price, index) in min_price"
              :key="index"
              :value="price.price"
            >
              {{ price.price }}
            </option>
          </select>
          <select
            v-model="max_price_value"
            class="py-1 h-fit rounded-0 bg-white w-full"
          >
            <option value="">Max Price</option>
            <option
              v-for="(price, index) in prices"
              :key="index"
              :value="price.price"
            >
              {{ price.price }}
            </option>
          </select>
        </div>
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select
            v-model="body_type"
            class="py-1 h-fit rounded-0 bg-white w-full"
          >
            <option value="">Body Type</option>
            <option
              v-for="(type, index) in body_styles"
              :key="index"
              :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select
            v-model="transmission"
            class="py-1 h-fit rounded-0 bg-white w-full focus:outline-none"
          >
            <option value="">Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
      </div>
    </div>
    <!-- third row -->
    <div
      v-if="search_is_visible"
      class="w-full flex justify-end gap-4 mt-2 buttons"
    >
      <button
        @click="handleSearch"
        class="bg-[#E6B800] w-[150px] font-bold py-1 px-4 rounded-sm"
      >
        Search
      </button>
      <span>or</span>
      <span
        @click="handleReset"
        class="text-xl font-semibold cursor-pointer theme-blue hover:text-black hover:underline"
      >
        Reset
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    makes: Array,
    fetched_models: Array,
    body_styles: Array,
    locations: Array,
  },
  data() {
    return {
      // Form fields with v-models
      keywords: "",
      selected_make: "",
      selected_model: "",
      condition: "",
      fuel_type: "",
      min_year: "",
      max_year: "",
      min_price_value: "",
      max_price_value: "",
      body_type: "",
      transmission: "",
      location: "",
      status: "",

      // Models tracking
      models: [],
      all_models_tracker: [],
      filtered_models: [],

      // Static data
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
      min_price: [
        { price: "Less than 500001" },
        { price: 500001 },
        { price: 1000001 },
        { price: 1500001 },
        { price: 2000001 },
        { price: 2500001 },
        { price: 3000001 },
        { price: 4000001 },
        { price: 5000001 },
        { price: 6000001 },
        { price: 7000001 },
      ],
      prices: [
        { price: 500000 },
        { price: 1000000 },
        { price: 1500000 },
        { price: 2000000 },
        { price: 2500000 },
        { price: 3000000 },
        { price: 4000000 },
        { price: 5000000 },
        { price: 6000000 },
        { price: 7000000 },
        { price: "Above 7000000" },
      ],
      search_is_visible: true,
      window_width: window.innerWidth,
    };
  },
  mounted() {
    this.models = this.fetched_models;
    this.all_models_tracker = this.fetched_models;

    // Set initial visibility based on screen size
    this.updateSearchVisibility();

    // Add resize listener
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    // Clean up resize listener
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window_width = window.innerWidth;
      this.updateSearchVisibility();
    },

    updateSearchVisibility() {
      if (this.window_width < 850) {
        this.search_is_visible = false;
      } else {
        this.search_is_visible = true;
      }
    },

    toggleSearch() {
      // Only allow toggle on small screens
      if (this.window_width < 850) {
        this.search_is_visible = !this.search_is_visible;
      }
    },

    filterModels() {
      this.models = [];
      this.selected_model = ""; // Reset model selection when make changes

      if (!this.selected_make) {
        this.models = this.all_models_tracker;
        return;
      }

      this.filtered_models = this.all_models_tracker.filter(
        (item) => item.make_id === parseInt(this.selected_make)
      );

      this.models = this.filtered_models.map((item) => ({
        ...item,
      }));
    },

    handleSearch() {
      // Build query parameters object
      const query = {};

      if (this.keywords) query.keywords = this.keywords;
      if (this.selected_make) query.make = this.selected_make;
      if (this.selected_model) query.model = this.selected_model;
      if (this.condition) query.condition = this.condition;
      if (this.fuel_type) query.fuel = this.fuel_type;
      if (this.min_year) query.min_year = this.min_year;
      if (this.max_year) query.max_year = this.max_year;
      if (this.min_price_value) query.min_price = this.min_price_value;
      if (this.max_price_value) query.max_price = this.max_price_value;
      if (this.body_type) query.body = this.body_type;
      if (this.transmission) query.transmission = this.transmission;

      // Navigate to /vehicles with query parameters
      this.$router.push({
        path: "/vehicles",
        query: query,
      });
    },

    handleReset() {
      // Reset all form fields
      this.keywords = "";
      this.selected_make = "";
      this.selected_model = "";
      this.condition = "";
      this.fuel_type = "";
      this.min_year = "";
      this.max_year = "";
      this.min_price_value = "";
      this.max_price_value = "";
      this.body_type = "";
      this.transmission = "";

      // Reset models to show all
      this.models = this.all_models_tracker;
    },
  },
};
</script>

<style scoped>
.toggle-icon {
  transition: transform 0.3s ease;
  display: none;
}

@media (max-width: 850px) {
  .toggle-icon {
    display: inline-block;
  }
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
