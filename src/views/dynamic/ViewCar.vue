<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex justify-center flex-wrap">
    <Navbar
      :categories="other_categories"
      :contacts="contacts"
      :makes="brands"
      :body_styles="body_styles"
      :prices="price_ranges"
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
              <div class="w-full h-fit flex overflow-x-scroll snap-x snap-mandatory no-scrollbar">
                <div
                  v-for="(img, index) in fetched_images"
                  :key="index"
                  class="w-full aspect-[4/3] transition-transform duration-500 ease-in-out snap-center flex-shrink-0"
                  :style="{ transform: `translateX(-${current_image * 100}%)` }"
                >
                  <picture>
                    <source
                      v-if="img?.formats?.thumbnail"
                      media="(max-width: 208px)"
                      :srcset="getImageUrl(img.formats.thumbnail.url)"
                    />
                    <source
                      v-if="img?.formats?.small"
                      media="(max-width: 500px)"
                      :srcset="getImageUrl(img.formats.small.url)"
                    />
                    <source
                      v-if="img?.formats?.medium"
                      media="(max-width: 750px)"
                      :srcset="getImageUrl(img.formats.medium.url)"
                    />
                    <source
                      v-if="img?.formats?.large"
                      media="(min-width: 751px)"
                      :srcset="getImageUrl(img.formats.large.url)"
                    />
                    <img
                      :src="getImageUrl(img?.url)"
                      :alt="img?.alternativeText || 'Vehicle Image'"
                      class="w-full h-full object-cover"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
          <!-- small images -->
          <div class="w-full flex flex-wrap gap-2 mt-4">
            <img
              v-for="(img, index) in fetched_images"
              :key="index"
              @click="current_image = index"
              :src="getImageUrl(img?.formats?.thumbnail ? img.formats.thumbnail.url : img?.url)"
              :alt="img?.alternativeText || 'Vehicle Image'"
              class="w-[19%] h-auto object-cover cursor-pointer"
              :class="current_image === index ? 'border-2 border-[#E6B800]' : ''"
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
            {{ feature?.Feature_Name }}
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

            <!-- <button
              class="w-1/4 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
            >
              <a :href="`tel:${contact_phone}`">
                <i class="fa-solid fa-phone mr-4"></i>
              </a>
            </button> -->

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
              class="w-1/2 bg-[#E6B800] shadow-sm p-2 font-bold rounded-sm"
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
import Card from "../../components/ui/Card.vue";
import { api, slugify } from "../../utils/store";
import { getImageUrl } from "../../store/Universal";
import axios from "axios";
import { useHead } from "@vueuse/head";

