<template>
  <!-- grid card -->
  <div
    v-if="car_card"
    v-for="(car, index) in vehicles"
    :key="index"
    class="border border-[#eaeaea] hover:shadow-md duration-300 ease-in-out car-card"
    :class="class"
  >
    <router-link :to="`vehicles/view/${slugify(car.name)}`" class="w-full">
      <div class="w-full h-[20vh] overflow-hidden relative">
        <div
          class="w-[30px] h-[30px] absolute z-10 cursor-pointer hover:bg-[#ffcd00]"
        >
          <div class="w-full h-full flex justify-center relative">
            <div
              class="w-full h-full bg-theme-yellow opacity-40 absolute"
            ></div>
            <div class="w-full h-full flex justify-center absolute z-20">
              <div class="h-full flex-col justify-center">
                <i class="fa-regular fa-heart p-1 rounded-full"></i>
              </div>
            </div>
          </div>
        </div>

        <img
          :src="car.primary_image_url"
          class="w-full h-auto max-h-none min-h-full object-cover hover:scale-110 duration-300 ease-in-out"
        />
      </div>
      <div class="w-full p-2 mt-2 mb-2 group">
        <h1
          class="font-semibold text-gray-600 hover:text-[#0066ff] hover:underline"
        >
          {{ car.name }}
        </h1>
        <div class="w-full">
          <p class="text-muted font-semibold mt-2 text-sm text-gray-600">
            <i class="fa-solid fa-location-pin"></i>
            {{ car.location.location_name }}
          </p>
          <p class="text-muted font-semibold mt-2 text-sm text-gray-600">
            {{ car.price.toLocaleString() }} kes
          </p>
        </div>
        <div class="w-full flex flex-wrap mt-2 to-flex">
          <div class="w-1/2 w-full to-full">
            <i
              class="fa-solid fa-phone hover:text-[#0066ff] cursor-pointer"
            ></i>
            <i
              class="fa-brands fa-whatsapp ml-2 hover:text-[#0066ff] cursor-pointer"
            ></i>
            <i
              class="fa-regular fa-envelope ml-2 hover:text-[#0066ff] cursor-pointer"
            ></i>
          </div>
          <div class="w-1/2 w-full to-full mt-2">
            <!-- <Link link_text="Enquire" link_to="#" /> -->
            <!-- <IconButton button_text="View Details" /> -->
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <!-- blog card -->
  <div
    v-if="blog_card"
    v-for="(blog, index) in blogs"
    :key="index"
    class="border-b border-gray-300 py-4 transition-all duration-300 hover:border-[#ffcd00] blog-card"
    :class="class"
  >
    <router-link :to="`/blog/${slugify(blog.title)}`" class="w-full">
      <div class="w-full max-h-[25vh] overflow-hidden">
        <img
          :src="blog.image_url"
          :alt="blog.image_alt"
          class="w-full h-auto"
        />
      </div>
      <div class="w-full mt-4">
        <h1 class="font-semibold text-xxl">
          {{ blog.title }}
        </h1>
      </div>
    </router-link>
  </div>

  <!-- list card -->
  <div
    v-if="list_card"
    class="flex flex-nowrap h-[30vh] overflow-hidden border shadow-sm p-2"
    :class="class"
  >
    <router-link to="/toyota mark x" class="w-full flex flex-nowrap">
      <div class="w-[30%] h-full overflow-hidden">
        <img
          :src="`/images/${car_pic}`"
          class="h-full w-auto max-w-none object-cover"
        />
      </div>
      <div class="w-[70%] h-full ml-2 flex">
        <div class="w-[80%] flex flex-wrap">
          <h2 class="w-full text-gray-800 text-2xl font-bold mb-4">
            {{ car_name }}
          </h2>
          <div class="w-1/4 text-sm">
            <p class="w-full text-gray-500">Mileage</p>
            <p class="w-full font-semibold">{{ mileage }} km</p>
          </div>
          <div class="w-1/4 text-sm">
            <p class="w-full text-gray-500">Year</p>
            <p class="w-full font-semibold">{{ car_year }}</p>
          </div>
          <div class="w-1/4 text-sm">
            <p class="w-full text-gray-500">Engine</p>
            <p class="w-full font-semibold">{{ engine }}</p>
          </div>
          <div class="w-1/4 text-sm">
            <p class="w-full text-gray-500">Location</p>
            <p class="w-full font-semibold">{{ location }}</p>
          </div>
          <!-- second row -->
          <div class="w-1/4 text-sm mt-2">
            <p class="w-full text-gray-500">Steering</p>
            <p class="w-full font-semibold">{{ steering }}</p>
          </div>
          <div class="w-1/4 text-sm mt-2">
            <p class="w-full text-gray-500">Fuel</p>
            <p class="w-full font-semibold">{{ fuel }}</p>
          </div>
          <div class="w-1/4 text-sm mt-2">
            <p class="w-full text-gray-500">Transition</p>
            <p class="w-full font-semibold">{{ transmission }}</p>
          </div>
          <!-- <div class="w-1/4 text-sm mt-2">
            <p class="w-full text-gray-500">Engine</p>
            <p class="w-full font-semibold">3, 000 cc</p>
          </div> -->
        </div>
        <!-- pricing -->
        <div class="w-[20%]">
          <p class="text-xl font-bold theme-blue">Ksh. 2, 000, 000</p>
          <button class="py-1 px-4 bg-[#E6B800] rounded-sm mt-4 w-full">
            ENQUIRE <i class="fa-regular fa-envelope"></i>
          </button>
          <div class="w-full flex mt-4 justify-end">
            <i
              class="fa-solid fa-phone hover:text-[#0066ff] cursor-pointer text-xl"
            ></i>
            <i
              class="fa-brands fa-whatsapp ml-2 hover:text-[#0066ff] cursor-pointer text-xl"
            ></i>
            <i
              class="fa-regular fa-envelope ml-2 hover:text-[#0066ff] cursor-pointer text-xl"
            ></i>
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <!-- review card -->
  <div
    v-if="review_card"
    class="flex flex-nowrap h-auto overflow-hidden border shadow-sm p-2 review-card"
    :class="class"
  >
    <div class="w-[30%] h-auto max-h-[40vh] overflow-hidden img-holder">
      <img
        src="/images/bg-1.jpg"
        class="h-full w-auto max-w-none object-cover"
      />
    </div>
    <div class="w-[70%] h-full ml-2 content-holder">
      <h1 class="text-2xl font-bold">Excellent service from Drivate</h1>
      <div class="w-full flex mt-4">
        <i v-for="i in 4" class="fa-solid fa-star theme-yellow"></i>
      </div>
      <div class="w-full mt-2">
        <p class="text-sm">
          George Kimagut on 07/Aug/2025
          <span class="font-bold"> Verified Buyer </span>
        </p>
      </div>
      <p class="mt-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis,
        voluptatem nihil. Unde vitae, doloremque numquam accusamus aliquid nemo,
        impedit autem molestias, tenetur maxime maiores iusto? Architecto earum
        atque doloremque maxime!
      </p>
    </div>
  </div>
</template>
<script>
import Link from "./text/Link.vue";
import IconButton from "./buttons/IconButton.vue";
import { slugify } from "../../utils/store";
export default {
  name: "Card",
  props: {
    class: String,
    car_card: Boolean,
    list_card: Boolean,
    blog_card: Boolean,
    blog_category: String,
    blog_title: String,
    blog_description: String,
    review_card: Boolean,
    /* car card */
    car_name: String,
    location: String,
    price: String,
    car_pic: String,
    mileage: String,
    car_year: String,
    engine: String,
    steering: String,
    fuel: String,
    transmission: String,

    // arrray data
    blogs: Array,
    vehicles: Array,
  },
  components: { Link, IconButton },

  /* methods */
  methods: {
    slugify,
  },
};
</script>
