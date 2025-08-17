<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex justify-center flex-wrap">
    <Navbar :categories="categories" :contacts="contacts" has_top_bar />
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
                v-for="(make, index) in makes"
                :key="index"
                class="flex flex-nowrap gap-2 p-2 hover:bg-white category"
                style="border-bottom: 1px solid #f4f5f4"
              >
                <img :src="make.icon" class="w-[30px] min-w-[30px] h-fit" />
                <span class="font-semibold cursor-pointer">{{
                  make.make
                }}</span>
              </div>
            </div>
          </div>
          <div class="w-full mt-8 heading">
            <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
              Search by body type
            </h4>
            <div class="w-full to-flex">
              <div
                v-for="(type, index) in types"
                :key="index"
                class="flex flex-nowrap gap-2 p-2 hover:bg-white category"
                style="border-bottom: 1px solid #f4f5f4"
              >
                <img
                  :src="type.icon"
                  class="w-[30px] min-w-[30px] filter grayscale h-fit"
                />
                <span class="font-semibold cursor-pointer">{{
                  type.type
                }}</span>
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
                  >{{ price.price }}</span
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
                v-for="(category, index) in categories"
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
                  >{{ category.category }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- shop panel -->
        <div class="w-[80%] to-full to-first">
          <!-- search panel -->
          <div class="w-full p-4 bg-third h-fit">
            <Search />
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
              v-for="(car, index) in cars"
              :key="index"
              :car_name="car.name"
              :location="car.location"
              :price="car.price"
              :car_pic="car.pic"
              class="w-[19%] mb-2"
            />
            <Card
              car_card
              v-for="(car, index) in cars"
              :key="index"
              :car_name="car.name"
              :location="car.location"
              :price="car.price"
              :car_pic="car.pic"
              class="w-[19%] mb-2"
            />
          </div>
          <!-- list view -->
          <div v-if="!is_grid_view" class="w-full flex flex-wrap mt-6 gap-2">
            <Card
              list_card
              v-for="(car, index) in cars"
              :key="index"
              :car_name="car.name"
              :location="car.location"
              :price="car.price"
              :car_pic="car.pic"
              :mileage="car.mileage"
              :car_year="car.year"
              :engine="car.engine"
              :steering="car.steering"
              :fuel="car.fuel"
              :transmission="car.transmission"
              class="w-full mb-2"
            />
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
    <!--  -->
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
  name: "Shop",
  components: { Navbar, Card, Spinner, Footer, Search },
  data() {
    return {
      page_is_loading: true,
      is_grid_view: true,
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
    };
  },
  /* methods */
  methods: {},
  /* mounted */
  mounted() {
    document.title = "Drivate - All cars";
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },
};
</script>
