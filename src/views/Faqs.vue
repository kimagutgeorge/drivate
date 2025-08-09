<template>
  <Spinner logo="/logo.png" v-if="page_is_loading" />
  <div v-if="!page_is_loading" class="w-full flex flex-wrap justify-center">
    <Navbar :categories="categories" :contacts="contacts" />
    <div class="w-[90%] flex flex-wrap mt-8">
      <div class="w-full h-[40vh] overflow-hidden mt-6 relative view-car">
        <!-- background -->
        <div class="w-full h-full absolute">
          <img
            src="/images/car-4.jpg"
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
              placeholder="Search"
              class="p-2 w-full bg-[#fffadd] focus:outline-none"
            />
            <button class="p-2 h-full flex flex-col justify-center">
              <i class="fa-solid fa-search theme-blue text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full flex content">
        <div class="w-[30%] sticky top-[15vh] pt-6 self-start">
          <p
            v-for="(category, index) in faqs_categories"
            :key="index"
            class="py-1 px-4 full cursor-pointer border w-fit mb-1 hover:bg-[#FFF199] hover:font-bold hover:border-[#FFF199]"
            :class="
              index === 0
                ? 'bg-[#FFF199] font-bold border-[#FFF199]'
                : 'border-gray-300'
            "
          >
            {{ category.name }}
          </p>
        </div>
        <div class="w-[70%] view-car">
          <Accordion :faqs="faqs" has_chat />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Spinner from "../components/general/Spinner.vue";
import Accordion from "../components/Accordion.vue";
import Footer from "../components/general/Footer.vue";
import Navbar from "../components/general/Navbar.vue";

export default {
  name: "Faqs",
  components: { Accordion, Spinner, Footer, Navbar },
  data() {
    return {
      page_is_loading: true,
      faqs_categories: [
        { name: "Genereal" },
        { name: "Buying" },
        { name: "Selling" },
        { name: "Ownership" },
        { name: "Maintenance" },
        { name: "Insurance" },
        { name: "Registration" },
        { name: "Payment" },
        { name: "Financing" },
        { name: "Inspection" },
        { name: "Documentation" },
      ],
      faqs: [
        {
          title: "How often should I service my car?",
          content:
            "It's generally recommended to service your car every 5,000 to 10,000 kilometers or every 6 months, whichever comes first. Check your car's manual for specific intervals.",
          category: "Maintenance",
        },
        {
          title: "What type of fuel should I use for my car?",
          content:
            "Use the fuel type recommended in your car's manual. Most petrol engines require unleaded petrol, while diesel engines require diesel. Using the wrong fuel can damage the engine.",
          category: "Maintenance",
        },
        {
          title: "How do I know when my brake pads need replacing?",
          content:
            "Common signs include squeaking or grinding noises, longer stopping distances, or a brake warning light. It's good to have them checked during routine service.",
          category: "Maintenance",
        },
        {
          title: "Why is my engine overheating?",
          content:
            "Engine overheating can be caused by low coolant levels, a faulty thermostat, a broken water pump, or a clogged radiator. It's important to stop the car and check before causing further damage.",
          category: "Troubleshooting",
        },
        {
          title: "What is the correct tire pressure for my car?",
          content:
            "Check the tire pressure label located inside the driver’s door or your owner’s manual. Maintaining proper pressure improves fuel efficiency, safety, and tire life.",
          category: "Maintenance",
        },
        {
          title: "How can I improve my car's fuel efficiency?",
          content:
            "Drive smoothly, avoid rapid acceleration, keep tires properly inflated, perform regular maintenance, and reduce unnecessary weight in the car.",
          category: "Ownership",
        },
        {
          title: "When should I replace my car battery?",
          content:
            "Most car batteries last 3–5 years. Signs of a weak battery include slow engine start, dim lights, or electronic issues. Have it tested if you're unsure.",
          category: "Maintenance",
        },
        {
          title: "Is it okay to buy a high-mileage used car?",
          content:
            "Yes, as long as the car has been well maintained with a full service history. Condition and maintenance are more important than mileage alone.",
          category: "Buying",
        },
        {
          title: "How do I check the engine oil level?",
          content:
            "Park the car on a level surface, turn off the engine, and wait a few minutes. Pull out the dipstick, wipe it clean, reinsert, then remove it again to check the level.",
          category: "Maintenance",
        },
        {
          title: "Why is my check engine light on?",
          content:
            "It could be due to various issues like a faulty sensor, loose fuel cap, or engine problems. Have it diagnosed with an OBD scanner or by a mechanic.",
          category: "Troubleshooting",
        },
        {
          title: "What should I do if my car won't start?",
          content:
            "Check the battery, listen for clicking sounds, ensure the fuel level is adequate, and check if the starter motor or ignition system may be faulty.",
          category: "Troubleshooting",
        },
        {
          title: "How do I know if my transmission is failing?",
          content:
            "Look out for delayed shifting, strange noises, fluid leaks, or a burning smell. Transmission repairs can be costly, so act early if you notice issues.",
          category: "Troubleshooting",
        },
      ],
    };
  },
  /* mounted */
  mounted() {
    setTimeout(() => {
      this.page_is_loading = false;
    }, 1500);
  },
};
</script>
