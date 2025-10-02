<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar :categories="categories" :contacts="contacts" />
    <!-- body -->
    <div class="w-full flex justify-center view-car">
      <div class="w-[80%] flex justify-center mt-8 half-to-full to-flex">
        <div class="w-[60%] half-to-full">
          <form @submit.prevent="sendReview" class="w-fit h-fit">
            <div
              class="w-[90%] border border-[#E6B800] p-4 rounded-md half-to-full"
            >
              <div class="form-group w-full mb-2">
                <label class="text-sm font-bold">Select Vehicle</label>

                <div class="relative mt-2">
                  <!-- Search Input -->
                  <input
                    type="text"
                    class="p-2 w-full border"
                    placeholder="Search by vehicle name"
                    v-model="searchQuery"
                    @focus="showDropdown = true"
                    @blur="handleBlur"
                    @keydown="handleKeydown"
                    autocomplete="off"
                    required
                  />

                  <!-- Dropdown Icon -->
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                  >
                    <i
                      class="fa-solid"
                      :class="
                        showDropdown && filteredVehicleNames.length > 0
                          ? 'fa-angle-up'
                          : 'fa-angle-down'
                      "
                    ></i>
                  </div>

                  <!-- Dropdown List -->
                  <div
                    v-if="showDropdown && filteredVehicleNames.length > 0"
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto"
                  >
                    <div
                      v-for="(vehicle_name, index) in filteredVehicleNames"
                      :key="vehicle_name?.car_id || vehicle_name?.id"
                      :class="[
                        'p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0',
                        selectedIndex === index ? 'bg-blue-100' : '',
                      ]"
                      @mousedown="selectVehicleName(vehicle_name)"
                      @mouseenter="selectedIndex = index"
                    >
                      <div class="font-medium text-gray-900 flex flex-nowrap">
                        {{ vehicle_name?.name }}
                      </div>
                    </div>
                  </div>

                  <!-- No results message -->
                  <div
                    v-if="
                      showDropdown &&
                      filteredVehicleNames.length === 0 &&
                      searchQuery
                    "
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-gray-500 text-center"
                  >
                    No vehicle found for "{{ searchQuery }}"
                  </div>
                </div>

                <!-- Hidden input for form submission -->
                <input type="hidden" v-model="car_id" required />
              </div>
              <label class="text-sm font-bold">Title</label>
              <input
                type="text"
                class="p-2 w-full border mb-4 mt-1"
                placeholder="Review title"
                v-model="review_title"
                required
              />
              <label class="text-sm font-bold">Your Name</label>
              <input
                type="text"
                class="p-2 w-full border mb-4 mt-1"
                placeholder="Full Name"
                v-model="full_name"
              />
              <label class="text-sm font-bold">Image (optional)</label>
              <input
                type="file"
                @change="onImageChange"
                accept="image/*"
                class="p-2 w-full border mb-4 mt-1"
              />
              <div v-if="previewImage" class="mt-2">
                <p>Preview:</p>
                <img
                  :src="previewImage"
                  alt="Preview"
                  class="max-h-40 shadow"
                />
              </div>
              <label class="text-sm font-bold">Review</label>
              <textarea
                class="p-2 w-full border mb-4 mt-1 h-[150px]"
                placeholder="Type your review"
                v-model="review_content"
                required
              ></textarea>
              <label class="text-sm font-bold">Rating</label>
              <div class="mt-1 w-full flex flex-nowrap">
                <i
                  v-for="index in 5"
                  :key="index"
                  @click="set_rating(index)"
                  class="fa-solid fa-star cursor-pointer"
                  :class="
                    current_rating >= index ? 'text-[#ffcd00]' : 'text-gray-400'
                  "
                />
              </div>
              <button class="bg-[#E6B800] p-2 px-4 rounded-md mt-4">
                Send <i class="fa-regular fa-paper-plane ml-2"></i>
              </button>
            </div>
          </form>
          <div class="mt-4">
            <p>{{ response_message }}</p>
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
  name: "Leave Review",
  components: { Navbar, Spinner, Footer, Map },
  data() {
    return {
      page_is_loading: true,
      current_rating: 0,
      vehicle_names: [],
      previewImage: null,
      image: null,

      // search query
      car_id: "",
      searchQuery: "",
      showDropdown: false,
      selectedIndex: -1,

      //form data
      review_title: "",
      full_name: "",
      selected_rating: "",
      review_content: "",

      //message prompt
      response_message: "",
    };
  },
  /* mounted */
  async mounted() {
    document.title = "Drivate - Leave a Review";
    try {
      await Promise.race([
        Promise.all([this.getVehicleNames()]),
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
  computed: {
    //search vehicle_names for dropdown
    filteredVehicleNames() {
      if (!this.searchQuery) {
        return this.vehicle_names;
      }
      return this.vehicle_names.filter((vehicle_name) =>
        vehicle_name.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    set_rating(index) {
      this.current_rating = index;
      this.selected_rating = index;
    },
    async getVehicleNames() {
      try {
        const response = await axios.get(`${api}/get-vehicle-names`);
        const data = response.data;

        if (data.success) {
          this.vehicle_names = data.vehicle_names; // Extract the array
        } else {
          this.vehicle_names = []; // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching vehicle_names:", error);
      }
    },

    // vehicle_name search and selection logic
    selectVehicleName(vehicle_name) {
      this.car_id = vehicle_name.car_id || vehicle_name.id;
      this.make = vehicle_name.name;
      this.searchQuery = vehicle_name.name;
      this.showDropdown = false;
      this.selectedIndex = -1;
    },

    handleBlur() {
      // Delay hiding dropdown to allow for selection
      setTimeout(() => {
        this.showDropdown = false;
        this.selectedIndex = -1;
      }, 200);
    },

    handleKeydown(event) {
      if (!this.showDropdown) {
        this.showDropdown = true;
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.selectedIndex = Math.min(
            this.selectedIndex + 1,
            this.filteredVehicleNames.length - 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
          break;
        case "Enter":
          event.preventDefault();
          if (
            this.selectedIndex >= 0 &&
            this.filteredVehicleNames[this.selectedIndex]
          ) {
            this.selectVehicleName(
              this.filteredVehicleNames[this.selectedIndex]
            );
          }
          break;
        case "Escape":
          this.showDropdown = false;
          this.selectedIndex = -1;
          break;
      }
    },
    //change image
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        // preview
        this.previewImage = URL.createObjectURL(file);
      }
    },

    // save review
    async sendReview() {
      try {
        const formData = new FormData();
        formData.append("car_id", this.car_id);
        formData.append("title", this.review_title);
        formData.append("rating", this.selected_rating);
        formData.append("review", this.review_content);
        formData.append("reviewer", this.full_name);
        if (this.image) {
          formData.append("image", this.image);
        }

        const response = await axios.post(`${api}/add-review`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data;

        if (data.success) {
          this.response_message = data.message;
        } else {
          this.response_message = data.message;
        }
      } catch (error) {
        console.error(error);
        this.response_message = "Failed to send review. Please try again later";
      }

      setTimeout(() => {
        this.clearForm();
      }, 1500);
    },

    clearForm() {
      this.review_title = "";
      this.full_name = "";
      this.selected_rating = "";
      this.review_content = "";
      this.response_message = "";
      this.car_id = "";
      this.current_rating = 0;
      this.previewImage = null;
      this.image = null;
      this.searchQuery = "";
    },
  },
};
</script>
