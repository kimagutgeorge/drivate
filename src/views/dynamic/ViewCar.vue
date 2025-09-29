<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex justify-center flex-wrap">
    <Navbar
      :makes="brands"
      :body_types="body_styles"
      :categories="categories"
      :contacts="contacts"
      has_top_bar
    />
    <!-- body page -->
    <div class="w-[90%] flex flex-wrap justify-center mt-10 view-car">
      <div class="w-1/2 half-to-full">
        <div class="w-[95%] h-fit border overflow-hidden half-to-full">
          <div class="w-full h-full relative">
            <!-- black background -->
            <div class="w-full h-full absolute bg-black opacity-20 z-10"></div>
            <!-- pagination -->
            <div class="w-full absolute h-full flex z-[20] p-4">
              <div class="w-1/2 h-full">
                <button class="h-full">
                  <div
                    @click="view_previous_image"
                    class="w-[40px] h-[40px] border-b-4 border-l-4 border-white rotate-45"
                  ></div>
                </button>
              </div>
              <div class="w-1/2 h-full flex justify-end">
                <button class="h-full">
                  <div
                    @click="view_next_image"
                    class="w-[40px] h-[40px] border-b-4 border-r-4 border-white -rotate-45"
                  ></div>
                </button>
              </div>
            </div>
            <!-- image -->
            <div
              class="w-full h-fit flex overflow-x-scroll snap-x snap-mandatory no-scrollbar"
            >
              <div
                v-for="(img, index) in car_images"
                :key="index"
                class="w-full h-fit transition-transform duration-500 ease-in-out snap-center flex-shrink-0"
                :style="{ transform: `translateX(-${current_image * 100}%)` }"
              >
                <img
                  :src="img.image"
                  class="w-full h-auto max-h-none object-cover"
                />
              </div>
            </div>
          </div>
          <!-- small images -->
          <div class="w-full flex flex-wrap gap-2 mt-4">
            <img
              v-for="(img, index) in car_images"
              :key="index"
              @click="current_image = index"
              :src="img.image"
              class="w-[19%] h-auto object-cover cursor-pointer"
              :class="
                current_image === index ? 'border-2 border-[#E6B800]' : ''
              "
            />
          </div>
        </div>
      </div>
      <div class="w-1/2 half-to-full">
        <h1 class="font-bold text-2xl">
          TOYOTA CORONA PREMIO PREMIO E L PACKAGE
        </h1>
        <div
          class="w-full flex flex-nowrap to-flex border-b-2 border-[#E6B800] p-2 pb-6 mt-4"
        >
          <div class="w-1/2 half-to-full">Price</div>
          <div class="w-1/2 font-semibold text-2xl theme-blue half-to-full">
            Ksh. 5,064,774
          </div>
          <div class="w-1/2">
            <a href="#enquire"
              ><button
                class="w-full bg-[#E6B800] shadow-sm py-2 px-4 font-bold rounded-sm"
              >
                <i class="fa-regular fa-envelope mr-4"></i>ENQUIRE
              </button></a
            >
          </div>
        </div>

        <p class="text-sm mt-4 font-bold">SPECS</p>
        <!-- main specs -->
        <div class="w-full flex mt-4 to-flex">
          <div class="w-1/4 text-sm border p-2 bg-gray-100 half-to-full">
            <p class="w-full text-gray-500">Mileage</p>
            <p class="w-full font-semibold">233, 3438 km</p>
          </div>
          <div class="w-1/4 text-sm border p-2 bg-gray-100 half-to-full">
            <p class="w-full text-gray-500">Year</p>
            <p class="w-full font-semibold">2015</p>
          </div>
          <div class="w-1/4 text-sm border p-2 bg-gray-100 half-to-full">
            <p class="w-full text-gray-500">Engine</p>
            <p class="w-full font-semibold">2,000 cc</p>
          </div>
          <div class="w-1/4 text-sm border p-2 bg-gray-100 half-to-full">
            <p class="w-full text-gray-500">Location</p>
            <p class="w-full font-semibold">Kenya</p>
          </div>
        </div>
        <!-- car specifications -->
        <div class="w-full flex flex-wrap mt-10 text-sm">
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Ref.No</div>
            <div class="w-1/2 p-1 py-2">JKSIJ2347OIJX</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Model Code</div>
            <div class="w-1/2 p-1 py-2">SKHS93S</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Model Code</div>
            <div class="w-1/2 p-1 py-2">SKHS93S</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Steering</div>
            <div class="w-1/2 p-1 py-2">Left</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Engine Size</div>
            <div class="w-1/2 p-1 py-2">2, 000 cc</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Ext. Color</div>
            <div class="w-1/2 p-1 py-2">Gray</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Location</div>
            <div class="w-1/2 p-1 py-2">Mombasa</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Location</div>
            <div class="w-1/2 p-1 py-2">Mombasa</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Fuel</div>
            <div class="w-1/2 p-1 py-2">Petrol</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Seats</div>
            <div class="w-1/2 p-1 py-2">5</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Drive</div>
            <div class="w-1/2 p-1 py-2">2 Wheel</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Drive</div>
            <div class="w-1/2 p-1 py-2">2 Wheel drive</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Doors</div>
            <div class="w-1/2 p-1 py-2">4</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Transmission</div>
            <div class="w-1/2 p-1 py-2">Automatic</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Reg. Year/month</div>
            <div class="w-1/2 p-1 py-2">205/3</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Weight</div>
            <div class="w-1/2 p-1 py-2">1,150 kg</div>
          </div>
          <!-- end of row -->
        </div>
        <!-- feature highlights -->
        <div
          class="w-full flex flex-wrap gap-[1%] mt-6 border-t border-[#E6B800]"
        >
          <p class="text-sm mb-2 font-bold w-full mt-2">FEATURES</p>
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="w-[24%] p-1 text-sm border rounded-sm text-center"
            :class="
              feature.selected === true
                ? 'bg-[#FFF199] border-[#FFF199] font-semibold'
                : 'border-gray-300 text-gray-300'
            "
          >
            {{ feature.name }}
          </div>
        </div>
      </div>
      <!-- form -->
      <div class="w-[60%] mt-20 half-to-full" id="enquire">
        <h1 class="font-bold theme-third text-lg">ENQUIRE ABOUT THIS CAR</h1>
        <form @submit.prevent="" class="w-full flex flex-wrap border p-4">
          <div class="w-1/2 p-1 half-to-full">
            <label class="font-bold">Your Name</label>
            <input
              type="text"
              class="w-full border p-1 py-2 mt-2"
              placeholder="Full Name"
            />
          </div>
          <div class="w-1/2 p-1 half-to-full">
            <label class="font-bold mt-4">Your Email</label>
            <input
              type="email"
              class="w-full border p-1 py-2 mt-2"
              placeholder="someone@example.com"
            />
          </div>
          <div class="w-1/2 p-1 half-to-full">
            <label class="font-bold mt-4">Mobile Phone</label>
            <input
              type="number"
              class="w-full border p-1 py-2 mt-2"
              placeholder="07 00 00 00 00"
            />
          </div>
          <div class="w-1/2 p-1 half-to-full">
            <label class="font-bold mt-4">Address</label>
            <input
              type="number"
              class="w-full border p-1 py-2 mt-2"
              placeholder="Address"
            />
          </div>
          <label class="font-bold mt-4">Message (Optional)</label>
          <textarea
            type="number"
            class="w-full border p-1 py-2 mt-2 h-[20vh]"
            placeholder="Type your message"
          ></textarea>
          <div class="w-full flex flex-nowrap gap-2 mt-4">
            <button
              class="w-1/2 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
            >
              <i class="fa-regular fa-envelope mr-4"></i>EMAIL
            </button>
            <button
              class="w-1/4 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
            >
              <i class="fa-solid fa-phone mr-4"></i>
            </button>
            <button
              class="w-1/4 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
            >
              <i class="fa-brands fa-whatsapp mr-4"></i>
            </button>
          </div>
        </form>
      </div>
      <!-- similar cars -->
      <div class="w-[90%] flex flex-wrap gap-4 mt-20">
        <h4 class="w-full font-bold text-lg theme-blue">Similar Cars</h4>
        <div class="w-full flex flex-wrap car-holder">
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
    </div>
    <!-- footer -->
    <Footer
      :makes="brands"
      :prices="price_ranges"
      :body_styles="body_styles"
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
import Card from "../../components/ui/Card.vue";
import { api, slugify } from "../../utils/store";
import axios from "axios";

