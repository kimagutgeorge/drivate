<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar :categories="categories" :contacts="contacts" has_top_bar />
    <!-- hero section -->
    <div class="w-full h-[45vh] relative overflow-hidden">
      <!-- <div class="w-full absolute h-full bg-black opacity-50 z-10"></div> -->
      <div class="w-full absolute top-0 h-full">
        <!-- carousel -->
        <div
          class="w-full flex flex-nowrap transition-transform duration-500 ease-in-out hero-section"
          :style="{ transform: `translateX(-${current_slide * 100}%)` }"
        >
          <div
            v-for="(carousel_item, index) in carousel"
            :key="index"
            class="w-full min-w-full relative"
          >
            <div class="w-full h-full">
              <img
                v-if="carousel_item.is_pic === true"
                :src="carousel_item.image"
                :alt="carousel_item.image"
                class="w-full h-auto max-h-none max-w-none object-cover"
              />
              <video
                v-else
                autoplay
                muted
                loop
                playsinline
                class="w-full h-auto min-h-full max-w-none object-cover"
              >
                <source :src="carousel_item.image" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <!-- content side -->
            <div
              class="w-full h-[35vh] absolute top-0 flex justify-center z-20"
            >
              <div class="w-[90%] h-full flex py-2">
                <div class="h-full flex flex-col justify-center">
                  <h1
                    class="text-4xl font-extrabold bg-theme-yellow w-fit px-4"
                  >
                    {{ carousel_item.heading_1 }}
                  </h1>
                  <h2
                    class="text-3xl font-extrabold bg-theme-yellow w-fit px-4 mt-2"
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
      <div class="w-1/4 bg-third shadow-sm p-2 h-fit filter to-full">
        <div class="w-full heading">
          <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
            Search by make
          </h4>
          <div class="w-full to-flex">
            <div
              v-for="(make, index) in makes"
              :key="index"
              class="p-2 hover:bg-white category"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <router-link to="/all-cars" class="w-full flex gap-2 flex-nowrap">
                <img :src="make.icon" class="w-[30px] min-w-[30px] h-fit" />
                <span class="font-semibold cursor-pointer">{{
                  make.make
                }}</span>
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
              v-for="(type, index) in types"
              :key="index"
              class="p-2 hover:bg-white category"
              style="border-bottom: 1px solid #f4f5f4"
            >
              <router-link to="/all-cars" class="w-full flex gap-2 flex-nowrap">
                <img
                  :src="type.icon"
                  class="w-[30px] min-w-[30px] filter grayscale h-fit"
                />
                <span class="font-semibold cursor-pointer">{{
                  type.type
                }}</span>
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
              <router-link to="/all-cars" class="w-full flex gap-2 flex-nowrap">
                <img
                  src="/icons/coin.png"
                  class="w-[27px] min-w-[15px] h-fit to-hide"
                />
                <span
                  class="font-semibold text-sm cursor-pointer hover:underline ml-2"
                  >{{ price.price }}</span
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- middle -->
      <div class="w-full ml-4 middle-part">
        <!-- search -->
        <Search />
        <!-- New Arrivals -->
        <div class="w-full flex flex-wrap gap-2 p-2 mt-8">
          <div class="w-full">
            <h4 class="font-bold text-lg theme-blue">New Arrivals</h4>
          </div>
          <div class="w-full flex flex-wrap gap-2 mt-4 car-holder">
            <Card
              car_card
              v-for="(car, index) in cars.slice(0, 6)"
              :key="index"
              :car_name="car.name"
              :location="car.location"
              :price="car.price"
              :car_pic="car.pic"
              class="w-[32%] mb-2"
            />
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
            Top 10 Locations
          </h4>
          <div
            v-for="(location, index) in locations"
            :key="index"
            class="flex flex-nowrap gap-2 py-2"
            style="border-bottom: 1px solid #f4f5f4"
          >
            <router-link to="/all-cars">
              <span
                class="font-semibold cursor-pointer hover:underline text-sm"
              >
                {{ location.name }}
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
            <router-link to="/all-cars">
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
          <p class="mt-4">
            Welcome to Drivate, your trusted partner in finding quality cars at
            the best prices. We’re committed to making car buying simple,
            transparent, and stress-free. Whether you're looking for a reliable
            family car, a rugged 4x4, or a sleek executive ride, our platform
            connects you with a wide range of vehicles to match your needs and
            budget.
          </p>
          <p class="mt-4">
            We carefully vet each listing to ensure authenticity and value. With
            years of experience in the automotive industry, our team is
            passionate about helping you make confident, informed decisions. At
            Drivate, we don't just sell cars — we help you drive away with peace
            of mind.
          </p>
        </div>
        <div class="w-1/2 h-[70vh] p-4 flex justify-center relative">
          <div class="h-full relative">
            <div
              class="mt-10 ml-[-15%] h-full bg-transparent w-[80%] absolute flex flex-col justify-end overflow-hidden"
            >
              <div class="h-[60%] bg-[#fffadd] p-[15px]">
                <img src="/static/about-us2.jpg" class="w-full h-auto" />
              </div>
            </div>
            <!-- 2nd image -->
            <img src="/static/about-us1.jpg" class="w-auto h-full" />
          </div>
        </div>
        <div class="w-full p-4 flex gap-[1%] flex-wrap mb-4 mt-[15vh] why-us">
          <h1 class="font-extrabold text-2xl w-full mb-8">Why Choose Us?</h1>
          <div
            v-for="(why, index) in why_choose_us"
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
                <h2 class="text-xl font-bold">{{ why.title }}</h2>
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
        <Card
          v-for="(blog, index) in blogs.slice(0, 4)"
          :key="index"
          blog_card
          class="w-[24%]"
          :blog_title="blog.title"
          :car_pic="blog.pic"
        />
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
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import Search from "../components/general/Search.vue";
import Spinner from "../components/general/Spinner.vue";
import Card from "../components/ui/Card.vue";

