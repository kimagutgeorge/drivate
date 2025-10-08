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

    <div class="w-[90%] flex flex-wrap mt-8">
      <div class="w-full h-[40vh] overflow-hidden mt-6 relative view-car">
        <!-- background -->
        <div class="w-full h-full absolute">
          <img
            :src="about_us?.image_1"
            :alt="about_us?.image_1_alt"
            class="w-full min-w-full max-w-none h-auto min-h-full"
          />
        </div>
        <!-- dark panel -->
        <div class="w-full h-full opacity-50 bg-black absolute z-10"></div>
        <!-- front side -->
        <div
          class="w-full h-full flex flex-col justify-center z-20 absolute p-4"
        >
          <h2 class="font-bold text-2xl text-white">
            Frequenly Asked Questions
          </h2>
          <div
            class="w-[30%] flex flex-nowrap gap-2 bg-[#fffadd] p-2 mt-4 half-to-full"
          >
            <input
              type="text"
              v-model="search_input"
              placeholder="Search"
              class="p-2 w-full bg-[#fffadd] focus:outline-none"
            />
            <button
              @click="search_faq"
              class="p-2 h-full flex flex-col justify-center"
            >
              <i class="fa-solid fa-search theme-blue text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full flex content">
        <div class="w-[30%] sticky top-[15vh] pt-6 self-start">
          <p
            class="py-1 px-4 full cursor-pointer border w-fit mb-1 hover:bg-[#FFF199] hover:font-bold hover:border-[#FFF199]"
            :class="
              selected_category == 'All'
                ? 'bg-[#FFF199] font-bold border-[#FFF199]'
                : 'border-gray-300'
            "
            @click="filter_category('All')"
          >
            All Faqs
          </p>
          <p
            v-for="(category, index) in categories"
            :key="index"
            class="py-1 px-4 full cursor-pointer border w-fit mb-1 hover:bg-[#FFF199] hover:font-bold hover:border-[#FFF199]"
            :class="
              selected_category == category.category_name
                ? 'bg-[#FFF199] font-bold border-[#FFF199]'
                : 'border-gray-300'
            "
            @click="filter_category(category?.category_name)"
          >
            {{ category?.category_name }}
          </p>
        </div>
        <div class="w-[70%] view-car">
          <Accordion :faqs="faqs" has_chat />
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
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
import Spinner from "../components/general/Spinner.vue";
import Accordion from "../components/Accordion.vue";
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import { api } from "../utils/store";
import axios from "axios";
import { useHead } from "@vueuse/head";

export default {
  name: "Faqs",
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
  components: { Accordion, Spinner, Footer, Navbar },
  data() {
    return {
      page_is_loading: true,
      categories: [],
      faqs: [],
      selected_category: "All",
      search_input: "",
    };
  },
  /* mounted */
  async mounted() {
    this.setupSEO();
    document.title = "Drivate - Frequently Asked Questions";
    try {
      await Promise.race([
        Promise.all([this.getFaqs(), this.getCategories()]),
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

  methods: {
    filter_category(category) {
      this.selected_category = category;
      this.faqs = this.all_faqs_tracker;
      if (this.selected_category == "All") {
        return;
      }

      this.filtered_faqs = this.faqs.filter(
        (faq) => faq.category_name === this.selected_category
      );
      this.faqs = this.filtered_faqs;
    },
    async search_faq() {
      try {
        const response = await axios.get(
          api + "/search-faq/" + this.search_input
        );
        const data = response.data;
        if (data.success) {
          this.faqs = data.faqs;
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getFaqs() {
      try {
        const response = await axios.get(`${api}/get-faqs`);
        const data = response.data;
        if (data.success && data.faqs) {
          this.faqs = data.faqs;
          this.all_faqs_tracker = data.faqs;
        } else {
          this.faqs = [];
          this.show_success("No faqs found in response");
        }
      } catch (error) {
        this.show_error(error);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get(`${api}/get-faq-categories`);
        const data = response.data;
        if (data.success) {
          this.categories = data.categories; // Extract the array
        } else {
          this.categories = []; // Fallback to empty array
          this.show_error(data.error);
        }
      } catch (error) {
        this.show_error(error);
        this.categories = []; // Set to empty array on error
      }
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
                latitude: "4.0435",
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
                latitude: "4.0435",
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
