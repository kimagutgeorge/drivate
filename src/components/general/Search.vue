<template>
  <div class="w-full p-4 bg-third h-fit bg-[#E6B800] search">
    <h4 class="font-bold text-xl theme-blue">Quick search</h4>
    <div class="w-full flex flex-nowrap mt-4">
      <input
        type="text"
        placeholder="Key words"
        class="focus:outline-none p-2 w-full"
      />
      <button class="bg-theme-gray text-white p-2 px-4">
        <i class="fa-solid fa-search"></i>
      </button>
    </div>
    <div class="w-full flex flex-nowrap mt-2 gap-2 mt-2 to-flex">
      <div class="w-[25%] search-inner">
        <label class="font-semibold">Make</label><br />
        <select class="py-1 rounded-0 bg-white w-full mt-1">
          <option v-for="(make, index) in makes" :key="index">
            {{ make.make }}
          </option>
        </select>
      </div>
      <div class="w-[25%] search-inner">
        <label class="font-semibold">Model</label><br />
        <select class="py-1 rounded-0 bg-white w-full mt-1">
          <option>Any Model</option>
        </select>
      </div>
      <div class="w-[25%] search-inner">
        <label class="font-semibold">Used/New</label><br />
        <select class="py-1 rounded-0 bg-white w-full mt-1">
          <option>Used</option>
          <option>New</option>
        </select>
      </div>
      <div class="w-[25%] search-inner">
        <label class="font-semibold">Fuel</label><br />
        <select class="py-1 rounded-0 bg-white w-full mt-1">
          <option>Electric</option>
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Hybrid</option>
        </select>
      </div>
    </div>
    <!-- row 2 -->
    <div class="w-full py-1 bg-third mt-2 search-2">
      <div class="w-full flex flex-nowrap gap-2 to-flex">
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select class="py-1 h-fit rounded-0 bg-white w-full">
            <option disabled selected>Min Year</option>
            <option v-for="(year, index) in years" :key="index">
              {{ year.year }}
            </option>
          </select>
          <select class="py-1 h-fit rounded-0 bg-white w-full">
            <option disabled selected>Max Year</option>
            <option v-for="(year, index) in years" :key="index">
              {{ year.year }}
            </option>
          </select>
        </div>
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select class="py-1 h-fit rounded-0 bg-white w-full">
            <option disabled selected>Min Price</option>
            <option v-for="(price, index) in prices" :key="index">
              {{ price.price }}
            </option>
          </select>
          <select class="py-1 h-fit rounded-0 bg-white w-full">
            <option disabled selected>Max Price</option>
            <option v-for="(price, index) in prices" :key="index">
              {{ price.price }}
            </option>
          </select>
        </div>
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select class="py-1 h-fit rounded-0 bg-white w-full">
            <option disabled selected>Body Type</option>
            <option v-for="(type, index) in types" :key="index">
              {{ type.type }}
            </option>
          </select>
        </div>
        <div class="w-[25%] flex flex-nowrap gap-1 search-2-inner">
          <select class="py-1 h-fit rounded-0 bg-white w-full">
            <option disabled selected>Transmission</option>
            <option>Automatic</option>
            <option>Manual</option>
          </select>
        </div>
      </div>
    </div>
    <!-- third row -->
    <div class="w-full flex justify-end gap-4 mt-2 buttons">
      <button class="bg-[#E6B800] w-[150px] font-bold py-1 px-4 rounded-sm">
        Search
      </button>
      <span>or</span>
      <span
        class="text-xl font-semibold cursor-pointer theme-blue hover:text-black hover:underline"
        >Reset</span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
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
    };
  },
};
</script>
