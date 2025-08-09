<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar :categories="categories" :contacts="contacts" />
    <!-- body -->
    <div
      class="w-full flex flex-wrap justify-center relative overflow-hidden mt-6 sell"
    >
      <div class="w-[90%] flex justify-center flex-wrap content">
        <div class="flex w-full justify-center gap-1 self-start">
          <p
            v-for="(item, index) in navigation"
            :key="index"
            @click="tab_in_view = index"
            class="p-1 px-4 font-bold cursor-pointer"
            :class="tab_in_view === index ? 'bg-[#E6B800]' : 'bg-third'"
          >
            {{ item.name }}
          </p>
        </div>
        <div
          v-if="tab_in_view === 0"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div class="w-1/2 p-4 half-to-full to-flex">
            <label class="text-sm font-bold">Full Name</label>
            <input
              type="text"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="Full Name"
            />
            <label class="text-sm font-bold">Phone Number</label>
            <input
              type="number"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="0700000"
            />
            <label class="text-sm font-bold">Email</label>
            <input
              type="text"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="someone@example.com"
            />
            <label class="text-sm font-bold">Location</label>
            <select class="p-2 w-full border mt-1">
              <option selected disabled>Pick a location</option>
              <option
                v-for="(county, index) in counties"
                :key="index"
                :value="county.name"
              >
                {{ county.name }}
              </option>
            </select>
          </div>
          <div class="w-1/2 border p-4 half-to-full to-flex">
            <h1 class="font-bold text-xl">Fill in your details to continue</h1>
          </div>
          <!-- buttons -->
          <div class="w-full flex justify-end mt-4">
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view++">
              Next <i class="fa-solid fa-angle-right ml-2"></i>
            </button>
          </div>
        </div>
        <div
          v-if="tab_in_view === 1"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div class="w-1/2 p-4 half-to-full to-flex">
            <label class="text-sm font-bold">Make</label>
            <select class="p-2 w-full border mb-4 mt-1">
              <option selected disabled>Pick a make</option>
              <option
                v-for="(make, index) in makes"
                :key="index"
                :value="make.make"
              >
                {{ make.make }}
              </option>
            </select>
            <label class="text-sm font-bold">Model</label>
            <select class="p-2 w-full border mb-4 mt-1">
              <option selected disabled>Pick a model</option>
              <option
                v-for="(model, index) in models"
                :key="index"
                :value="model.name"
              >
                {{ model.name }}
              </option>
            </select>
            <label class="text-sm font-bold">Year</label>
            <select class="p-2 w-full border mb-4 mt-1">
              <option selected disabled>Pick a model</option>
              <option
                v-for="(year, index) in years"
                :key="index"
                :value="year.year"
              >
                {{ year.year }}
              </option>
            </select>
            <label class="text-sm font-bold">Mileage</label>
            <input
              type="number"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="Mileage"
            />
            <label class="text-sm font-bold">Selling Price</label>
            <input
              type="number"
              class="p-2 w-full border mb-4 mt-1"
              placeholder="Your price"
            />
          </div>
          <div class="w-1/2 border p-4 half-to-full to-flex">
            <h1 class="font-bold text-xl">Fill in basic cars details</h1>
          </div>
          <!-- buttons -->
          <div class="w-full flex justify-end mt-4 gap-2">
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view--">
              <i class="fa-solid fa-angle-left mr-2"></i>
              Previous
            </button>
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view++">
              Next <i class="fa-solid fa-angle-right ml-2"></i>
            </button>
          </div>
        </div>
        <div
          v-if="tab_in_view === 2"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div
            class="w-1/2 p-4 flex flex-col justify-center half-to-full to-flex"
          >
            <label class="text-sm font-bold">Select Images</label>
            <input
              type="file"
              class="p-2 w-full border mb-4 mt-1"
              accept="image/*"
              multiple
              @change="handleImageUpload"
            />
          </div>
          <div class="w-1/2 border p-4 half-to-full to-flex">
            <div
              v-if="imagePreviews.length > 0"
              class="grid grid-cols-3 gap-2 mt-4"
            >
              <div
                v-for="(image, index) in imagePreviews"
                :key="index"
                class="relative w-full h-32 border rounded overflow-hidden"
              >
                <!-- Delete icon on each image -->
                <button
                  @click="removeImage(index)"
                  class="absolute top-1 right-1 bg-white rounded-full p-1 px-2 shadow text-red-500 hover:text-red-700"
                >
                  <i class="fas fa-times"></i>
                </button>

                <!-- Image -->
                <img
                  :src="image"
                  alt="Preview"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
            <div v-if="imagePreviews.length < 1" class="w-full">
              <h1 class="font-bold text-xl">Upload your car images</h1>
              <ul class="mt-4 ml-5">
                <li class="list-disc">Front view</li>
                <li class="list-disc">Rear view</li>
                <li class="list-disc">Side views</li>
                <li class="list-disc">Interior dashboard</li>
                <li class="list-disc">Engine</li>
                <li class="list-disc">Any damage areas (if applicable)</li>
              </ul>
            </div>
          </div>
          <!-- buttons -->
          <div class="w-full flex justify-end mt-4 gap-2">
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view--">
              <i class="fa-solid fa-angle-left mr-2"></i>
              Previous
            </button>
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view++">
              Next <i class="fa-solid fa-angle-right ml-2"></i>
            </button>
          </div>
        </div>

        <div
          v-if="tab_in_view === 3"
          class="w-[80%] flex mt-8 flex-wrap view-car to-full-smaller"
        >
          <div class="w-1/2 p-4 flex flex-wrap h-fit half-to-full to-flex">
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Fuel type</label>
              <select class="p-2 w-full border mb-4 mt-1">
                <option selected disabled>Fuel type</option>
                <option
                  v-for="(type, index) in fuel_types"
                  :key="index"
                  :value="type.name"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Body type</label>
              <select class="p-2 w-full border mb-4 mt-1">
                <option selected disabled>Body type</option>
                <option
                  v-for="(body, index) in body_types"
                  :key="index"
                  :value="body.name"
                >
                  {{ body.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Transmission</label>
              <select class="p-2 w-full border mb-4 mt-1">
                <option selected disabled>Transmission type</option>
                <option
                  v-for="(transmission, index) in transmissions"
                  :key="index"
                  :value="transmission.name"
                >
                  {{ transmission.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Colors</label>
              <select class="p-2 w-full border mb-4 mt-1">
                <option selected disabled>Pick a color</option>
                <option
                  v-for="(color, index) in colors"
                  :key="index"
                  :value="color.name"
                >
                  {{ color.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Steering</label>
              <select class="p-2 w-full border mb-4 mt-1">
                <option selected disabled>Pick a color</option>
                <option
                  v-for="(position, index) in steering_positions"
                  :key="index"
                  :value="position.name"
                >
                  {{ position.name }}
                </option>
              </select>
            </div>
            <div class="w-1/2 p-1 to-full-smaller">
              <label class="text-sm font-bold">Drive Type</label>
              <select class="p-2 w-full border mb-4 mt-1">
                <option selected disabled>Pick a color</option>
                <option
                  v-for="(drive, index) in drive_types"
                  :key="index"
                  :value="drive.name"
                >
                  {{ drive.name }}
                </option>
              </select>
            </div>
            <div class="w-full">
              <label class="text-sm font-bold">Description</label>
              <textarea
                class="p-2 w-full border mb-4 mt-1 h-[120px]"
                placeholder="Description and additional info "
              ></textarea>
            </div>
          </div>
          <div
            class="w-1/2 border p-4 flex flex-wrap gap-2 max-h-[60vh] overflow-y-scroll half-to-full to-flex"
          >
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="w-[48%] flex flex-nowrap py-2 border-b to-full-smaller"
            >
              <input type="checkbox" class="w-fit" />
              <span class="ml-2">{{ feature.name }} </span>
            </div>
          </div>
          <!-- buttons -->
          <div class="w-full flex justify-end mt-4 gap-2">
            <button class="bg-[#E6B800] p-2 px-4" @click="tab_in_view--">
              <i class="fa-solid fa-angle-left mr-2"></i>
              Previous
            </button>
            <button class="bg-theme-blue p-2 px-4">
              Submit <i class="fa-regular fa-paper-plane ml-2"></i>
            </button>
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
  name: "SelllCar",
  components: { Navbar, Footer, Spinner },
  data() {
    return {
      page_is_loading: true,
      tab_in_view: 0,
      imagePreviews: [],
      fuel_types: [
        { name: "Petrol" },
        { name: "Diesel" },
        { name: "Hybrid" },
        { name: "Electric" },
        { name: "Other" },
      ],
      colors: [
        { name: "White" },
        { name: "Black" },
        { name: "Silver" },
        { name: "Grey" },
        { name: "Blue" },
        { name: "Red" },
        { name: "Green" },
        { name: "Yellow" },
        { name: "Gold" },
        { name: "Other" },
      ],
      drive_types: [
        { name: "4WD (Four-Wheel Drive)" },
        { name: "FWD (Front-Wheel Drive)" },
        { name: "RWD (Rear-Wheel Drive)" },
        { name: "AWD (All-Wheel Drive)" },
        { name: "Other" },
      ],
      steering_positions: [
        { name: "Right" },
        { name: "Left" },
        { name: "Center" },
        { name: "Other" },
      ],
      transmissions: [
        { name: "Automatic" },
        { name: "Manual" },
        { name: "CVT" },
        { name: "Tiptronic" },
        { name: "Other" },
      ],
      body_types: [
        { name: "Sedan" },
        { name: "Hatchback" },
        { name: "SUV" },
        { name: "Wagon" },
        { name: "Pickup" },
        { name: "Van" },
        { name: "Coupe" },
        { name: "Convertible" },
        { name: "Minivan" },
        { name: "Other" },
      ],
      features: [
        { name: "Sunroof" },
        { name: "CD Player" },
        { name: "Power Steering" },
        { name: "Air Conditioning" },
        { name: "Leather Seats" },
        { name: "Bluetooth" },
        { name: "Backup Camera" },
        { name: "Cruise Control" },
        { name: "Navigation System" },
        { name: "Heated Seats" },
        { name: "Keyless Entry" },
        { name: "Alloy Wheels" },
        { name: "Anti-lock Braking System (ABS)" },
        { name: "Parking Sensors" },
        { name: "Apple CarPlay" },
        { name: "Android Auto" },
        { name: "Fog Lights" },
        { name: "Power Windows" },
        { name: "Tinted Windows" },
        { name: "Traction Control" },
        { name: "Push Start" },
        { name: "Rear Entertainment System" },
        { name: "Heads-Up Display" },
        { name: "360-Degree Camera" },
        { name: "Lane Departure Warning" },
        { name: "Blind Spot Monitoring" },
        { name: "Adaptive Cruise Control" },
        { name: "Auto Headlights" },
        { name: "Rain-Sensing Wipers" },
        { name: "Remote Start" },
        { name: "Third Row Seating" },
        { name: "Power Tailgate" },
        { name: "Side Airbags" },
        { name: "Electronic Stability Control" },
        { name: "Xenon Headlights" },
        { name: "LED Headlights" },
        { name: "Hill Start Assist" },
        { name: "Downhill Assist Control" },
        { name: "Roof Rails" },
        { name: "Armrests" },
        { name: "Isofix Child Seat Anchors" },
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
      navigation: [
        { name: "Personal Details" },
        { name: "Basic Info." },
        { name: "Upload Pictures" },
        { name: "Car Details" },
      ],
      models: [
        { name: "Toyota RAV4" },
        { name: "Mazda Demio" },
        { name: "Range Rover Vogue" },
        { name: "Nissan Note" },
        { name: "Subaru Forester" },
        { name: "Honda Fit" },
        { name: "BMW X5" },
        { name: "Mercedes-Benz C200" },
        { name: "Volkswagen Passat" },
        { name: "Mitsubishi Lancer" },
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
      counties: [
        { name: "Baringo" },
        { name: "Bomet" },
        { name: "Bungoma" },
        { name: "Busia" },
        { name: "Elgeyo-Marakwet" },
        { name: "Embu" },
        { name: "Garissa" },
        { name: "Homa Bay" },
        { name: "Isiolo" },
        { name: "Kajiado" },
        { name: "Kakamega" },
        { name: "Kericho" },
        { name: "Kiambu" },
        { name: "Kilifi" },
        { name: "Kirinyaga" },
        { name: "Kisii" },
        { name: "Kisumu" },
        { name: "Kitui" },
        { name: "Kwale" },
        { name: "Laikipia" },
        { name: "Lamu" },
        { name: "Machakos" },
        { name: "Makueni" },
        { name: "Mandera" },
        { name: "Meru" },
        { name: "Migori" },
        { name: "Mombasa" },
        { name: "Murang'a" },
        { name: "Nairobi" },
        { name: "Nakuru" },
        { name: "Nandi" },
        { name: "Narok" },
        { name: "Nyamira" },
        { name: "Nyandarua" },
        { name: "Nyeri" },
        { name: "Samburu" },
        { name: "Siaya" },
        { name: "Taita-Taveta" },
        { name: "Tana River" },
        { name: "Tharaka-Nithi" },
        { name: "Trans Nzoia" },
        { name: "Turkana" },
        { name: "Uasin Gishu" },
        { name: "Vihiga" },
        { name: "Wajir" },
        { name: "West Pokot" },
      ],
    };
  },
  /* mounted */
  mounted() {
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },
  /* methods */
  methods: {
    handleImageUpload(event) {
      const files = Array.from(event.target.files);

      if (files.length > 6) {
        alert("You can only upload up to 6 images.");
        return;
      }

      this.imagePreviews = [];

      files.forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    removeImage(index) {
      this.imagePreviews.splice(index, 1);
    },
    clearAllImages() {
      this.imagePreviews = [];
    },
  },
};
</script>
