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
    <div class="w-[90%] flex flex-wrap">
      <!-- blog body -->
      <div class="w-full flex mt-8 gap-4 relative">
        <div
          class="w-[40%] flex flex-wrap justify-center sticky top-5 self-start to-hide-smaller"
        >
          <!-- top stories -->
          <div class="w-[60%] p-4 bg-third mt-8">
            <h2 class="text-2xl font-bold theme-yellow">Other Stories</h2>
            <ul class="mt-4">
              <li
                v-for="(blog, index) in blogs"
                :key="index"
                class="group py-2 cursor-pointer text-gray-700 border-b border-gray-300"
              >
                <p
                  class="group-hover:text-[#0066ff] transition-all duration-300 ease-in-out"
                >
                  {{ blog?.title }}
                </p>
                <p class="mt-2 text-sm">{{ format_date(blog?.created_at) }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-[60%] to-full-smaller">
          <div class="w-full border-b border-gray-300 py-4">
            <div class="w-full max-h-[50vh] overflow-hidden">
              <img :src="blog?.image_url" class="w-full h-auto" />
            </div>
            <div class="w-full mt-4">
              <div class="w-ful0 flex justify-end gap-2 theme-yellow">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-x-twitter"></i>
              </div>
              <h1 class="font-extrabold text-3xl">
                {{ blog?.title }}
              </h1>
              <div
                class="w-full mt-2 blog-content-holder overflow-x-hidden"
                v-html="blog?.content"
              ></div>
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
import Footer from "../../components/general/Footer.vue";
import Navbar from "../../components/general/Navbar.vue";
import Spinner from "../../components/general/Spinner.vue";
import { api } from "../../utils/store";
import axios from "axios";

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

    // url data
    id: String,
    title: String,
  },
  components: { Navbar, Spinner, Footer },
  // props: ["id", "title"],
  data() {
    return {
      page_is_loading: true,
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

      // data arrays
      blog: null,
      blogs: [],
    };
  },
  async mounted() {
    try {
      await Promise.race([
        Promise.all([this.fetchBlogs(), this.getBlogs()]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
        ),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      document.title = "Drivate - " + this.blog.title;
      this.page_is_loading = false;
    }
  },

  methods: {
    async fetchBlogs() {
      try {
        const response = await axios.get(`${api}/get-blog/${this.id}`);

        const data = response.data;

        // Check if the request was successful
        // console.log("Blogs is: ", this.blog);
        if (data.success) {
          this.blog = data.blog;
          this.content = this.blog.content;

          setTimeout(() => {
            this.response_is_visible = false;
          }, 3000);
        } else {
          // Handle API error response
          throw new Error(data.error || "Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);

        this.response_is_visible = true;
        this.alert_status = false;
        this.response_message = "Failed. Check  your connection";
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
    format_date(date_to_change) {
      if (!date_to_change) return "";
      const date = new Date(date_to_change);
      const date_options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", date_options);
    },
  },
};
</script>
