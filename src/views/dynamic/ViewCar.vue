<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex justify-center flex-wrap">
    <!-- <Navbar
      :makes="brands"
      :body_types="body_styles"
      :categories="categories"
      :contacts="contacts"
      has_top_bar
    /> -->
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
                v-for="(img, index) in fetched_images"
                :key="index"
                class="w-full h-fit transition-transform duration-500 ease-in-out snap-center flex-shrink-0"
                :style="{ transform: `translateX(-${current_image * 100}%)` }"
              >
                <img
                  :src="img?.image_url"
                  class="w-full h-auto max-h-[60vh] object-cover"
                />
              </div>
            </div>
          </div>
          <!-- small images -->
          <div class="w-full flex flex-wrap gap-2 mt-4">
            <img
              v-for="(img, index) in fetched_images"
              :key="index"
              @click="current_image = index"
              :src="img?.image_url"
              class="w-[19%] h-auto object-cover cursor-pointer"
              :class="
                current_image === index ? 'border-2 border-[#E6B800]' : ''
              "
            />
          </div>
        </div>
      </div>
      <div class="w-1/2 half-to-full">
        <h1 class="font-bold text-2xl uppercase">
          {{ name }}
        </h1>
        <div
          class="w-full flex flex-nowrap to-flex border-b-2 border-[#E6B800] p-2 pb-6 mt-4"
        >
          <div class="w-1/2 half-to-full">Price</div>
          <div class="w-1/2 font-semibold text-2xl theme-blue half-to-full">
            Ksh. {{ price?.toLocaleString() }}
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
            <p class="w-full font-semibold">
              {{ mileage?.toLocaleString() }} km
            </p>
          </div>
          <div class="w-1/4 text-sm border p-2 bg-gray-100 half-to-full">
            <p class="w-full text-gray-500">Year</p>
            <p class="w-full font-semibold">{{ registration_year }}</p>
          </div>
          <div class="w-1/4 text-sm border p-2 bg-gray-100 half-to-full">
            <p class="w-full text-gray-500">Engine</p>
            <p class="w-full font-semibold">
              {{ engine_size?.toLocaleString() }} cc
            </p>
          </div>
          <div class="w-1/4 text-sm border p-2 bg-gray-100 half-to-full">
            <p class="w-full text-gray-500">Location</p>
            <p class="w-full font-semibold">{{ location }}</p>
          </div>
        </div>
        <!-- car specifications -->
        <div class="w-full flex flex-wrap mt-10 text-sm">
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Ref.No</div>
            <div class="w-1/2 p-1 py-2">{{ ref_number }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Model Code</div>
            <div class="w-1/2 p-1 py-2">{{ model_code }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Make</div>
            <div class="w-1/2 p-1 py-2">{{ make_name }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Model</div>
            <div class="w-1/2 p-1 py-2">{{ model_name }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Body</div>
            <div class="w-1/2 p-1 py-2">{{ body_style }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Steering</div>
            <div class="w-1/2 p-1 py-2">{{ steering_wheel }}</div>
          </div>

          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Ext. Color</div>
            <div class="w-1/2 p-1 py-2">{{ exterior_color }}</div>
          </div>

          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Fuel</div>
            <div class="w-1/2 p-1 py-2">{{ fuel_type }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Seats</div>
            <div class="w-1/2 p-1 py-2">{{ seats }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Drive</div>
            <div class="w-1/2 p-1 py-2">{{ drive_type }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Transmission</div>
            <div class="w-1/2 p-1 py-2">{{ transmission }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Reg. Year/month</div>
            <div class="w-1/2 p-1 py-2">{{ registration_year }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Weight</div>
            <div class="w-1/2 p-1 py-2">{{ weight?.toLocaleString() }} kg</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Condition</div>
            <div class="w-1/2 p-1 py-2">{{ condition }}</div>
          </div>
          <!-- end of row -->
          <div class="w-1/2 flex flex-nowrap border border-gray-300">
            <div class="w-1/2 bg-gray-200 p-1 py-2">Seats color</div>
            <div class="w-1/2 p-1 py-2">{{ seats_color }}</div>
          </div>
          <!-- end of row -->
        </div>
        <!-- feature highlights -->
        <div
          class="w-full flex flex-wrap gap-[1%] mt-6 border-t border-[#E6B800]"
        >
          <p class="text-sm mb-2 font-bold w-full mt-2">FEATURES</p>
          <div
            v-for="(feature, index) in generated_features"
            :key="index"
            class="w-[24%] p-1 text-sm border rounded-sm text-center"
            :class="
              feature?.exists === true
                ? 'bg-[#FFF199] border-[#FFF199] font-semibold'
                : 'border-gray-300 text-gray-300'
            "
          >
            {{ feature?.name }}
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
              v-model="client_name"
            />
          </div>
          <div class="w-1/2 p-1 half-to-full">
            <label class="font-bold mt-4">Your Email</label>
            <input
              type="email"
              class="w-full border p-1 py-2 mt-2"
              placeholder="someone@example.com"
              v-model="client_email"
            />
          </div>
          <div class="w-1/2 p-1 half-to-full">
            <label class="font-bold mt-4">Mobile Phone</label>
            <input
              type="number"
              class="w-full border p-1 py-2 mt-2"
              placeholder="07 00 00 00 00"
              v-model="client_phone"
            />
          </div>
          <div class="w-1/2 p-1 half-to-full">
            <label class="font-bold mt-4">Address</label>
            <input
              type="text"
              class="w-full border p-1 py-2 mt-2"
              placeholder="Address"
              v-model="client_address"
            />
          </div>
          <label class="font-bold mt-4">Message (Optional)</label>
          <textarea
            type="number"
            class="w-full border p-1 py-2 mt-2 h-[20vh]"
            placeholder="Type your message"
            v-model="client_message"
          ></textarea>
          <div class="w-full flex flex-nowrap gap-2 mt-4">
            <button
              @click="
                sendEmailEnquiry(
                  client_name,
                  client_email,
                  name,
                  client_phone,
                  client_address,
                  client_message
                )
              "
              class="w-1/2 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
            >
              <i class="fa-regular fa-envelope mr-4"></i>EMAIL
            </button>

            <button
              class="w-1/4 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
            >
              <a :href="`tel:${contact_phone}`">
                <i class="fa-solid fa-phone mr-4"></i>
              </a>
            </button>

            <button
              @click="
                sendWhatsAppEnquiry(
                  client_name,
                  client_email,
                  name,
                  client_phone,
                  client_address,
                  client_message
                )
              "
              class="w-1/4 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
            >
              <i class="fa-brands fa-whatsapp mr-4"></i>
            </button>
          </div>

          <!-- response  -->
          <div class="w-full mt-4">
            {{ response_message }}
          </div>
        </form>
      </div>
      <!-- similar cars -->
      <div class="w-[90%] flex flex-wrap gap-4 mt-20">
        <h4 class="w-full font-bold text-lg theme-blue">Similar Cars</h4>
        <div class="w-full flex flex-wrap mt-6 gap-2 shop-car-holder">
          <Card car_card :vehicles="all_vehicles" class="w-[32%] mb-2" />
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
      total_images: "",
      // data arrays
      brands: [],
      body_styles: [],
      models: [],
      all_vehicles: [],
      is_make: "make",
      is_body_type: "body",
      is_brand: "brand",
      is_model: "model",
      featuers: [],
      generated_features: [],
      car_features: [],

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
      seats_color: "",
      fetched_images: [],
      features: [],
      body_style: "",

      //contact details
      whatsapp_number: "",
      contact_phone: "",
      contact_email: "",

      //form
      client_name: "",
      client_email: "",
      client_phone: "",
      client_address: "",
      client_message: "",

      //response
      response_message: "",

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
      contacts: [],
      all_vehicles: [],
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
    try {
      await Promise.race([
        Promise.all([this.getFeatures(), this.fetchVehicle()]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
        ),
      ]);
    } catch (error) {
      console.error("Loading failed:", error);
    } finally {
      document.title = `Drivate - ${this.name || "Loading vehicle..."} `;
      this.generate_features();
      this.fetch_simillar_vehicles();
      this.getContacts();
      // this.getMakes();
      // this.getModels();
      // this.getBodyStyles();
      this.page_is_loading = false;
    }

    this.$watch(
      () => this.$route.params.id,
      async (newId, oldId) => {
        if (newId !== oldId) {
          this.page_is_loading = true; // Add this to show loading state

          try {
            await Promise.race([
              Promise.all([this.getFeatures(), this.fetchVehicle()]),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout after 8s")), 8000)
              ),
            ]);
          } catch (error) {
            console.error("Loading failed:", error);
          } finally {
            document.title = `Drivate - ${this.name}`;
            this.generate_features();
            this.fetch_simillar_vehicles();
            this.getContacts();
            this.page_is_loading = false;
          }
        }
      }
    );
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
        console.log("Vehicle details: ", data);
        // Check if the request was successful
        if (data.success) {
          this.vehicle = data.vehicle;

          //map data
          this.name = this.vehicle?.name;
          this.price = this.vehicle?.price;
          this.mileage = this.vehicle?.mileage;
          this.engine_size = this.vehicle?.engine;
          this.location = this.vehicle?.location?.location_name;
          this.ref_number = this.vehicle?.ref_no;
          this.model_code = this.vehicle?.model_code;
          this.steering_wheel = this.vehicle?.steering;
          this.exterior_color = this.vehicle?.exterior_color;
          this.fuel_type = this.vehicle?.fuel;
          this.seats = this.vehicle?.seats;
          this.drive_type = this.vehicle?.drive;
          this.transmission = this.vehicle?.transmission;
          this.registration_year = this.vehicle?.year;
          this.weight = this.vehicle?.weight;
          this.condition = this.vehicle?.condition;
          this.make_name = this.vehicle?.make?.name;
          this.model_name = this.vehicle?.model?.model_name;
          this.body_style = this.vehicle?.body_style?.name;
          this.seats_color = this.vehicle?.seats_color;
          this.car_features = this.vehicle?.features;
          this.body_id = this.vehicle.body_style?.style_id;
          this.fetched_images = this.vehicle?.images;

          this.total_images = this.fetched_images.length;

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
    // get featues
    async getFeatures() {
      try {
        const response = await axios.get(`${api}/get-features`);
        const data = response.data;

        console.log("features response:", data); // Debug log

        if (data.success && data.features) {
          this.features = data.features; // Extract the array
          console.log("Feature zimekam ni: ", this.features);
        } else {
          this.features = []; // Fallback to empty array
          console.warn("No features found in response");
        }
      } catch (error) {
        this.show_error(error);
        this.features = []; // Set to empty array on error
      }
    },
    /* generate features */
    generate_features() {
      const features_ids = new Set(
        this.car_features.map((item) => item.feature_id)
      );
      console.log("Featured ids: ", features_ids);
      this.generated_features = this.features.map((item) => ({
        ...item,
        exists: features_ids.has(item.feature_id),
      }));

      console.log("Features ni: ", this.generated_features);
    },
    // get contacts
    async getContacts() {
      try {
        const response = await axios.get(`${api}/get-contacts`);
        const data = response.data;

        console.log("contacts response:", data);

        if (data.success && data.contacts) {
          this.contacts = data.contacts;

          //set phone number
          const phone = this.contacts.find((item) => item.type === "phone");
          this.contact_phone = phone.value;

          // set email
          const email = this.contacts.find((item) => item.type === "email");
          this.contact_email = email.value;

          const whatsapp = this.contacts.find(
            (item) => item.type === "whatsapp"
          );

          if (whatsapp) {
            // Remove all non-numeric characters
            let cleanNumber = whatsapp.value.replace(/\D/g, "");

            // Remove leading zero if present
            if (cleanNumber.startsWith("0")) {
              cleanNumber = cleanNumber.substring(1);
            }

            // Add 254 country code if not already present
            if (!cleanNumber.startsWith("254")) {
              cleanNumber = "254" + cleanNumber;
            }

            this.whatsapp_number = cleanNumber;
          }
        } else {
          this.contacts = [];
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    //send enquiry
    sendWhatsAppEnquiry(
      client_name,
      client_email,
      car_name,
      client_phone,
      client_address,
      client_message
    ) {
      if (
        client_name == "" ||
        client_email == "" ||
        car_name == "" ||
        client_phone == "" ||
        client_address == "" ||
        client_message == ""
      ) {
        this.response_message = "All Fields are required";
        return;
      }

      // Format the message
      const message = `Hello, my name is ${client_name}.

I am making an enquiry about ${car_name}

*Message:*
${client_message}

Email: ${client_email}
Phone: ${client_phone}
Address: ${client_address}`;
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${this.whatsapp_number}?text=${encodedMessage}`;

      // Open WhatsApp in a new window/tab
      window.open(whatsappUrl, "_blank");
      // const mode = "Whatsapp";
      this.save_enquiry(
        client_name,
        client_email,
        car_name,
        client_phone,
        client_address,
        client_message,
        "Whatsapp"
      );
      setTimeout(() => {
        this.clearForm();
      }, 1500);
    },
    //clear form
    clearForm() {
      this.client_name = "";
      this.client_email = "";
      this.client_phone = "";
      this.client_address = "";
      this.client_message = "";
      this.response_message = "";
    },

    //send mail
    //send enquiry via email
    sendEmailEnquiry(
      client_name,
      client_email,
      car_name,
      client_phone,
      client_address,
      client_message
    ) {
      if (
        client_name == "" ||
        client_email == "" ||
        car_name == "" ||
        client_phone == "" ||
        client_address == "" ||
        client_message == ""
      ) {
        this.response_message = "All Fields are required";
        return;
      }
      // Email recipient
      const recipientEmail = this.contact_email; // Replace with your email

      // Email subject
      const subject = `Vehicle Enquiry: ${car_name} - from ${client_name}`;

      // Email body
      const body = `Hello,

My name is ${client_name}.

I am making an enquiry about ${car_name}

Message:
${client_message}

Contact Details:
Email: ${client_email}
Phone: ${client_phone}
Address: ${client_address}`;

      // Encode subject and body for mailto URL
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);

      // Create mailto URL
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

      // Open email client
      window.location.href = mailtoUrl;
      // const mode = "Email";
      this.save_enquiry(
        client_name,
        client_email,
        car_name,
        client_phone,
        client_address,
        client_message,
        "Email"
      );
      setTimeout(() => {
        this.clearForm();
      }, 1500);
    },

    //clear form
    clearForm() {
      this.client_name = "";
      this.client_email = "";
      this.client_phone = "";
      this.client_address = "";
      this.client_message = "";
    },
    // fetch similar vehicles
    async fetch_simillar_vehicles() {
      try {
        const response = await axios.get(
          `${api}/get-similar-vehicles/${this.body_id}/${this.id}`
        );

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

    //save data
    async save_enquiry(
      client_name,
      client_email,
      car_name,
      client_phone,
      client_address,
      client_message,
      mode
    ) {
      try {
        const formData = new FormData();
        formData.append("client_name", client_name);
        formData.append("client_email", client_email);
        formData.append("car_name", car_name);
        formData.append("client_phone", client_phone);
        formData.append("client_address", client_address);
        formData.append("client_message", client_message);
        formData.append("mode", mode);
        const response = await axios.post(`${api}/save-enquiry`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data;
        if (data.success) {
          // this.response_message = data.message;
        } else {
          this.response_message = data.error;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
