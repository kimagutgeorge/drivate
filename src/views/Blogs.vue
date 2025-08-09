<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar :categories="categories" :contacts="contacts" />
    <div class="w-[90%] flex flex-wrap">
      <div class="w-full h-[40vh] overflow-hidden mt-6 relative view-car">
        <!-- background -->
        <div class="w-full h-full absolute">
          <img src="/static/about-us1.jpg" class="w-full h-auto" />
        </div>
        <!-- dark panel -->
        <div class="w-full h-full opacity-50 bg-black absolute z-10"></div>
        <!-- front side -->
        <div
          class="w-full h-full flex flex-col justify-center z-20 absolute p-4"
        >
          <h2 class="font-bold text-2xl text-white">Blogs</h2>
          <div
            class="w-[30%] flex flex-nowrap gap-2 bg-[#fffadd] p-2 mt-4 half-to-full"
          >
            <input
              type="text"
              placeholder="Search"
              class="p-2 w-full bg-[#fffadd] focus:outline-none"
            />
            <button class="p-2 h-full flex flex-col justify-center">
              <i class="fa-solid fa-search theme-blue text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- blog body -->
      <div class="w-full flex mt-20 gap-4 content">
        <div class="w-[40%] flex flex-wrap sticky top-[15vh] self-start">
          <p
            v-for="(category, index) in blog_categories"
            :key="index"
            class="w-[60%] px-4 bg-third transition-all duration-300 ease-in-out hover:text-[#0066ff] py-2 cursor-pointer text-gray-700 border-b border-gray-300"
          >
            {{ category.name }}
          </p>
          <!-- top stories -->
        </div>
        <div class="w-[60%] view-car">
          <div
            v-for="(blog, index_) in blogs"
            :key="index"
            class="w-full border-b border-gray-300 py-4 transition-all duration-300 hover:border-[#ffcd00]"
          >
            <router-link to="read-blog" class="w-full">
              <div class="w-full max-h-[50vh] overflow-hidden">
                <img :src="`/images/${blog.pic}`" class="w-full h-auto" />
              </div>
              <div class="w-full mt-4">
                <div class="w-ful0 flex justify-end gap-2 theme-yellow">
                  <i class="fa-brands fa-facebook-f"></i>
                  <i class="fa-brands fa-instagram"></i>
                  <i class="fa-brands fa-x-twitter"></i>
                </div>
                <h1 class="font-extrabold text-3xl">
                  {{ blog.title }}
                </h1>
                <p class="text-[#333333] mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque iusto dolorem deleniti explicabo repellat saepe
                  recusandae ut eos voluptas asperiores,
                </p>
              </div>
            </router-link>
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
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";
import Spinner from "../components/general/Spinner.vue";

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
  mounted() {
    document.title = "Talkcoms - Blogs";
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },
};
</script>