export default {
  name: "View Car",
  props: ["id", "title"],
  components: { Spinner, Footer, Navbar, Card },
  data() {
    return {
      page_is_loading: true,
      current_image: 0,
      total_images: 7,
      // data arrays
      brands: [],
      body_styles: [],
      models: [],
      all_vehicles: [],
      is_make: "make",
      is_body_type: "body",
      is_brand: "brand",
      is_model: "model",

      // fetched vehicle
      name: "",
      price: "",
      mileage: "",
      engine_size: "",
      location: "",
      ref_number: "",
      model_code: "",
      steering_wheel: "",
      exterior_color: "",
      fuel_type: "",
      seats: "",
      drive_type: "",
      transmission: "",
      registration_year: "",
      weight: "",
      condition: "",
      make_id: "",
      model_id: "",
      body_id: "",
      fetched_images: [],

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
      features: [
        { name: "Sunroof", selected: true },
        { name: "CD Player", selected: false },
        { name: "Power Steering", selected: true },
        { name: "Air Conditioning", selected: true },
        { name: "Leather Seats", selected: false },
        { name: "Bluetooth", selected: true },
        { name: "Backup Camera", selected: false },
        { name: "Cruise Control", selected: true },
        { name: "Navigation System", selected: false },
        { name: "Heated Seats", selected: true },
        { name: "Keyless Entry", selected: false },
        { name: "Alloy Wheels", selected: true },
        { name: "Anti-lock Braking System (ABS)", selected: true },
        { name: "Parking Sensors", selected: false },
        { name: "Apple CarPlay", selected: false },
        { name: "Android Auto", selected: true },
        { name: "Fog Lights", selected: true },
        { name: "Power Windows", selected: true },
        { name: "Tinted Windows", selected: false },
        { name: "Traction Control", selected: true },
      ],
      car_images: [
        { image: "/images/bg-2.jpg" },
        { image: "/images/bg-1.jpg" },
        { image: "/images/car-1.jpeg" },
        { image: "/images/car-2.webp" },
        { image: "/images/car-3.webp" },
        { image: "/images/car-4.jpg" },
        { image: "/images/car-5.jpg" },
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
    };
  },
  /*mounted */
  async mounted() {
    document.title = `Drivate - ${this.title}`;
    try {
      await Promise.race([
        Promise.all([
          this.getMakes(),
          this.fetchVehicle(),
          this.getBodyStyles(),
          this.getModels(),
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
    view_next_image() {
      if (this.current_image < this.total_images - 1) {
        this.current_image++;
      }
    },
    view_previous_image() {
      if (this.current_image > 0) {
        this.current_image--;
      }
    },
    slugify,
    async fetchVehicle() {
      try {
        const response = await axios.get(`${api}/get-vehicle/${this.id}`);

        const data = response.data;
        // Check if the request was successful
        if (data.success) {
          this.vehicle = data.vehicle;

          //map data
          this.name = this.vehicle.name;
          this.price = this.vehicle.price;
          this.mileage = this.vehicle.mileage;
          this.engine_size = this.vehicle.engine;
          this.location = this.vehicle.location.location_name;
          this.ref_number = this.vehicle.ref_no;
          this.model_code = this.vehicle.model_code;
          this.steering_wheel = this.vehicle.steering;
          this.exterior_color = this.vehicle.exterior_color;
          this.fuel_type = this.vehicle.fuel;
          this.seats = this.vehicle.seats;
          this.drive_type = this.vehicle.drive;
          this.transmission = this.vehicle.transmission;
          this.registration_year = this.vehicle.year;
          this.weight = this.vehicle.weight;
          this.condition = this.vehicle.condition;
          this.make_id = this.vehicle.make.make_id;
          this.model_id = this.vehicle.model.model_id;
          this.body_id = this.vehicle.body_style.body_id;
          //brands, body, models
          // this.bodySearchQuery = this.vehicle.body_style.name;
          // this.brandSearchQuery = this.vehicle.make.name;
          // this.modelSearchQuery = this.vehicle.model.model_name;
          this.fetched_images = this.vehicle.images;

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

        this.response_is_visible = true;
        this.alert_status = false;
        this.response_message = "Failed. Check  your connection";

        // Initialize empty array on error
        this.all_vehicles = [];
      }
    },
    // get makes
    async getMakes() {
      try {
        const response = await axios.get(`${api}/get-makes`);
        const data = response.data;

        console.log("Full response:", data); // Debug log

        if (data.success) {
          this.brands = data.brands;
        } else {
          console.log("Error fetching brands");
        }

        console.log("brands array:", this.brands); // Debug log
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    //get body styles
    async getBodyStyles() {
      try {
        const response = await axios.get(`${api}/get-body-styles`);
        const data = response.data;

        console.log("Full response:", data); // Debug log

        if (data.success) {
          this.body_styles = data.body_styles; // Extract the array
        } else {
          this.body_styles = []; // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching body styles:", error);
      }
    },
    async getModels() {
      try {
        const response = await axios.get(`${api}/get-models`);
        const data = response.data;

        if (data.success) {
          this.models = data.models; // Extract the array
        } else {
          this.models = []; // Fallback to empty array
          console.warn("No models found in response");
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    },
  },
};
</script>
