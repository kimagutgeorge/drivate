<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <!-- <Navbar
      :makes="brands"
      :body_types="body_styles"
      :categories="categories"
      :contacts="contacts"
      has_top_bar
    /> -->
    <!-- hero section -->
    <div class="w-full h-[45vh] relative overflow-hidden">
      <div class="w-full absolute top-0 h-full">
        <!-- carousel -->
        <div
          class="w-full flex flex-nowrap transition-transform duration-500 ease-in-out hero-section"
          :style="{ transform: `translateX(-${current_slide * 100}%)` }"
        >
          <div
            v-for="(carousel_item, index) in carousels"
            :key="index"
            class="w-full min-w-full relative"
          >
            <div class="w-full h-full">
              <div
                class="w-full absolute h-full bg-black opacity-50 z-10"
              ></div>
              <img
                :src="carousel_item.image_url"
                :alt="carousel_item.image_alt"
                class="w-full h-auto max-h-none min-h-full max-w-none object-cover"
              />
            </div>
            <!-- content side -->
            <div
              class="w-full h-[35vh] absolute top-0 flex justify-center z-20"
            >
              <div class="w-[90%] h-full flex py-2">
                <div class="h-full flex flex-col justify-center">
                  <h1
                    class="text-4xl font-extrabold uppercase bg-theme-yellow w-fit px-4"
                  >
                    {{ carousel_item.heading_1 }}
                  </h1>
                  <h2
                    class="text-3xl font-extrabold uppercase bg-theme-yellow w-fit px-4 mt-2"
                  >
                    {{ carousel_item.heading_2 }}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end of carousel -->
      </div>
      <!-- navigation -->
      <div class="w-full absolute h-full flex">
        <div class="w-1/2 h-full flex">
          <div class="h-full flex flex-col justify-center">
            <i
              @click="prev_slide"
              class="fa-solid fa-angle-left text-2xl font-bold text-white z-40 cursor-pointer m-4 p-2 bg-theme-blue w-fit"
            ></i>
          </div>
        </div>
        <div class="w-1/2 h-full flex justify-end">
          <div class="h-full flex flex-col justify-center">
            <i
              @click="next_slide"
              class="fa-solid fa-angle-right text-2xl font-bold text-white z-40 cursor-pointer m-4 p-2 bg-theme-blue w-fit"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <!-- home body -->
    <div class="w-[90%] flex flex-nowrap mt-10 to-wrap">
      <!-- left -->
      <div class="w-1/4 bg-third shadow-sm p-2 h-fit filter to-full to-second">
        <div class="w-full heading">
          <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
            Search by make
          </h4>
          <div class="w-full to-flex">
            <div
              v-for="(make, index) in brands"
              :key="index"
              class="p-2 hover:bg-white category"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <router-link
                :to="`/vehicles/${is_make}/${slugify(make.name)}`"
                class="w-full flex gap-2 flex-nowrap inner-cat"
              >
                <img
                  :src="make.image_url"
                  class="w-[30px] min-w-[30px] h-fit"
                />
                <p class="font-semibold cursor-pointer">{{ make.name }}</p>
              </router-link>
            </div>
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
              class="p-2 hover:bg-white category"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <router-link
                :to="`/vehicles/${is_body_type}/${slugify(type.name)}`"
                class="w-full flex gap-2 flex-nowrap inner-cat"
              >
                <img
                  :src="type.image_url"
                  class="w-[30px] min-w-[30px] filter grayscale h-fit"
                />
                <p class="font-semibold cursor-pointer">{{ type.name }}</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="w-full mt-8 heading hide-footer">
          <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
            Search by price
          </h4>
          <div class="w-full to-flex">
            <div
              v-for="(price, index) in price_ranges"
              :key="index"
              class="p-2 hover:bg-white category to-third"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <router-link
                to="/vehicles"
                class="w-full flex gap-2 flex-nowrap inner-cat"
              >
                <img
                  src="/icons/coin.png"
                  class="w-[27px] min-w-[15px] h-fit to-hide"
                />
                <p
                  class="font-semibold text-sm cursor-pointer hover:underline ml-2"
                >
                  {{ price.price }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- middle -->
      <div class="w-full ml-4 middle-part to-first">
        <!-- search -->
        <Search
          :makes="brands"
          :fetched_models="models"
          :body_styles="body_styles"
        />
        <!-- New Arrivals -->
        <div class="w-full flex flex-wrap gap-2 p-2 mt-8">
          <div class="w-full">
            <h4 class="font-bold text-lg theme-blue">New Arrivals</h4>
          </div>
          <div class="w-full flex flex-wrap gap-2 mt-4 car-holder">
            <!-- <Card
              car_card
              v-for="(car, index) in cars.slice(0, 6)"
              :key="index"
              :car_name="car.name"
              :location="car.location"
              :price="car.price"
              :car_pic="car.pic"
              class="w-[32%] mb-2"
            /> -->
            <Card car_card :vehicles="all_vehicles" class="w-[32%] mb-2" />
          </div>
        </div>
        <!-- most popular -->
        <div class="w-full flex flex-wrap gap-2 p-2 mt-8">
          <div class="w-full">
            <h4 class="font-bold text-lg theme-blue">Popular</h4>
          </div>
          <div class="w-full flex flex-wrap gap-2 mt-4 car-holder">
            <Card
              car_card
              v-for="(car, index) in cars.slice(4, 10)"
              :key="index"
              :car_name="car.name"
              :location="car.location"
              :price="car.price"
              :car_pic="car.pic"
              class="w-[32%] mb-2"
            />
          </div>
        </div>
      </div>
      <!-- right side -->
      <div class="w-1/4 bg-third shadow-sm p-2 h-fit ml-4 to-hide">
        <div class="w-full">
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
              :to="`/vehicles/${is_model}/${slugify(model.model_name)}`"
            >
              <span
                class="font-semibold cursor-pointer hover:underline text-sm"
              >
                {{ model.make_name }} {{ model.model_name }}
              </span>
            </router-link>
          </div>
        </div>
        <div class="w-full mt-8">
          <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
            Top 10 Searched
          </h4>
          <div
            v-for="(searched, index) in most_searched"
            :key="index"
            class="flex flex-nowrap gap-2 py-2"
            style="border-bottom: 1px solid #f4f5f4"
          >
            <router-link to="/vehicles">
              <span
                class="font-semibold cursor-pointer hover:underline text-sm"
                >{{ searched.name }}</span
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- about us -->
    <div
      class="w-full mt-24 flex justify-center flex-wrap bg-[#fffadd] border border-[#E6B800] about"
      id="about-us"
    >
      <div class="w-[90%] flex flex-wrap py-10">
        <div class="w-1/2 p-4 h-[70vh] flex flex-col justify-center">
          <h1 class="font-extrabold text-2xl">About us</h1>
          <!-- {{ about_us }} -->
          <p class="mt-4">
            {{ about_us.statement }}
          </p>
        </div>
        <div class="w-1/2 h-[70vh] p-4 flex justify-center relative">
          <div class="h-full relative">
            <div
              class="mt-10 ml-[-15%] h-full bg-transparent w-[80%] absolute flex flex-col justify-end overflow-hidden"
            >
              <div class="h-[60%] bg-[#fffadd] p-[15px]">
                <img :src="about_us.image_1" class="w-full h-auto" />
              </div>
            </div>
            <!-- 2nd image -->
            <img :src="about_us.image_2" class="w-auto h-full" />
          </div>
        </div>
        <div class="w-full p-4 flex gap-[1%] flex-wrap mb-4 mt-[15vh] why-us">
          <h1 class="font-extrabold text-2xl w-full mb-8">Why Choose Us?</h1>
          <div
            v-for="(why, index) in about_us.why_choose_us"
            :key="index"
            class="w-[31%] mt-4 why-inner"
          >
            <div class="w-full flex flex-nowrap gap-2 h-[7vh] to-flex">
              <div>
                <i
                  class="text-[#E6B800] text-2xl p-2 border border-[#E6B800]"
                  :class="why.icon"
                ></i>
              </div>

              <div class="w-full h-full flex flex-col justify-end">
                <h2 class="text-xl font-bold">{{ why.heading }}</h2>
              </div>
            </div>

            <!-- description -->
            <p class="mt-2">{{ why.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- blogs -->
    <div class="w-[90%] mt-24">
      <h4 class="font-bold text-3xl theme-blue">Latest News & Reviews</h4>
      <div class="w-full flex flex-wrap gap-2 mt-8 blog-holder no-scrollbar">
        <!-- {{ blogs }} -->
        <!-- <Card
          v-for="(blog, index) in blogs.slice(0, 4)"
          :key="index"
          blog_card
          class="w-[24%]"
          :blog_title="blog.title"
          :car_pic="blog.pic"
        /> -->
        <Card blog_card class="w-[24%]" :blogs="blogs" />
      </div>
    </div>
    <!-- footer -->
    <Footer
      :makes="brands"
      :prices="price_ranges"
      :body_styles="body_styles"
      :categories="categories"
      :locations="locations"
      :contacts="contacts"
    />
  </div>
</template>
<script>
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import Search from "../components/general/Search.vue";
import Spinner from "../components/general/Spinner.vue";
import Card from "../components/ui/Card.vue";
import { api, slugify } from "../utils/store";
import axios from "axios";

export default {
  name: "Home",
  components: { Navbar, Card, Footer, Spinner, Search },
  data() {
    return {
      /* variables */
      current_slide: 0,
      total_slides: "",
      page_is_loading: true,
      all_vehicles: [],
      carousels: [],
      brands: [],
      body_styles: [],
      about_us: null,
      blogs: [],
      is_make: "make",
      is_brand: "brand",
      is_body_type: "body",
      is_model: "model",
      /* data */
      carousel: [
        {
          image: "/images/car-6.jpg",
          heading_1: "TRUSTED BY CLIENTS",
          heading_2: "ALL OVER EAST AFRICA!",
          is_pic: true,
        },
        {
          image: "/images/bg-1.jpg",
          heading_1: "DRIVE YOUR DREAMS",
          heading_2: "WITH US TODAY!",
          is_pic: true,
        },
        {
          image: "/images/bg-2.jpg",
          heading_1: "GOOD VALUE FOR",
          heading_2: "YOUR MONEY",
          is_pic: true,
        },
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
      // makes: [
      //   { make: "Toyota" },
      //   { make: "Suzuki" },
      //   { make: "Honda" },
      //   { make: "Nissan" },
      //   { make: "Mazda" },
      //   { make: "Mitsubishi" },
      //   { make: "Subaru" },
      //   { make: "Ford" },
      //   { make: "Chevrolet" },
      //   { make: "Volkswagen" },
      //   { make: "Hyundai" },
      //   { make: "Kia" },
      //   { make: "Mercedes-Benz" },
      //   { make: "BMW" },
      //   { make: "Audi" },
      // ],
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
      why_choose_us: [
        {
          title: "Wide Selection",
          description:
            "Explore a large and diverse range of vehicles, from budget-friendly compacts to premium SUVs, all in one convenient, easy-to-browse platform.",
          icon: "fas fa-car-side",
        },
        {
          title: "Trusted Listings",
          description:
            "We verify every car before listing to ensure it meets quality, ownership, and condition standards for a safe and reliable purchase.",
          icon: "fas fa-shield-alt",
        },
        {
          title: "Affordable Prices",
          description:
            "Enjoy competitive pricing and frequent deals that ensure you get great value without compromising on the car’s performance or condition.",
          icon: "fas fa-tags",
        },
        {
          title: "Customer Support",
          description:
            "Our friendly team is always available to assist you, answer questions, and guide you throughout the buying or selling process with care.",
          icon: "fas fa-headset",
        },
        {
          title: "Easy Online Process",
          description:
            "From searching to booking, our platform lets you complete the entire process online with speed, simplicity, and transparency at every step.",
          icon: "fas fa-laptop",
        },
        {
          title: "Fast Turnaround",
          description:
            "We move fast — from listing to test drive, we aim to streamline your experience and minimize delays throughout the transaction process.",
          icon: "fas fa-stopwatch",
        },
      ],
      cars: [
        {
          name: "Toyota Auris 2017",
          location: "Mombasa",
          mileage: "102,300",
          year: "2017",
          engine: "2000 cc",
          steering: "Left",
          fuel: "Petrol",
          price: "4, 000, 000",
          transmission: "Automatic",
          pic: "car-1.jpeg",
        },
        {
          name: "Nissan X-Trail 2018",
          location: "Nairobi",
          mileage: "89,500",
          year: "2018",
          engine: "2500 cc",
          steering: "Right",
          fuel: "Diesel",
          price: "3, 500, 000",
          transmission: "Manual",
          pic: "car-2.webp",
        },
        {
          name: "Mazda CX-5 2019",
          location: "Kisumu",
          mileage: "54,800",
          year: "2019",
          engine: "2200 cc",
          steering: "Left",
          fuel: "Petrol",
          price: "7, 700, 000",
          transmission: "Automatic",
          pic: "car-3.webp",
        },
        {
          name: "Subaru Forester 2020",
          location: "Nakuru",
          mileage: "33,900",
          year: "2020",
          engine: "2000 cc",
          steering: "Right",
          fuel: "Petrol",
          price: "2, 000, 000",
          transmission: "Automatic",
          pic: "car-4.jpg",
        },
        {
          name: "Mitsubishi Outlander 2016",
          location: "Eldoret",
          mileage: "140,200",
          year: "2016",
          engine: "2400 cc",
          steering: "Left",
          fuel: "Hybrid",
          price: "1, 800, 000",
          transmission: "Automatic",
          pic: "car-5.jpg",
        },
        {
          name: "Honda CR-V 2015",
          location: "Mombasa",
          mileage: "156,700",
          year: "2015",
          engine: "2000 cc",
          steering: "Right",
          fuel: "Petrol",
          price: "2, 200, 000",
          transmission: "Manual",
          pic: "car-6.jpg",
        },
        {
          name: "Toyota Land Cruiser Prado 2018",
          location: "Nairobi",
          mileage: "68,900",
          year: "2018",
          engine: "3000 cc",
          steering: "Left",
          fuel: "Diesel",
          price: "900, 000",
          transmission: "Automatic",
          pic: "car-7.jpg",
        },
        {
          name: "Suzuki Swift 2021",
          location: "Kisumu",
          mileage: "15,200",
          year: "2021",
          engine: "1200 cc",
          steering: "Right",
          fuel: "Petrol",
          price: "2, 500, 000",
          transmission: "Automatic",
          pic: "car-8.jpg",
        },
        {
          name: "Ford Ranger 2019",
          location: "Nakuru",
          mileage: "72,500",
          year: "2019",
          engine: "3200 cc",
          steering: "Left",
          fuel: "Diesel",
          price: "2, 000, 000",
          transmission: "Manual",
          pic: "car-9.jpg",
        },
        {
          name: "Mercedes-Benz GLC 2022",
          location: "Nairobi",
          mileage: "8,900",
          year: "2022",
          engine: "2000 cc",
          steering: "Left",
          fuel: "Petrol",
          price: "2, 000, 000",
          transmission: "Automatic",
          pic: "car-10.jpg",
        },
      ],
      blogs: [],
    };
  },
  /* mounted */
  async mounted() {
    document.title = "Drivate - Drive Dreams";
    try {
      await Promise.race([
        Promise.all([
          this.getCarousels(),
          this.getMakes(),
          this.fetchVehicles(),
          this.getBodyStyles(),
          this.getModels(),
          this.get_about_us(),
          this.getBlogs(),
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
    // setTimeout(() => {
    //   this.page_is_loading = false;
    // }, 1500);
  },
  /* methods */
  methods: {
    slugify,
    next_slide() {
      if (this.current_slide < this.total_slides - 1) {
        this.current_slide++;
      } else {
        this.current_slide = 0; // Loop back to first
      }
    },

    prev_slide() {
      if (this.current_slide > 0) {
        this.current_slide--;
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
    //get carousels
    async getCarousels() {
      try {
        const response = await axios.get(`${api}/get-carousels`);
        const data = response.data;

        console.log("Full response:", data); // Debug log

        if (data.success && data.carousels) {
          this.carousels = data.carousels; // Extract the array
          this.total_slides = this.carousels.length;
        } else {
          this.carousels = []; // Fallback to empty array
          console.warn("No carousels found in response");
        }

        console.log("Carousels array:", this.carousels); // Debug log
      } catch (error) {
        console.error("Error fetching carousels:", error);
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
