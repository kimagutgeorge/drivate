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
    <div class="w-[90%] flex flex-wrap">
      <!-- blog body -->
      <div class="w-full flex mt-8 gap-4 relative">
        <div
          class="w-[40%] flex flex-wrap justify-center sticky top-5 self-start to-hide-smaller"
        >
          <!-- top stories -->
          <div class="w-[60%] p-4 bg-third mt-8">
            <h2 class="text-2xl font-bold theme-yellow">Other Stories</h2>
            <ul class="mt-4">
              <li
                v-for="(blog, index) in blogs"
                :key="index"
                class="group py-2 cursor-pointer text-gray-700 border-b border-gray-300"
              >
                <p
                  class="group-hover:text-[#0066ff] transition-all duration-300 ease-in-out"
                >
                  <router-link
                    :to="`/blogs/view/${blog?.blog_id}/${slugify(blog?.title)}`"
                  >
                    {{ blog?.title }}
                  </router-link>
                </p>
                <p class="mt-2 text-sm">{{ format_date(blog?.created_at) }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-[60%] to-full-smaller">
          <div class="w-full border-b border-gray-300 py-4">
            <div class="w-full max-h-[50vh] overflow-hidden">
              <img :src="blog?.image_url" class="w-full h-auto" />
            </div>
            <div class="w-full mt-4">
              <div class="w-ful0 flex justify-end gap-2 theme-yellow">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-x-twitter"></i>
              </div>
              <h1 class="font-extrabold text-3xl">
                {{ blog?.title }}
              </h1>
              <div
                class="w-full mt-2 blog-content-holder overflow-x-hidden"
                v-html="blog?.content"
              ></div>
            </div>
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
import Footer from "../../components/general/Footer.vue";
import Navbar from "../../components/general/Navbar.vue";
import Spinner from "../../components/general/Spinner.vue";
import { api, slugify } from "../../utils/store";
import axios from "axios";
import { useHead } from "@vueuse/head";

export default {
  name: "Blogs",
  props: {
    brands: Array,
    body_styles: Array,
    models: Array,
    other_categories: Array,
    price_ranges: Array,
    locations: Array,
    contacts: Array,

    // url data
    id: String,
    title: String,
  },
  components: { Navbar, Spinner, Footer },
  // props: ["id", "title"],
  data() {
    return {
      page_is_loading: true,

      // data arrays
      blog: null,
      blogs: [],
    };
  },
  async mounted() {
    this.setupSEO();
    try {
      await Promise.race([
        Promise.all([this.fetchBlogs(), this.getBlogs()]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
        ),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      document.title = "Drivate - " + this.blog.title;
      this.page_is_loading = false;
    }

    this.$watch(
      () => this.$route.params.id,
      async (newId, oldId) => {
        if (newId !== oldId) {
          this.page_is_loading = true; // Add this to show loading state

          try {
            await Promise.race([
              Promise.all([this.fetchBlogs(), this.getBlogs()]),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
              ),
            ]);
          } catch (error) {
            console.error("Loading failed:", error);
          } finally {
            document.title = `Drivate - ${this.name}`;

            this.page_is_loading = false;
          }
        }
      }
    );
  },

  methods: {
    slugify,
    async fetchBlogs() {
      try {
        const response = await axios.get(`${api}/get-blog/${this.id}`);

        const data = response.data;

        // Check if the request was successful
        // console.log("Blogs is: ", this.blog);
        if (data.success) {
          this.blog = data.blog;
          this.content = this.blog.content;

          setTimeout(() => {
            this.response_is_visible = false;
          }, 3000);
        } else {
          // Handle API error response
          throw new Error(data.error || "Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);

        this.response_is_visible = true;
        this.alert_status = false;
        this.response_message = "Failed. Check  your connection";
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
    format_date(date_to_change) {
      if (!date_to_change) return "";
      const date = new Date(date_to_change);
      const date_options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", date_options);
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
