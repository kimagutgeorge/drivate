<template>
  <div class="w-full flex flex-wrap justify-center">
    <!-- <div v-if="has_top_bar" class="w-full h-[6vh] overflow-hidden">
      <router-link to="/vehicles">
        <img src="/images/advert-image.jpg" class="w-full h-auto" />
      </router-link>
    </div> -->
    <div class="w-full flex justify-end bg-theme-gray text-white px-[5%] py-1">
      <!-- <div class="w-1/2 flex justify-end"> -->
      <span class="mr-8 text-sm"
        ><span class="text-bold mr-2">Currency</span>
        <select class="bg-theme-gray border border-white">
          <option>KES</option>
        </select></span
      >
      <a
        v-for="(contact, index) in contacts"
        :key="index"
        :href="
          contact.type === 'phone'
            ? `tel:${contact.value}`
            : contact.type === 'email'
            ? `mailto:${contact.value}`
            : contact.type === 'whatsapp'
            ? `https://wa.me/${contact.value}`
              ? contact.type === 'social'
              : contact.value
            : contact.social_link
        "
        :target="
          contact.type === 'social'
            ? '_blank'
            : contact.type === 'whatsapp'
            ? '_blank'
            : ''
        "
      >
        <!-- <div
            class="w-[30px] h-[30px] rounded-full flex justify-center bg-black ml-1 overflow-hidden"
          > -->
        <!-- <div class="h-full flex flex-col justify-center roll-over"> -->
        <i
          :class="
            contact.icon
              ? contact.icon
              : contact.type === 'email'
              ? 'fa-regular fa-envelope'
              : contact.type === 'phone'
              ? 'fa-solid fa-phone'
              : contact.type === 'whatsapp'
              ? 'fa-brands fa-whatsapp'
              : ''
          "
          class="theme-black ml-2 cursor-pointer text-sm icon text-[#E6B800] hover:text-[#0066ff] transition 0.3s ease-in-out"
        ></i>
        <!-- </div> -->
        <!-- </div> -->
      </a>
      <!-- </div> -->
    </div>
  </div>
  <div
    class="w-full flex flex-wrap sticky top-0 z-[1000] bg-white big-navigation"
  >
    <div class="w-full h-full flex justify-center mt-4 pt-2">
      <div class="w-[90%] flex py-2">
        <div class="w-fit">
          <router-link to="/"
            ><img :src="logo" class="w-[150px]"
          /></router-link>
        </div>
        <div class="w-full flex justify-center">
          <div
            @mouseenter="is_available = true"
            @mouseleave="is_available = false"
            class="py-2 px-4 cursor-pointer hover:bg-[#f4f5f4] hover:text-[#0066ff] h-full text-lg font-bold"
            :class="is_available ? 'bg-[#f4f5f4] text-[#0066ff]' : ''"
          >
            <router-link to="/vehicles" active-class="text-[#0066ff] "
              >Available Cars <i class="fa-solid fa-angle-down"></i
            ></router-link>
          </div>
          <div class="group cursor-pointer hover:bg-[#f4f5f4] h-full relative">
            <div class="w-fit text-lg font-bold py-2 px-4 hover:text-[#0066ff]">
              Quick Links <i class="fa-solid fa-angle-down"></i>
            </div>

            <!-- Show on hover -->
            <div
              class="w-full p-2 shadow-md hidden group-hover:block absolute bg-white"
            >
              <li class="list-none mb-2 hover:text-[#0066ff] hover:underline">
                <router-link to="/blogs">Blogs</router-link>
              </li>
              <li class="list-none mb-2 hover:text-[#0066ff] hover:underline">
                <router-link to="/reviews">Reviews</router-link>
              </li>
              <li class="list-none mb-2 hover:text-[#0066ff] hover:underline">
                <router-link to="/faqs">FAQs</router-link>
              </li>
            </div>
          </div>
          <router-link
            to="/contact-us"
            class="py-2 px-4 cursor-pointer hover:bg-[#f4f5f4] hover:text-[#0066ff] h-full text-lg font-bold"
            >Contact us</router-link
          >
          <router-link
            to="/sell-car"
            class="py-2 px-4 cursor-pointer hover:bg-[#f4f5f4] hover:text-[#0066ff] h-full text-lg font-bold"
            >Sell Car</router-link
          >
          <router-link
            to="/import-vehicle"
            class="py-2 px-4 cursor-pointer hover:bg-[#f4f5f4] hover:text-[#0066ff] h-full text-lg font-bold"
            >Import</router-link
          >
        </div>
      </div>
      <!-- navigation bar -->
    </div>

    <!-- dropdowns -->
    <div
      v-if="is_available"
      @mouseenter="is_available = true"
      @mouseleave="is_available = false"
      class="w-full flex justify-center relative mt-[-20px]"
    >
      <div class="w-[80%] bg-sec absolute flex z-50 p-4 shadow-md">
        <div class="w-[25%]">
          <router-link
            to="/vehicles"
            class="theme-blue font-semibold hover:text-[#0066ff] hover:underline"
            >Search all from stock</router-link
          >
          <h4 class="mt-4 font-bold text-sm theme-blue">SHOP BY MAKE</h4>
          <li v-for="(make, index) in makes" :key="index" class="list-none">
            <span
              class="text-sm font-semibold hover:underline hover:text-[#0066ff] cursor-pointer"
              @click="filterByMake(make?.id)"
              >{{ make.name }}</span
            >
          </li>
        </div>
        <!-- body type -->
        <div class="w-[25%]">
          <h4 class="font-bold text-sm theme-blue">SHOP BY TYPE</h4>
          <li
            v-for="(type, index) in body_styles"
            :key="index"
            class="list-none"
          >
            <span
              class="text-sm font-semibold hover:text-[#0066ff] hover:underline cursor-pointer"
              @click="filterByBodyType(type.id)"
              >{{ type.name }}</span
            >
          </li>
        </div>
        <!-- price -->
        <div class="w-[25%]">
          <h4 class="font-bold text-sm theme-blue">SHOP BY PRICE</h4>
          <li v-for="(price, index) in prices" :key="index" class="list-none">
            <span
              class="text-sm font-semibold hover:text-[#0066ff] hover:underline cursor-pointer"
              @click="filterByPrice(price)"
            >
              {{
                price?.min_price === 0
                  ? "Less than"
                  : price?.min_price.toLocaleString()
              }}
              -
              {{
                price?.max_price === 0
                  ? "More than"
                  : price?.max_price.toLocaleString()
              }}</span
            >
          </li>
        </div>
        <div class="w-[25%]">
          <h4 class="font-bold text-sm theme-blue">OTHER CATEGORIES</h4>
          <li
            v-for="(category, index) in categories"
            :key="index"
            class="list-none"
          >
            <span
              class="cursor-pointer text-sm font-semibold hover:text-[#0066ff] hover:underline"
              @click="filterByCategory(category?.name)"
              >{{ category.name }}</span
            >
          </li>
        </div>
      </div>
    </div>
  </div>
  <!-- phone navigation -->
  <div
    class="w-full flex-wrap sticky top-0 z-[1000] py-4 p-[5%] bg-white phone-navigation border-b border-[#eaeaea]"
    :class="phone_navigation ? 'shadow-md' : ''"
  >
    <div class="w-1/2">
      <div class="w-fit">
        <router-link to="/"><img :src="logo" class="w-[150px]" /></router-link>
      </div>
    </div>
    <div class="w-1/2 flex justify-end">
      <div
        @click="phone_navigation = !phone_navigation"
        class="p-2 rounded-sm bg-theme-blue group cursor-pointer w-fit"
      >
        <!-- Top bar -->
        <div
          class="w-[25px] h-[3px] bg-white transition-transform duration-300 origin-center"
          :class="phone_navigation ? 'rotate-45 translate-y-[11px]' : ''"
        ></div>

        <!-- Middle bar -->
        <div
          class="w-[25px] h-[3px] bg-white my-[6px] transition-opacity duration-300"
          :class="phone_navigation ? 'opacity-0' : 'opacity-100'"
        ></div>

        <!-- Bottom bar -->
        <div
          class="w-[25px] h-[3px] bg-white transition-transform duration-300 origin-center"
          :class="phone_navigation ? '-rotate-45 -translate-y-[11px]' : ''"
        ></div>
      </div>
    </div>
  </div>
  <!-- main phone navigation -->
  <div
    v-if="phone_navigation"
    class="w-full h-[100vh] sticky top-0 mt-[-20vh] z-[1100]"
  >
    <div class="w-full h-full relative">
      <div
        @click="phone_navigation = !phone_navigation"
        class="w-full h-full bg-black opacity-50 transition-all duration-300 ease-in-out absolute z-10"
      >
        <!-- dark background -->
      </div>
      <!-- content -->
      <div
        class="w-[80%] h-full max-w-[450px] bg-white absolute p-4 z-20 transition-all duration-300 ease-in-out move-in-animation"
      >
        <div
          class="w-full max-h-full overflow-y-scroll custom-scrollbar pr-[3px]"
        >
          <p class="font-bold w-full mt-2 py-2 border-b">
            <router-link to="/">Home</router-link>
          </p>
          <div class="w-full mt-2 border-b py-2">
            <p
              @click="filter_is_hidden = !filter_is_hidden"
              class="w-full font-bold"
            >
              Available Cars
              <i
                class="fa-solid"
                :class="filter_is_hidden ? 'fa-angle-up' : 'fa-angle-down'"
              ></i>
            </p>
            <div v-if="filter_is_hidden" class="w-full mt-4">
              <div class="w-full mt-2">
                <router-link
                  to="/vehicles"
                  class="theme-blue font-semibold hover:text-[#0066ff] hover:underline"
                  >Search all from stock</router-link
                >
                <h4 class="mt-4 font-bold text-sm theme-blue">SHOP BY MAKE</h4>
                <li
                  v-for="(make, index) in makes"
                  :key="index"
                  class="list-none"
                >
                  <span
                    class="text-sm font-semibold hover:underline hover:text-[#0066ff] cursor-pointer"
                    @click="filterByMake(make?.id)"
                    >{{ make.name }}</span
                  >
                </li>
              </div>
              <!-- body type -->
              <div class="w-full mt-2">
                <h4 class="font-bold text-sm theme-blue">SHOP BY TYPE</h4>
                <li
                  v-for="(type, index) in body_styles"
                  :key="index"
                  class="list-none"
                >
                  <span
                    class="text-sm font-semibold hover:text-[#0066ff] hover:underline cursor-pointer"
                    @click="filterByBodyType(type.id)"
                    >{{ type.name }}</span
                  >
                </li>
              </div>
              <!-- price -->
              <div class="w-full mt-2">
                <h4 class="font-bold text-sm theme-blue">SHOP BY PRICE</h4>
                <li
                  v-for="(price, index) in prices"
                  :key="index"
                  class="list-none"
                >
                  <span
                    class="text-sm font-semibold hover:text-[#0066ff] hover:underline cursor-pointer"
                    @click="filterByPrice(price)"
                  >
                    {{
                      price?.min_price === 0
                        ? "Less than"
                        : price?.min_price.toLocaleString()
                    }}
                    -
                    {{
                      price?.max_price === 0
                        ? "More than"
                        : price?.max_price.toLocaleString()
                    }}</span
                  >
                </li>
              </div>
              <div class="w-full mt-2">
                <h4 class="font-bold text-sm theme-blue">OTHER CATEGORIES</h4>
                <li
                  v-for="(category, index) in categories"
                  :key="index"
                  class="list-none"
                >
                  <span
                    class="cursor-pointer text-sm font-semibold hover:text-[#0066ff] hover:underline"
                    @click="filterByCategory(category?.name)"
                    >{{ category.name }}</span
                  >
                </li>
              </div>
            </div>
          </div>
          <p class="font-bold w-full mt-2 border-b py-2">
            <router-link to="/blogs">Blogs</router-link>
          </p>
          <p class="font-bold w-full mt-2 border-b py-2">
            <router-link to="/reviews">Reviews</router-link>
          </p>
          <p class="font-bold w-full mt-2 border-b py-2">
            <router-link to="/faqs">FAQs</router-link>
          </p>
          <p class="font-bold w-full mt-2 border-b py-2">
            <router-link to="/contact-us">Contact us</router-link>
          </p>
          <p class="font-bold w-full mt-2 border-b py-2">
            <router-link to="/sell-car">Sell car</router-link>
          </p>
          <p class="font-bold w-full mt-2 border-b py-2">
            <router-link to="/import-vehicle">Import</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { slugify } from "../../utils/store";

