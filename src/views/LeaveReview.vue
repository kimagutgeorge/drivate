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
    <!-- body -->
    <div class="w-full flex justify-center view-car">
      <div class="w-[80%] flex justify-center mt-8 half-to-full to-flex">
        <div class="w-[60%] half-to-full">
          <form @submit.prevent="sendReview" class="w-fit h-fit">
            <div
              class="w-[90%] border border-[#E6B800] p-4 rounded-md half-to-full"
            >
              <div class="form-group w-full mb-2">
                <label class="text-sm font-bold">Select Vehicle</label>

                <div class="relative mt-2">
                  <!-- Search Input -->
                  <input
                    type="text"
                    class="p-2 w-full border"
                    placeholder="Search by vehicle name"
                    v-model="searchQuery"
                    @focus="showDropdown = true"
                    @blur="handleBlur"
                    @keydown="handleKeydown"
                    autocomplete="off"
                    required
                  />

                  <!-- Dropdown Icon -->
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                  >
                    <i
                      class="fa-solid"
                      :class="
                        showDropdown && filteredVehicleNames.length > 0
                          ? 'fa-angle-up'
                          : 'fa-angle-down'
                      "
                    ></i>
                  </div>

                  <!-- Dropdown List -->
                  <div
                    v-if="showDropdown && filteredVehicleNames.length > 0"
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto"
                  >
                    <div
                      v-for="(vehicle_name, index) in filteredVehicleNames"
                      :key="vehicle_name?.car_id || vehicle_name?.id"
                      :class="[
                        'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                        selectedIndex === index ? 'bg-blue-100' : '',
                      ]"
                      @mousedown="selectVehicleName(vehicle_name)"
                      @mouseenter="selectedIndex = index"
                    >
                      <div class="font-medium text-gray-900 flex flex-nowrap">
                        {{ vehicle_name?.name }}
                      </div>
                    </div>
                  </div>

                  <!-- No results message -->
                  <div
                    v-if="
                      showDropdown &&
                      filteredVehicleNames.length === 0 &&
                      searchQuery
                    "
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-gray-500 text-center"
                  >
                    No vehicle found for "{{ searchQuery }}"
                  </div>
                </div>

                <!-- Hidden input for form submission -->
                <input type="hidden" v-model="car_id" required />
              </div>
              <label class="text-sm font-bold">Title</label>
              <input
                type="text"
                class="p-2 w-full border mb-4 mt-1"
                placeholder="Review title"
                v-model="review_title"
                required
              />
              <label class="text-sm font-bold">Your Name</label>
              <input
                type="text"
                class="p-2 w-full border mb-4 mt-1"
                placeholder="Full Name"
                v-model="full_name"
              />
              <label class="text-sm font-bold">Image (optional)</label>
              <input
                type="file"
                @change="onImageChange"
                accept="image/*"
                class="p-2 w-full border mb-4 mt-1"
              />
              <div v-if="previewImage" class="mt-2">
                <p>Preview:</p>
                <img
                  :src="previewImage"
                  alt="Preview"
                  class="max-h-40 shadow"
                />
              </div>
              <label class="text-sm font-bold">Review</label>
              <textarea
                class="p-2 w-full border mb-4 mt-1 h-[150px]"
                placeholder="Type your review"
                v-model="review_content"
                required
              ></textarea>
              <label class="text-sm font-bold">Rating</label>
              <div class="mt-1 w-full flex flex-nowrap">
                <i
                  v-for="index in 5"
                  :key="index"
                  @click="set_rating(index)"
                  class="fa-solid fa-star cursor-pointer"
                  :class="
                    current_rating >= index ? 'text-[#ffcd00]' : 'text-gray-400'
                  "
                />
              </div>
              <button class="bg-[#E6B800] p-2 px-4 rounded-md mt-4">
                Send <i class="fa-regular fa-paper-plane ml-2"></i>
              </button>
            </div>
          </form>
          <div class="mt-4">
            <p>{{ response_message }}</p>
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
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import Spinner from "../components/general/Spinner.vue";
import Map from "../components/general/Map.vue";
import { api } from "../utils/store";
import axios from "axios";
import { useHead } from "@vueuse/head";

