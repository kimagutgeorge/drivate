<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar :categories="categories" :contacts="contacts" />
    <!-- body -->
    <div class="w-full flex justify-center view-car">
      <div class="w-[80%] flex mt-8 half-to-full to-flex">
        <div class="w-1/2 p-4 pt-0 half-to-full big-navigation">
          <!-- <h1 class="text-4xl font-extrabold">Get in touch</h1> -->
          <div class="w-full h-full">
            <Map map_class="w-full h-full" />
          </div>
        </div>
        <div class="w-1/2 half-to-full">
          <form @submit.prevent="contactUs" class="w-fit h-fit">
            <div
              class="w-[90%] border border-[#E6B800] p-4 rounded-md half-to-full"
            >
              <label class="text-sm font-bold">Full Name</label>
              <input
                type="text"
                class="p-2 w-full border mb-4 mt-1"
                placeholder="Full Name"
                required
                v-model="name"
              />
              <label class="text-sm font-bold">Phone Number</label>
              <input
                type="number"
                class="p-2 w-full border mb-4 mt-1"
                placeholder="0700000"
                required
                v-model="phone"
              />
              <label class="text-sm font-bold">Email</label>
              <input
                type="text"
                class="p-2 w-full border mb-4 mt-1"
                placeholder="someone@example.com"
                v-model="email"
              />
              <label class="text-sm font-bold">Your Message</label>
              <textarea
                class="p-2 w-full border mb-4 mt-1 h-[120px]"
                placeholder="Type your message "
                required
                v-model="message"
              ></textarea>
              <button class="bg-[#E6B800] p-2 px-4 rounded-md">
                Send <i class="fa-regular fa-paper-plane ml-2"></i>
              </button>
              <p class="mt-2">{{ response_message }}</p>
            </div>
          </form>
        </div>
        <div class="w-1/2 p-4 pt-0 half-to-full phone-navigation">
          <!-- <h1 class="text-4xl font-extrabold">Get in touch</h1> -->
          <div class="w-full h-[30vh]">
            <Map map_class="w-full h-full" />
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
import Map from "../components/general/Map.vue";
import { api } from "../utils/store";
import axios from "axios";

export default {
  name: "Contact us",
  components: { Navbar, Spinner, Footer, Map },
  data() {
    return {
      page_is_loading: true,
      phones: [{ contact: "0759200998", is_phone: true }],
      response_message: "",
      emails: [
        { contact: "info@drivate.co.ke", is_email: true },
        { contact: "solutions@drivate.co.ke", is_email: true },
      ],
      locations: [{ name: "Tom Mboya Street Mombasa" }],

      //form data
      name: "",
      phone: "",
      email: "",
      message: "",
    };
  },
  /* mounted */
  mounted() {
    document.title = "Drivate - Get in Touch";
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },

  /* methods */
  methods: {
    async contactUs() {
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("phone", this.phone);
        formData.append("email", this.email);
        formData.append("message", this.message);

        const response = await axios.post(`${api}/add-contact-us`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data;
        if (data.success) {
          this.response_message = data.message;
          setTimeout(() => {
            this.clear_form();
          }, 1500);
        } else {
          this.response_message = data.error;
        }
      } catch (error) {
        this.response_message = "Failed. Please try again later!";
      }
    },

    //clear form
    clear_form() {
      this.name = "";
      this.phone = "";
      this.email = "";
      this.message = "";
      this.response_message = "";
    },
  },
};
</script>
