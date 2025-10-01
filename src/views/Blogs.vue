<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <!-- {{ blogs[0] }} -->
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar />
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
            v-for="(category, index) in blog_categories"
            :key="index"
            class="w-[60%] px-4 bg-third transition-all duration-300 ease-in-out hover:text-[#0066ff] py-2 cursor-pointer text-gray-700 border-b border-gray-300"
          >
            {{ category.name }}
          </p>
          <!-- top stories -->
        </div>
        <div class="w-[60%] view-car">
          <div
            v-for="(blog, index) in blogs"
            :key="index"
            class="w-full border-b border-gray-300 py-4 transition-all duration-300 hover:border-[#ffcd00]"
          >
            <router-link
              :to="`/blogs/view/${blog.blog_id}/${slugify(blog.title)}`"
              class="w-full"
            >
              <div class="w-full max-h-[50vh] overflow-hidden">
                <img :src="blog.image_url" class="w-full h-auto" />
              </div>
              <div class="w-full mt-4">
                <div class="w-ful0 flex justify-end gap-2 theme-yellow">
                  <i class="fa-brands fa-facebook-f"></i>
                  <i class="fa-brands fa-instagram"></i>
                  <i class="fa-brands fa-x-twitter"></i>
                </div>
                <h1 class="font-extrabold text-3xl">
                  {{ blog.title }}
                </h1>
                <p class="text-[#333333] mt-4">{{ blog.excerpt }}</p>
              </div>
            </router-link>
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
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import Spinner from "../components/general/Spinner.vue";
import axios from "axios";
import { api, slugify } from "../utils/store";

export default {
  name: "Blogs",
  components: { Navbar, Spinner, Footer },
  data() {
    return {
      page_is_loading: true,

      top_stories: [
        {
          title: "Tesla Unveils Next-Gen Roadster with Record-Breaking Speed",
          date: "5 July 2024",
        },
        {
          title: "Toyota Launches Affordable EV Line for African Market",
          date: "12 June 2024",
        },
        {
          title: "How AI Is Revolutionizing Car Safety Features",
          date: "28 May 2024",
        },
        {
          title: "The Rise of Hydrogen-Powered Vehicles in 2024",
          date: "14 April 2024",
        },
        {
          title: "Top 10 Fuel-Efficient Cars to Watch This Year",
          date: "2 March 2024",
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
      blog_categories: [
        { name: "Car Reviews" },
        { name: "Car Maintenance Tips" },
        { name: "Electric & Hybrid Vehicles" },
        { name: "Car Buying Guides" },
        { name: "Motorsport News" },
        { name: "Classic & Vintage Cars" },
        { name: "Auto Industry Trends" },
      ],
      blogs: [],
    };
  },

  async mounted() {
    document.title = "Drivate - Blogs";
    try {
      await Promise.race([
        Promise.all([this.getBlogs()]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
        ),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      this.page_is_loading = false;
    }
    // setTimeout(() => {
    //   this.page_is_loading = false;
    // }, 1500);
  },
  methods: {
    slugify,
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
  },
};
</script>
