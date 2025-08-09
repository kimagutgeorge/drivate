<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar :categories="categories" :contacts="contacts" />
    <div class="w-[90%] flex flex-wrap">
      <!-- blog body -->
      <div class="w-full flex mt-8 gap-4 relative">
        <div
          class="w-[40%] flex flex-wrap justify-center sticky top-5 self-start to-hide-smaller"
        >
          <!-- top stories -->
          <div class="w-[60%] p-4 bg-third mt-8">
            <h2 class="text-2xl font-bold theme-yellow">Related Stories</h2>
            <ul class="mt-4">
              <li
                v-for="(story, index) in top_stories"
                :key="index"
                class="group py-2 cursor-pointer text-gray-700 border-b border-gray-300"
              >
                <p
                  class="group-hover:text-[#0066ff] transition-all duration-300 ease-in-out"
                >
                  {{ story.title }}
                </p>
                <p class="mt-2 text-sm">
                  {{ story.date }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-[60%] to-full-smaller">
          <div class="w-full border-b border-gray-300 py-4">
            <div class="w-full max-h-[50vh] overflow-hidden">
              <img :src="`/images/${blog[0]?.pic}`" class="w-full h-auto" />
            </div>
            <div class="w-full mt-4">
              <div class="w-ful0 flex justify-end gap-2 theme-yellow">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-x-twitter"></i>
              </div>
              <h1 class="font-extrabold text-3xl">
                {{ blog[0]?.title }}
              </h1>
              <div class="w-full mt-2" v-html="blog[0]?.content"></div>
            </div>
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
import Footer from "../../components/general/Footer.vue";
import Navbar from "../../components/general/Navbar.vue";
import Spinner from "../../components/general/Spinner.vue";

export default {
  name: "Blogs",
  components: { Navbar, Spinner, Footer },
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
      top_stories: [
        {
          title: "Tesla Unveils Next-Gen Roadster with Record-Breaking Speed",
          date: "5 July 2024",
        },
        {
          title: "Toyota Launches Affordable EV Line for African Market",
          date: "12 June 2024",
        },
        {
          title: "How AI Is Revolutionizing Car Safety Features",
          date: "28 May 2024",
        },
        {
          title: "The Rise of Hydrogen-Powered Vehicles in 2024",
          date: "14 April 2024",
        },
        {
          title: "Top 10 Fuel-Efficient Cars to Watch This Year",
          date: "2 March 2024",
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
      blog_categories: [
        { name: "Car Reviews" },
        { name: "Car Maintenance Tips" },
        { name: "Electric & Hybrid Vehicles" },
        { name: "Car Buying Guides" },
        { name: "Motorsport News" },
        { name: "Classic & Vintage Cars" },
        { name: "Auto Industry Trends" },
      ],
      blog: [
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
      <p style="line-height:1.6;margin-top:20px;">
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
      ],
    };
  },
  mounted() {
    document.title = "Talkcoms - Blogs";
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },
};
</script>
