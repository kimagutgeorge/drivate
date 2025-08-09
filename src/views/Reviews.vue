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
                <i v-for="i in 4" class="fa-solid fa-star theme-yellow"></i>
                <i class="fa-solid fa-star text-gray-500"></i>
              </div>
              <div class="w-full mt-[-5px]">
                <h2 class="theme-blue text-xl font-bold">
                  <span class="underline">240</span> Reviews
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
                  <select class="py-2 rounded-0 bg-white w-full mt-1 border">
                    <option v-for="(make, index) in makes" :key="index">
                      {{ make.make }}
                    </option>
                  </select>
                </div>
                <div class="w-[25%] to-full">
                  <select class="p-2 rounded-0 bg-white w-full mt-1 border">
                    <option>Any Model</option>
                  </select>
                </div>
                <div class="w-[25%] to-full">
                  <select class="p-2 rounded-0 bg-white w-full mt-1 border">
                    <option>Any Body Type</option>
                  </select>
                </div>
                <div class="w-[25%] to-full">
                  <button
                    class="bg-[#ffcd00] text-white h-full p-2 mt-1 w-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <!-- sort -->
          </div>

          <!-- list view -->
          <div class="w-full flex flex-wrap mt-6 gap-2 review-card-holder">
            <Card review_card v-for="i in 5" class="w-full" />
          </div>
          <!-- pagination -->
          <div class="w-full flex justify-center mt-10 gap-1 h-fit">
            <button
              class="text-[#4d4d4d] border border-[#4d4d4d] py-1 px-3"
              disabled
            >
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button
              class="text-white bg-theme-gray py-1 px-3 border border-[#4d4d4d]"
            >
              1
            </button>
            <button class="text-[#4d4d4d] border border-[#4d4d4d] py-1 px-3">
              2
            </button>
            <button class="text-[#4d4d4d] border border-[#4d4d4d] py-1 px-3">
              ...
            </button>
            <button class="text-[#4d4d4d] border border-[#4d4d4d] py-1 px-3">
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <Footer
      :makes="makes"
      :prices="price_ranges"
      :body_styles="types"
      :categories="categories"
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
export default {
  name: "Reviews",
  components: { Navbar, Card, Spinner, Footer, Search },
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
  /* methods */
  methods: {},
  /* mounted */
  mounted() {
    document.title = "Drivate - Reviews";
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },
};
</script>
