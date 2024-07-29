<script setup>
import router from "@/router/index.js";
import axios from 'axios';
import {MaButton} from "@mobileaction/action-kit";

const handleGeocoding = () => {
  router.push('/geocoding-page');
};

const handleLastWeekPollution = () => {
  router.push('/air-pollution-last-week');
};

const handleDateRangePollution = () => {
  router.push('/air-pollution-specified-date');
};

const clearPollutionData = async () => {
  try {
    await axios.delete('http://localhost:8080/api/air-pollution/clear-database');
    alert('Existing pollution data cleared successfully');
  } catch (error) {
    console.error('Error clearing pollution data:', error.response || error.message);
    alert(`Failed to clear existing pollution data: ${error.response ? error.response.data : error.message}`);
  }
};
</script>

<template>
  <div class="w-full h-full p-8">
    <div class="w-full h-full bg-white rounded-lg max-w-screen-2xl max-h-screen-2xl mx-auto">
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-center gradient-text mt-12 mb-12 p-4">
        Welcome To The WeatherMap Application
      </h1>
      <p class="text-center text-3xl font-bold text-gray-700 mb-12">
        Effortlessly track and manage air quality with accurate pollution data and intuitive analysis
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div class="p-4 bg-gradient-to-r from-white via-green-100 to-white rounded-lg shadow">
          <h3 class="text-base sm:text-lg font-semibold mb-2">Find The Geocoding Of A City</h3>
          <img src="@/resources/what-is-geocoding-maptitude.jpg" alt="Geocoding"
               class="w-full h-48 object-cover rounded mb-10 mt-10">
          <p class="text-gray-700 mb-4">
            Retrieve geocoding information for a city, providing latitude and longitude coordinates. This data allows
            users to pinpoint city locations on maps and integrate location-based services. Accurate geocoding supports
            spatial analyses and enhances geographical data applications.
          </p>
          <MaButton class="w-full" color="green" @click="handleGeocoding">GO</MaButton>
        </div>
        <div class="p-4 bg-gradient-to-r from-white via-green-100 to-white rounded-lg shadow">
          <h3 class="text-base sm:text-lg font-semibold mb-2">Find This Week's Air Pollution Data Of A City</h3>
          <img src="@/resources/download.jpeg" alt="Geocoding" class="w-full h-48 object-cover rounded mb-10 mt-10">
          <p class="text-gray-700 mb-4">
            Obtain pollution data from this week for a specified city, including levels of pollutants like CO, SO2, and
            O3. This endpoint provides daily measurements and forecasts for the upcoming days in the week, helping users
            track pollution trends and make informed health decisions.
          </p>
          <MaButton class="w-full" color="green" @click="handleLastWeekPollution">GO</MaButton>
        </div>
        <div class="p-4 bg-gradient-to-r from-white via-green-100 to-white rounded-lg shadow">
          <h3 class="text-base sm:text-lg font-semibold mb-2">Find Air Pollution Data Of A Specified Date</h3>
          <img src="@/resources/images.jpeg" alt="Geocoding" class="w-full h-48 object-cover rounded mb-10 mt-10">
          <p class="text-gray-700 mb-4">
            Access detailed pollution data for a chosen date range in a city. Users can select start and end dates to
            retrieve pollutant levels like CO, SO2, and O3, along with an air quality assessment for the specified
            period. This helps monitor air quality and make data-driven decisions.
          </p>
          <MaButton class="w-full" color="green" @click="handleDateRangePollution">GO</MaButton>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <MaButton class="w-1/2" color="red" @click="clearPollutionData">Clear existing pollution data</MaButton>
      </div>
    </div>
  </div>
</template>