export default {
  name: "Navbar",
  props: {
    // categories: Array,
    contacts: Array,
    has_top_bar: Boolean,
    makes: Array,
    body_styles: Array,
    prices: Array,
  },
  data() {
    return {
      logo: "/logo.png",
      is_available: false,
      phone_navigation: false,
      filter_is_hidden: false,
      is_make: "make",
      is_body_type: "type",
      categories: [
        { name: "Petrol" },
        { name: "Diesel" },
        { name: "Hybrid" },
        { name: "Electric" },
        { name: "Other" },
      ],
    };
  },

  /* methods */
  methods: {
    slugify,
    // New filter methods for sidebar clicks
    filterByMake(makeId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, make: makeId },
      });
    },

    filterByModel(modelId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, model: modelId },
      });
    },

    filterByBodyType(bodyId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, body: bodyId },
      });
    },

    filterByPrice(priceRange) {
      // Assuming price_ranges have min_price and max_price properties
      const query = { ...this.$route.query };
      if (priceRange.min_price) query.min_price = priceRange.min_price;
      if (priceRange.max_price) query.max_price = priceRange.max_price;
      this.$router.push({ path: "/vehicles", query });
    },

    filterByLocation(locationId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, location: locationId },
      });
    },

    filterByCategory(categoryId) {
      this.$router.push({
        path: "/vehicles",
        query: { ...this.$route.query, category: categoryId },
      });
    },
  },
};
</script>
