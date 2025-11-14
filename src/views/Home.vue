<template>
  <p>Hii ni test ya kitu nadai kufanya</p>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar
      :categories="other_categories"
      :contacts="contacts"
      :makes="brands"
      :body_styles="body_styles"
      :prices="price_ranges"
    />

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
                :src="carousel_item?.image_url"
                :alt="carousel_item?.image_alt"
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
                    {{ carousel_item?.heading_1 }}
                  </h1>
                  <h2
                    class="text-3xl font-extrabold uppercase bg-theme-yellow w-fit px-4 mt-2"
                  >
                    {{ carousel_item?.heading_2 }}
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
              @click="filterByMake(make?.id)"
            >
              <div class="w-full flex gap-2 flex-nowrap inner-cat">
                <img
                  :src="make?.image_url"
                  class="w-[30px] min-w-[30px] h-auto"
                />
                <p class="font-semibold cursor-pointer">{{ make?.name }}</p>
              </div>
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
              @click="filterByBodyType(type?.id)"
            >
              <div class="w-full flex gap-2 flex-nowrap inner-cat">
                <img
                  :src="type?.image_url"
                  class="w-[30px] min-w-[30px] filter grayscale h-auto"
                />
                <p class="font-semibold cursor-pointer">{{ type?.name }}</p>
              </div>
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
              @click="filterByPrice(price)"
            >
              <div class="w-full flex gap-2 flex-nowrap inner-cat">
                <img
                  src="/icons/coin.png"
                  class="w-[27px] min-w-[15px] h-fit to-hide"
                />
                <p
                  class="font-semibold text-sm cursor-pointer hover:underline ml-2"
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
              </div>
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
          :locations="locations"
        />
        <!-- New Arrivals -->
        <div class="w-full flex flex-wrap gap-2 p-2 mt-8">
          <div class="w-full">
            <h4 class="font-bold text-lg theme-blue">New Arrivals</h4>
          </div>
          <div class="w-full flex flex-wrap gap-2 mt-4 car-holder">
            <Card car_card :vehicles="all_vehicles" class="w-[32%] mb-2" />
          </div>
        </div>
        <!-- most popular -->
        <div class="w-full flex flex-wrap gap-2 p-2 mt-8">
          <div class="w-full">
            <h4 class="font-bold text-lg theme-blue">Popular</h4>
          </div>
          <div class="w-full flex flex-wrap gap-2 mt-4 car-holder">
            <Card car_card :vehicles="popular_vehicles" class="w-[32%] mb-2" />
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
            @click="filterByModel(model.model_id)"
          >
            <span class="font-semibold cursor-pointer hover:underline text-sm">
              {{ model?.make_name }} {{ model?.model_name }}
            </span>
          </div>
        </div>
        <div class="w-full mt-8">
          <h4 class="font-bold text-lg py-1 px-2 bg-theme-yellow">
            Search by Locations
          </h4>
          <div
            v-for="(location, index) in locations"
            :key="index"
            class="flex flex-nowrap gap-2 py-2"
            style="border-bottom: 1px solid #f4f5f4"
            @click="filterByLocation(location.location_id)"
          >
            <span
              class="font-semibold cursor-pointer hover:underline text-sm"
              >{{ location?.location_name }}</span
            >
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
            {{ about_us?.statement }}
          </p>
        </div>
        <div class="w-1/2 h-[70vh] p-4 flex justify-center relative">
          <div class="h-full relative">
            <div
              class="mt-10 ml-[-15%] h-full bg-transparent w-[80%] absolute flex flex-col justify-end overflow-hidden"
            >
              <div class="h-[60%] bg-[#fffadd] p-[15px]">
                <img :src="about_us?.image_1" class="w-full h-auto" />
              </div>
            </div>
            <!-- 2nd image -->
            <img :src="about_us?.image_2" class="w-auto h-full" />
          </div>
        </div>
        <div class="w-full p-4 flex gap-[1%] flex-wrap mb-4 mt-[15vh] why-us">
          <h1 class="font-extrabold text-2xl w-full mb-8">Why Choose Us?</h1>
          <div
            v-for="(why, index) in about_us?.why_choose_us"
            :key="index"
            class="w-[31%] mt-4 why-inner"
          >
            <div class="w-full flex flex-nowrap gap-2 h-[7vh] to-flex">
              <div>
                <i
                  class="text-[#E6B800] text-2xl p-2 border border-[#E6B800]"
                  :class="why?.icon"
                ></i>
              </div>

              <div class="w-full h-full flex flex-col justify-end">
                <h2 class="text-xl font-bold">{{ why?.heading }}</h2>
              </div>
            </div>

            <!-- description -->
            <p class="mt-2">{{ why?.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- blogs -->
    <div class="w-[90%] mt-24">
      <h4 class="font-bold text-3xl theme-blue">Latest News & Insights</h4>
      <div class="w-full flex flex-wrap gap-2 mt-8 blog-holder no-scrollbar">
        <Card blog_card class="w-[24%]" :blogs="blogs" />
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
import Search from "../components/general/Search.vue";
import Spinner from "../components/general/Spinner.vue";
import Card from "../components/ui/Card.vue";
import { api, slugify } from "../utils/store";
import axios from "axios";
import { useHead } from "@vueuse/head";

export default {
  name: "Home",
  props: {
    about_us: {
      type: String,
      default: null,
    },
    brands: Array,
    body_styles: Array,
    models: Array,
    other_categories: Array,
    price_ranges: Array,
    locations: Array,
    contacts: Array,
  },
  components: { Navbar, Card, Footer, Spinner, Search },
  data() {
    return {
      /* variables */
      current_slide: 0,
      total_slides: "",
      page_is_loading: true,

      // data arrays
      all_vehicles: [],
      popular_vehicles: [],
      carousels: [],
      blogs: [],

      is_make: "make",
      is_brand: "brand",
      is_body_type: "body",
      is_model: "model",
    };
  },
  /* mounted */
  async mounted() {
    this.setupSEO();
    try {
      await Promise.race([
        Promise.all([
          this.getCarousels(),
          this.fetchVehicles(),
          this.fetch_popular_vehicles(),
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
    // get popular vehicles
    async fetch_popular_vehicles() {
      try {
        const response = await axios.get(`${api}/get-popular-vehicles`);

        const data = response.data;

        // Check if the request was successful
        if (data.success) {
          this.popular_vehicles = data.vehicles;

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
        this.popular_vehicles = [];
      }
    },
    //get carousels
    async getCarousels() {
      try {
        const response = await axios.get(`${api}/get-carousels`);
        const data = response.data;

        // console.log("Full response:", data); // Debug log

        if (data.success && data.carousels) {
          this.carousels = data.carousels; // Extract the array
          this.total_slides = this.carousels.length;
        } else {
          this.carousels = []; // Fallback to empty array
          console.warn("No carousels found in response");
        }

        // console.log("Carousels array:", this.carousels); // Debug log
      } catch (error) {
        console.error("Error fetching carousels:", error);
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

    // queries
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