export default {
  name: "View Car",
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
  components: { Spinner, Footer, Navbar, Card },
  data() {
    return {
      STRAPI_BASE_URL: import.meta.env.VITE_STRAPI_BASE_URL,
      page_is_loading: true,
      current_image: 0,
      total_images: "",
      // data arrays

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
      fetched_contacts: [],
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
    };
  },
  /*mounted */
  async mounted() {
    this.setupSEO();
    try {
      await Promise.race([
        Promise.all([
          this.getFeatures(),
          this.fetchVehicle(),
          this.getContacts(),
        ]),
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
    getImageUrl,
    async fetchVehicle() {
      try {
        const response = await fetch(`${this.STRAPI_BASE_URL}/api/vehicles?filters[id][$eq]=${this.id}&populate=*`);
        const data = await response.json();
        this.vehicle = data.data[0];
        

          //map data
          this.name = this.vehicle?.Name;
          this.price = this.vehicle?.Price;
          this.mileage = this.vehicle?.Mileage;
          this.engine_size = this.vehicle?.Engine_Size;
          this.location = this.vehicle?.location?.Location_Name;
          this.ref_number = this.vehicle?.Reference_Number;
          this.model_code = this.vehicle?.Model_Code;
          this.steering_wheel = this.vehicle?.steering_wheel?.Steering_Type;
          this.exterior_color = this.vehicle?.Exterior_Color;
          this.fuel_type = this.vehicle?.fuel?.Fuel_Type;
          this.seats = this.vehicle?.No_Of_Seats;
          this.drive_type = this.vehicle?.drive?.Drive_Type;
          this.transmission = this.vehicle?.transmission?.Transmission_Type;
          this.registration_year = this.vehicle?.Registration_Year;
          this.weight = this.vehicle?.Weight;
          this.condition = this.vehicle?.condition?.Condition;
          this.make_name = this.vehicle?.make?.Make_Name;
          this.model_name = this.vehicle?.model?.Model_Name;
          this.body_style = this.vehicle?.body_style?.Body_style;
          this.seats_color = this.vehicle?.Seats_Color;
          this.car_features = this.vehicle?.features;
          this.body_id = this.vehicle.body_style?.style_id;
          this.fetched_images = this.vehicle?.Images;

          this.total_images = this.fetched_images.length;

          // Hide message after 3 seconds
          setTimeout(() => {
            this.response_is_visible = false;
          }, 3000);
       
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

        // console.log("Full response:", data); // Debug log

        if (data.success) {
          this.brands = data.brands;
        } else {
          // console.log("Error fetching brands");
        }

        // console.log("brands array:", this.brands); // Debug log
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    //get body styles
    async getBodyStyles() {
      try {
        const response = await axios.get(`${api}/get-body-styles`);
        const data = response.data;

        // console.log("Full response:", data); // Debug log

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
         const response = await fetch(`${this.STRAPI_BASE_URL}/api/features?fields[0]=id&fields[1]=Feature_Name`);
        const data = await response.json();
          this.features = data.data; // Extract the array
          // console.log("Feature zimekam ni: ", this.features);
          
      } catch (error) {
        this.show_error(error);
        this.features = []; // Set to empty array on error
      }
    },
    /* generate features */
    generate_features() {
      const car_feature_names = new Set(
        this.car_features.map((item) => item.Feature_Name.toLowerCase().trim())
      );

      // Combine global + vehicle-specific features, deduplicated
      const all_features = [
        ...this.features,
        ...this.car_features.filter(
          (cf) => !this.features.some(
            (f) => f.Feature_Name.toLowerCase() === cf.Feature_Name.toLowerCase()
          )
        ),
      ];

      this.generated_features = all_features.map((item) => ({
        ...item,
        exists: car_feature_names.has(item.Feature_Name.toLowerCase().trim()),
      }));
    },
    // get contacts
    async getContacts() {
      try {
        const response = await fetch(import.meta.env.VITE_CONTACTS_ENDPOINT);
        const data = await response.json();
        this.fetched_contacts = data.data;
        // console.log("contacts response:", data);

          // console.log("Mapped contacts", this.fetched_contacts)

          //set phone number
          const phone = this.fetched_contacts.find(
            (item) => item.Type === "Phone"
          );
          if (phone) {
            this.contact_phone = phone.value;
          }

          // set email
          const email = this.fetched_contacts.find(
            (item) => item.Type === "Email"
          );
          if (email) {
            this.contact_email = email.Contact;
          }

          const whatsapp = this.fetched_contacts.find(
            (item) => item.Type === "Whatsapp"
          );

          if (whatsapp) {
            // Remove all non-numeric characters
            let cleanNumber = whatsapp.Contact.replace(/\D/g, "");

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
          const url = new URL(`${this.STRAPI_BASE_URL}/api/vehicles`);
          url.searchParams.set('populate', '*');
          url.searchParams.set('filters[body_style][id][$eq]', this.vehicle?.body_style?.id);
          url.searchParams.set('filters[id][$ne]', this.id); // exclude current vehicle
          url.searchParams.set('pagination[limit]', 6);

          const response = await fetch(url);
          const data = await response.json();

          this.all_vehicles = data.data;
        } catch (error) {
          console.error("Error fetching similar vehicles:", error);
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