export default {
  name: "Home",
  components: { Navbar, Card, Footer, Spinner, Search },
  data() {
    return {
      /* variables */
      current_slide: 0,
      total_slides: 3, // Number of slides
      page_is_loading: true,
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
      blogs: [
        {
          title: "Choosing the Right Family Car: Practical Tips",
          pic: "car-10.jpg",
          content: `
      <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; background: linear-gradient(180deg,#ffffff,#f7fafc); box-shadow: 0 6px 18px rgba(20,20,40,0.06);">
        <h2 style="margin-top:0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">Choosing the Right Family Car: Practical Tips</h2>
        <p style="line-height:1.6; margin-bottom: 12px;">
          Buying a family car is more than just choosing a brand — it's about matching your daily life to a vehicle that brings safety, comfort, and value. Start by listing priorities: <strong>space</strong>, <strong>fuel economy</strong>, and <strong>safety features</strong>. If you often drive with a child seat, check ISOFIX points and rear-door opening width.
        </p>

        <div style="border:1px dashed #cbd5e1; padding:12px; border-radius:8px; background:#f8fafc; margin-bottom:12px;">
          <h3 style="margin:0 0 8px 0;">Quick checklist</h3>
          <ul style="margin:0 0 0 18px; line-height:1.6;">
            <li>Passenger & boot space</li>
            <li>Safety ratings and airbags</li>
            <li>Running costs: fuel, servicing</li>
            <li>Resale value and parts availability</li>
          </ul>
        </div>

        <p style="margin-bottom:0;">
          For many Kenyan families, compact SUVs and reliable hatchbacks strike the balance between economy and practicality. Book a test drive, check tyres and suspension on uneven roads, and always negotiate on warranty and servicing packages.
        </p>
      </div>
    `,
        },

        {
          title: "Keeping Your Used Car Healthy: Maintenance Guide",
          pic: "car-5.jpg",
          content: `
      <div style="border-radius:14px; overflow:hidden; box-shadow: 0 10px 24px rgba(8, 35, 64, 0.06);">
        <div style="background:#0ea5a4; color:white; padding:14px 20px;">
          <h2 style="margin:0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">Keeping Your Used Car Healthy: Maintenance Guide</h2>
        </div>

        <div style="padding:18px; background:linear-gradient(180deg,#ffffff,#fbfdfe); border:2px solid #e6f3f2;">
          <p style="line-height:1.6;">
            A well-maintained used car can run reliably for years. Follow a simple routine: check oil and coolant levels monthly, inspect tyre pressure and tread depth, and replace brake pads before they wear through. Keep a service log — it helps with diagnostics and improves resale trust.
          </p>

          <div style="margin:12px 0; padding:12px; border-left:4px solid #0ea5a4; background:#f0fdfa;">
            <strong>DIY tip:</strong> Keep a small kit in the boot — tyre inflator, basic tools, coolant, and a portable jump-starter. It saves time when small issues arise on the road.
          </div>

          <p style="margin:0;">
            For engine health, follow manufacturer service intervals. If a check-engine light appears, get it scanned early — small sensors are cheap to fix, while ignored problems can become costly.
          </p>
        </div>
      </div>
    `,
        },

        {
          title: "Top 5 Budget Cars in 2024 — Value & Reliability",
          pic: "car-7.jpg",
          content: `
      <div style="padding:18px; border-radius:10px; border:1px solid #f1f5f9; background:linear-gradient(90deg,#ffffff,#fcfcff);">
        <h2 style="margin-top:0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">Top 5 Budget Cars in 2024 — Value & Reliability</h2>
        <p style="line-height:1.6;">
          If you're shopping on a budget, aim for cars with proven reliability and cheap spare parts. Popular choices include small hatchbacks and compact sedans that balance fuel efficiency with low maintenance costs.
        </p>

        <ol style="margin-left:18px; line-height:1.6;">
          <li><strong>Compact hatchbacks:</strong> Great for city use and parking.</li>
          <li><strong>Small sedans:</strong> Comfortable for longer trips and family use.</li>
          <li><strong>Older but well-serviced SUVs:</strong> If you need ground clearance for rural roads.</li>
        </ol>

        <div style="margin-top:12px; padding:12px; border-radius:8px; border:1px solid #e6e9f2; background:#ffffff;">
          <p style="margin:0;">
            When buying, insist on a pre-purchase inspection and check service history. A few extra thousands spent on a certified service now can save you tens later.
          </p>
        </div>
      </div>
    `,
        },

        {
          title: "Preparing Your Car for Long Road Trips",
          pic: "car-1.jpeg",
          content: `
      <div style="border: 1px solid #fde68a; border-radius:12px; background: linear-gradient(180deg,#fffef6,#fff7e6); padding:18px; box-shadow:0 8px 20px rgba(250,200,30,0.06);">
        <h2 style="margin-top:0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">Preparing Your Car for Long Road Trips</h2>
        <p style="line-height:1.6;">
          Long drives across the country are rewarding — when your car is prepared. Start with a full service: oil, filters, brakes and suspension check. Inspect tyres for cuts and even wear; consider replacing tyres with under 3mm tread.
        </p>

        <div style="display:flex; gap:12px; margin:12px 0;">
          <div style="flex:1; border:1px solid #f3e8ff; padding:10px; border-radius:8px; background:#fff7ff;">
            <h4 style="margin:0 0 8px 0;">Pre-trip checklist</h4>
            <ul style="margin:0 0 0 18px; line-height:1.6;">
              <li>Engine oil & coolant levels</li>
              <li>Spare tyre & jack</li>
              <li>Lights & indicators</li>
              <li>Emergency kit & water</li>
            </ul>
          </div>

          <div style="flex:1; border:1px solid #eef2ff; padding:10px; border-radius:8px; background:#f8fbff;">
            <h4 style="margin:0 0 8px 0;">On the road</h4>
            <p style="margin:0; line-height:1.5;">Drive within speed limits, take breaks every 2–3 hours, and keep an eye on dashboard alerts. If a new sound appears, stop and inspect — small issues often reveal themselves early.</p>
          </div>
        </div>

        <p style="margin:0;">With preparation and sensible driving, your trip will be safer and more enjoyable. Safe travels!</p>
      </div>
    `,
        },
        {
          title: "Preparing Your Car for Long Road Trips",
          pic: "car-9.jpg",
          content: `
      <div style="border: 1px solid #fde68a; border-radius:12px; background: linear-gradient(180deg,#fffef6,#fff7e6); padding:18px; box-shadow:0 8px 20px rgba(250,200,30,0.06);">
        <h2 style="margin-top:0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">Preparing Your Car for Long Road Trips</h2>
        <p style="line-height:1.6;">
          Long drives across the country are rewarding — when your car is prepared. Start with a full service: oil, filters, brakes and suspension check. Inspect tyres for cuts and even wear; consider replacing tyres with under 3mm tread.
        </p>

        <div style="display:flex; gap:12px; margin:12px 0;">
          <div style="flex:1; border:1px solid #f3e8ff; padding:10px; border-radius:8px; background:#fff7ff;">
            <h4 style="margin:0 0 8px 0;">Pre-trip checklist</h4>
            <ul style="margin:0 0 0 18px; line-height:1.6;">
              <li>Engine oil & coolant levels</li>
              <li>Spare tyre & jack</li>
              <li>Lights & indicators</li>
              <li>Emergency kit & water</li>
            </ul>
          </div>

          <div style="flex:1; border:1px solid #eef2ff; padding:10px; border-radius:8px; background:#f8fbff;">
            <h4 style="margin:0 0 8px 0;">On the road</h4>
            <p style="margin:0; line-height:1.5;">Drive within speed limits, take breaks every 2–3 hours, and keep an eye on dashboard alerts. If a new sound appears, stop and inspect — small issues often reveal themselves early.</p>
          </div>
        </div>

        <p style="margin:0;">With preparation and sensible driving, your trip will be safer and more enjoyable. Safe travels!</p>
      </div>
    `,
        },
      ],
    };
  },
  /* methods */
  methods: {
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
  },
  /* mounted */
  mounted() {
    document.title = "Drivate - Drive Dreams";
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },
};
</script>
