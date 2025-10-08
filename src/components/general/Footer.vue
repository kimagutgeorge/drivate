<template>
  <div class="w-full flex flex-wrap justify-center mt-20 pt-10 bg-third footer">
    <div class="w-[90%] flex">
      <div class="w-[50%] flex flex-wrap hide-footer">
        <div class="w-full">
          <h1 class="font-bold">Buy</h1>
        </div>
        <div class="w-full flex mt-4">
          <div class="w-[33%] p-2">
            <p class="font-bold mb-4">Search By Make</p>
            <p
              class="cursor-pointer hover:underline hover:text-[#0066ff] font-semibold w-fit text-sm text-gray-600"
              v-for="(make, index) in makes"
              :key="index"
              @click="filterByMake(make?.id)"
            >
              <span>
                {{ make.name }}
              </span>
            </p>
          </div>
          <div class="w-[33%] p-2">
            <p class="font-bold mb-4">Search By Price</p>
            <p
              v-for="(price, index) in prices"
              :key="index"
              class="cursor-pointer hover:underline hover:text-[#0066ff] font-semibold w-fit text-sm text-gray-600 cursor-pointer"
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
              }}
            </p>
            <p class="font-bold my-4">Search by body style</p>
            <p
              v-for="(type, index) in body_styles"
              :key="index"
              class="cursor-pointer hover:underline hover:text-[#0066ff] font-semibold w-fit text-sm text-gray-600"
            >
              <span
                class="text-sm font-semibold hover:text-[#0066ff] hover:underline cursor-pointer"
                @click="filterByBodyType(type.id)"
                >{{ type.name }}</span
              >
            </p>
          </div>
          <div class="w-[33%] p-2">
            <p class="font-bold mb-4">Other Categories</p>
            <p
              v-for="(category, index) in categories"
              :key="index"
              class="cursor-pointer hover:underline hover:text-[#0066ff] font-semibold w-fit text-sm text-gray-600"
              @click="filterByCategory(category?.name)"
            >
              {{ category?.name }}
            </p>
            <p class="font-bold my-4">Locations</p>
            <p
              v-for="(location, index) in locations"
              :key="index"
              class="cursor-pointer hover:underline hover:text-[#0066ff] font-semibold w-fit text-sm text-gray-600"
              @click="filterByLocation(location.location_id)"
            >
              {{ location?.location_name }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-[50%] flex inner-footer">
        <div class="w-[33%] p-2 full-footer">
          <p class="font-bold mb-4">Help</p>
          <p
            v-for="(page, index) in help_pages"
            :key="index"
            class="cursor-pointer hover:underline hover:text-[#0066ff] font-semibold w-fit text-sm text-gray-600"
          >
            <router-link :to="page.page_link">
              {{ page.page }}
            </router-link>
          </p>
          <p class="font-bold my-4">Other pages</p>
          <p
            v-for="(page, index) in other_pages"
            :key="index"
            class="cursor-pointer hover:underline hover:text-[#0066ff] font-semibold w-fit text-sm text-gray-600"
          >
            <router-link :to="page.page_link" target="_blank">
              {{ page.page }}
            </router-link>
          </p>
        </div>
        <div class="w-[67%] full-footer">
          <p class="font-bold mb-4">Subscribe to Our Newsletter</p>
          <form @submit.prevent="" class="w-full">
            <input
              type="email"
              placeholder="Enter Your Email"
              class="px-2 py-4 w-full rounded-md"
            />
            <button
              class="w-fit mt-4 bg-[#E6B800] p-4 px-6 font-semibold cursor-pointer rounded-sm"
            >
              Send <i class="fa-regular fa-paper-plane"></i>
            </button>
          </form>
          <div class="w-full flex flex-wrap">
            <p class="w-full font-bold my-6">We are social</p>
            <div class="w-full flex gap-2">
              <div
                v-for="(contact, index) in contacts"
                :key="index"
                class="w-[40px] h-[40px] flex justify-center bg-theme-blue rounded-sm hover:bg-black hover:text-[#0066ff] cursor-pointer transition 0.3s ease-in-out"
              >
                <div class="h-full flex flex-col justify-center">
                  <a
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
                      class="theme-black cursor-pointer text-sm icon transition 0.3s ease-in-out"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <!-- logo -->
            <div class="w-full mt-20">
              <router-link to="/"
                ><img
                  :src="logo"
                  alt="drivate car sellers logo"
                  class="w-[200px] h-auto"
              /></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center p-2 bg-[#4d4d4d] mt-6">
      <div class="w-1/2">
        <p class="text-white text-sm">
          &copy; Drivate 2025. All rigts reserved
        </p>
      </div>
      <div class="w-1/2 flex justify-end pr-10">
        <button @click="back_to_top">
          <i class="fa-solid fa-angle-up left-[95%] theme-yellow text-2xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { slugify } from "../../utils/store";
export default {
  name: "Footer",
  props: {
    makes: Array,
    prices: Array,
    body_styles: Array,
    // categories: Array,
    locations: Array,
    contacts: Array,
  },
  data() {
    return {
      logo: "/logo.png",
      is_body_type: "body",
      is_make: "make",
      help_pages: [
        { page: "Contact us", page_link: "/contact-us" },
        { page: "Import", page_link: "/import-vehicle" },
      ],
      other_pages: [
        { page: "Reviews", page_link: "/reviews" },
        { page: "Blog", page_link: "/blogs" },
        // { page: "Terms of use", page_link: "/terms-of-use" },
        // { page: "Privacy Policy", page_link: "/privacy-policy" },
        // { page: "Site Map", page_link: "/sitemap" },
      ],
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
    back_to_top() {
      window.scrollTo(0, 0);
    },
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
