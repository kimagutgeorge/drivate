<template>
  <div class="border border-[#E6B800] overflow-hidden" :class="map_class">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.9225747501264!2d39.65612037747327!3d-4.036222834315726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012b1cb54f7db%3A0xfa9e604bc5d135f8!2sTom%20Mboya%20Rd%2C%20Mombasa%2C%20Kenya!5e0!3m2!1sen!2snl!4v1767272298495!5m2!1sen!2snl"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="w-full h-full"
    ></iframe>
  </div>
  <!-- <div
    id="map"
    class="border border-[#E6B800] overflow-hidden"
    :class="map_class"
    ref="mapContainer"
  ></div> -->
</template>
<script>
export default {
  name: "Map",
  props: { map_class: String },
};
</script>