export default {
  name: "Leave Review",
  props: {
    brands: Array,
    body_styles: Array,
    models: Array,
    other_categories: Array,
    price_ranges: Array,
    locations: Array,
    contacts: Array,
  },
  components: { Navbar, Spinner, Footer, Map },
  data() {
    return {
      page_is_loading: true,
      current_rating: 0,
      vehicle_names: [],
      previewImage: null,
      image: null,

      // search query
      car_id: "",
      searchQuery: "",
      showDropdown: false,
      selectedIndex: -1,

      //form data
      review_title: "",
      full_name: "",
      selected_rating: "",
      review_content: "",

      //message prompt
      response_message: "",
    };
  },
  /* mounted */
  async mounted() {
    this.setupSEO();
    document.title = "Drivate - Leave a Review";
    try {
      await Promise.race([
        Promise.all([this.getVehicleNames()]),
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
  computed: {
    //search vehicle_names for dropdown
    filteredVehicleNames() {
      if (!this.searchQuery) {
        return this.vehicle_names;
      }
      return this.vehicle_names.filter((vehicle_name) =>
        vehicle_name.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    set_rating(index) {
      this.current_rating = index;
      this.selected_rating = index;
    },
    async getVehicleNames() {
      try {
        const response = await axios.get(`${api}/get-vehicle-names`);
        const data = response.data;

        if (data.success) {
          this.vehicle_names = data.vehicle_names; // Extract the array
        } else {
          this.vehicle_names = []; // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching vehicle_names:", error);
      }
    },

    // vehicle_name search and selection logic
    selectVehicleName(vehicle_name) {
      this.car_id = vehicle_name.car_id || vehicle_name.id;
      this.make = vehicle_name.name;
      this.searchQuery = vehicle_name.name;
      this.showDropdown = false;
      this.selectedIndex = -1;
    },

    handleBlur() {
      // Delay hiding dropdown to allow for selection
      setTimeout(() => {
        this.showDropdown = false;
        this.selectedIndex = -1;
      }, 200);
    },

    handleKeydown(event) {
      if (!this.showDropdown) {
        this.showDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.selectedIndex = Math.min(
            this.selectedIndex + 1,
            this.filteredVehicleNames.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.selectedIndex >= 0 &&
            this.filteredVehicleNames[this.selectedIndex]
          ) {
            this.selectVehicleName(
              this.filteredVehicleNames[this.selectedIndex]
            );
          }
          break;
        case "Escape":
          this.showDropdown = false;
          this.selectedIndex = -1;
          break;
      }
    },
    //change image
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        // preview
        this.previewImage = URL.createObjectURL(file);
      }
    },

    // save review
    async sendReview() {
      try {
        const formData = new FormData();
        formData.append("car_id", this.car_id);
        formData.append("title", this.review_title);
        formData.append("rating", this.selected_rating);
        formData.append("review", this.review_content);
        formData.append("reviewer", this.full_name);
        if (this.image) {
          formData.append("image", this.image);
        }

        const response = await axios.post(`${api}/add-review`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data;

        if (data.success) {
          this.response_message = data.message;
        } else {
          this.response_message = data.message;
        }
      } catch (error) {
        console.error(error);
        this.response_message = "Failed to send review. Please try again later";
      }

      setTimeout(() => {
        this.clearForm();
      }, 1500);
    },

    clearForm() {
      this.review_title = "";
      this.full_name = "";
      this.selected_rating = "";
      this.review_content = "";
      this.response_message = "";
      this.car_id = "";
      this.current_rating = 0;
      this.previewImage = null;
      this.image = null;
      this.searchQuery = "";
    },

    /*
     *
     * SEO SETUP
     *
     *
     */
    setupSEO() {
      // Helper function to get contact by type
      const getContact = (type) => {
        return this.contacts?.find((c) => c.type === type)?.value || null;
      };

      // Get social media links
      const getSocialLinks = () => {
        const socials =
          this.contacts?.filter((c) => c.type === "social" && c.social_link) ||
          [];
        return socials.map((s) => s.social_link);
      };

      // Format phone number for international use
      const formatPhoneNumber = (phone) => {
        if (!phone) return "+254-XXX-XXXXXX";
        const cleanPhone = phone.replace(/^0/, "");
        return `+254${cleanPhone}`;
      };

      const phone = getContact("phone");
      const email = getContact("email");
      const whatsapp = getContact("whatsapp");
      const socialLinks = getSocialLinks();

      useHead({
        title:
          "Drivate Kenya - Buy & Sell Quality Cars in Kenya | New & Used Vehicles",

        meta: [
          {
            name: "description",
            content:
              "Drivate is Kenya's premier car marketplace. Browse thousands of quality new and used cars for sale across Kenya. Find your dream car with verified dealers, competitive prices, and flexible financing options. Shop sedans, SUVs, trucks, and more from top brands.",
          },
          {
            name: "keywords",
            content:
              "buy cars Kenya, sell cars Kenya, used cars Nairobi, new cars Kenya, car dealership Kenya, vehicles for sale Kenya, affordable cars Kenya, car financing Kenya, Japanese used cars Kenya, SUVs Kenya, sedan Kenya, trucks Kenya, Drivate Kenya, car marketplace Kenya",
          },
          {
            name: "author",
            content: "Drivate Kenya",
          },
          {
            name: "robots",
            content:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            name: "language",
            content: "English",
          },
          {
            name: "revisit-after",
            content: "7 days",
          },
          {
            name: "coverage",
            content: "Kenya",
          },
          {
            name: "distribution",
            content: "global",
          },
          {
            name: "rating",
            content: "general",
          },

          // Open Graph / Facebook Meta Tags
          {
            property: "og:type",
            content: "website",
          },
          {
            property: "og:url",
            content: "https://www.drivate.co.ke/",
          },
          {
            property: "og:title",
            content: "Drivate Kenya - Buy & Sell Quality Cars in Kenya",
          },
          {
            property: "og:description",
            content:
              "Kenya's trusted car marketplace. Browse thousands of quality new and used vehicles. Find sedans, SUVs, trucks from verified dealers with competitive prices and financing options.",
          },
          {
            property: "og:image",
            content: "https://www.drivate.co.ke/og-image.jpg",
          },
          {
            property: "og:image:width",
            content: "1200",
          },
          {
            property: "og:image:height",
            content: "630",
          },
          {
            property: "og:site_name",
            content: "Drivate Kenya",
          },
          {
            property: "og:locale",
            content: "en_KE",
          },

          // Twitter Card Meta Tags
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:url",
            content: "https://www.drivate.co.ke/",
          },
          {
            name: "twitter:title",
            content: "Drivate Kenya - Buy & Sell Quality Cars",
          },
          {
            name: "twitter:description",
            content:
              "Kenya's premier car marketplace. Browse quality new & used vehicles with verified dealers and flexible financing.",
          },
          {
            name: "twitter:image",
            content: "https://www.drivate.co.ke/twitter-image.jpg",
          },

          // Mobile Optimization
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
          },
          {
            name: "theme-color",
            content: "#E6B800",
          },
          {
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
          },

          // Geographic Targeting
          {
            name: "geo.region",
            content: "KE",
          },
          {
            name: "geo.placename",
            content: "Nairobi",
          },
          {
            name: "geo.position",
            content: "-1.286389;36.817223",
          },
          {
            name: "ICBM",
            content: "-1.286389, 36.817223",
          },
        ],

        link: [
          {
            rel: "canonical",
            href: "https://www.drivate.co.ke/",
          },
          {
            rel: "icon",
            type: "image/png",
            href: "/favicon.png",
          },
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
          },
          {
            rel: "alternate",
            hreflang: "en-ke",
            href: "https://www.drivate.co.ke/",
          },
          {
            rel: "alternate",
            hreflang: "x-default",
            href: "https://www.drivate.co.ke/",
          },
        ],

        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Drivate Kenya",
              description:
                "Kenya's premier car marketplace for buying and selling quality new and used vehicles",
              url: "https://www.drivate.co.ke",
              logo: "https://www.drivate.co.ke/logo.png",
              image: "https://www.drivate.co.ke/og-image.jpg",
              telephone: phone ? formatPhoneNumber(phone) : "+254759200998",
              email: email || "geojimagut@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tom Mboya Street",
                addressLocality: "Mombasa",
                addressRegion: "Mombasa County",
                postalCode: "00100",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-4.0435",
                longitude: "39.6682",
              },
              priceRange: "KES 500,000 - KES 20,000,000",
              areaServed: {
                "@type": "Country",
                name: "Kenya",
              },
              sameAs:
                socialLinks.length > 0
                  ? socialLinks
                  : [
                      "https://www.facebook.com/drivate",
                      "https://www.instagram.com/drivate",
                      "https://twitter.com/drivate",
                    ],
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Drivate Kenya",
              url: "https://www.drivate.co.ke",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.drivate.co.ke/vehicles?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Drivate Kenya",
              url: "https://www.drivate.co.ke",
              logo: "https://www.drivate.co.ke/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: phone ? formatPhoneNumber(phone) : "+254759200998",
                  contactType: "Customer Service",
                  areaServed: "KE",
                  availableLanguage: ["English", "Swahili"],
                },
                ...(whatsapp
                  ? [
                      {
                        "@type": "ContactPoint",
                        telephone: formatPhoneNumber(whatsapp),
                        contactType: "Customer Support",
                        contactOption: "TollFree",
                        areaServed: "KE",
                        availableLanguage: ["English", "Swahili"],
                      },
                    ]
                  : []),
              ],
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.drivate.co.ke",
              name: "Drivate Kenya",
              image: "https://www.drivate.co.ke/logo.png",
              telephone: phone ? formatPhoneNumber(phone) : "+254759200998",
              email: email || "geojimagut@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tom Mboya Street",
                addressLocality: "Mombasa",
                addressRegion: "Mombasa County",
                postalCode: "00100",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-4.0435",
                longitude: "39.6682",
              },
              url: "https://www.drivate.co.ke",
              priceRange: "KES 500,000 - KES 20,000,000",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "08:00",
                  closes: "18:00",
                },
              ],
              sameAs:
                socialLinks.length > 0
                  ? socialLinks
                  : [
                      "https://www.facebook.com/drivate",
                      "https://www.instagram.com/drivate",
                      "https://twitter.com/drivate",
                    ],
            }),
          },
        ],

        htmlAttrs: {
          lang: "en",
          dir: "ltr",
        },

        bodyAttrs: {
          class: "drivate-home",
        },
      });
    },
  },
};
</script>
