<template>
  <div class="w-full bg-white">
    <!-- <Navbar /> -->
    <router-view
      :about_us="about_us"
      :brands="brands"
      :body_styles="body_styles"
      :models="models"
      :other_categories="drive_categories"
      :price_ranges="price_ranges"
      :locations="locations"
      :contacts="contacts"
    />
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Navbar from "./components/general/Navbar.vue";
import Footer from "./components/general/Footer.vue";
import { api } from "./utils/store";
import axios from "axios";
export default {
  name: "App",
  components: { Navbar, Footer },
  data() {
    return {
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

      drive_categories: [
        { category: "Manual" },
        { category: "Automatic" },
        { category: "New" },
        { category: "Used" },
        { category: "Diesel" },
        { category: "Petrol" },
        { category: "Electric" },
        { category: "Hybrid" },
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

      //data arrays
      contacts: [],
      brands: [],
      body_styles: [],
      about_us: null,
      locations: [],
    };
  },

  // mounted
  async mounted() {
    document.title = "Drivate - Drive Dreams";
    try {
      await Promise.race([
        Promise.all([
          this.getMakes(),
          this.getBodyStyles(),
          this.getModels(),
          this.get_about_us(),
          this.getLocations(),
          this.getContacts(),
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

  // methods
  methods: {
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
    async getContacts() {
      try {
        const response = await axios.get(`${api}/get-contacts`);
        const data = response.data;

        console.log("contacts response:", data);

        if (data.success && data.contacts) {
          this.contacts = data.contacts;
        } else {
          this.contacts = [];
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    async getLocations() {
      try {
        const response = await axios.get(`${api}/get-locations`);
        const data = response.data;

        if (data.success && data.locations) {
          this.locations = data.locations;
        } else {
          this.locations = [];
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        this.locations = [];
        throw error;
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
    // get about us
    async get_about_us() {
      try {
        const response = await axios.get(`${api}/get-about-us`);
        const data = response.data;

        this.about_us = data.about_us;
        console.log("About us: ", data);

        if (!data.success) {
          console.log(data.error);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  },
};
</script>
