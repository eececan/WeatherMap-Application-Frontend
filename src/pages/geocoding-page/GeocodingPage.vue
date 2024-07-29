<script setup>
import {MaButton, MaForm, MaFormItem, MaInput} from "@mobileaction/action-kit";
import {ref} from "vue";
import router from "@/router/index.js";
import axios from 'axios';

const formStateCityName = ref("");
const geocodingData = ref({});
const displayedCity = ref("");
const noData = ref(false);
const navigateHome = () => {
  router.push('/');
};

const navigateThisWeekData = () => {
  router.push('/air-pollution-last-week');
};

const navigateSpecifiedDateData = () => {
  router.push('/air-pollution-specified-date');
};

const fetchGeocodingData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/city/${formStateCityName.value.replace(/\s/g, '')}`,);
    const cityNameWithoutSpaces = formStateCityName.value.replace(/\s/g, '');
    displayedCity.value = cityNameWithoutSpaces.charAt(0).toUpperCase() + cityNameWithoutSpaces.slice(1);
    noData.value = false;
    geocodingData.value = {
      lat: response.data.lat,
      lon: response.data.lon
    };
  } catch (error) {
    noData.value = true;
    console.error('Error fetching geocoding data:', error);
  }
};
</script>
<template>
  <div class="w-full h-full p-8 ">
    <div class="w-full h-full bg-white rounded-lg max-w-screen-2xl max-h-screen-2xl mx-auto p-6 shadow-lg">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-red-700 mb-6 p-4">
        Find The Geocoding Of A City
      </h1>
      <div class="flex justify-center mb-6 flex-wrap">
        <MaButton class="flex-1 justify-center m-1" icon="home" size="large" color="green" @click="navigateHome">Home
        </MaButton>
        <MaButton class="flex-1 justify-center m-1" icon="calendar" size="large" color="blue"
                  @click="navigateThisWeekData">Air Pollution Data of This Week
        </MaButton>
        <MaButton class="flex-1 justify-center m-1" icon="calendar" size="large" color="red"
                  @click="navigateSpecifiedDateData">Air Pollution of a Specified Date
        </MaButton>
      </div>
      <div class="bg-gradient-to-r from-white via-green-50 to-white p-6 rounded-lg mb-8 shadow-sm">
        <p class="text-gray-700 mb-4">
          Retrieve geocoding information for a city, providing latitude and longitude coordinates. This data allows
          users to pinpoint city locations on maps and integrate location-based services. Accurate geocoding supports
          spatial analyses and enhances geographical data applications.
        </p>
        <p class="text-gray-700 ">
          Enter a city name to get the geocoding results:
        </p>
      </div>
      <ma-form @submit.prevent="fetchGeocodingData">
        <ma-form-item>
          <ma-input
              v-model:value="formStateCityName"
              placeholder="ex. London"
              title="City Name"
              type="string"
              size="large"
              hint-text="Choose from: London, Barcelona, Tokyo, Mumbai, Ankara"
          />
        </ma-form-item>
        <ma-form-item>
          <MaButton class="flex-1 justify-center m-1" icon="brain" size="large" color="green"
                    @click="fetchGeocodingData">Generate
          </MaButton>
        </ma-form-item>
      </ma-form>
      <div v-if="geocodingData.lat !== undefined && geocodingData.lon !== undefined && !noData" class="mt-6">
        <div class="bg-gradient-to-r from-white via-green-50 to-white p-6 rounded-lg mb-8 shadow-sm">
          <h2 class="text-xl font-bold mb-2 text-green-800">Geocoding Data</h2>
          <ul>
            <li><strong>City:</strong> {{displayedCity}}</li>
            <li><strong>Latitude:</strong> {{ geocodingData.lat }} degrees</li>
            <li><strong>Longitude:</strong> {{ geocodingData.lon }} degrees</li>
          </ul>
        </div>
      </div>
      <div v-if="noData" class="mt-6 text-red-600">
        Invalid city is entered. Select from the following: London, Barcelona, Tokyo, Mumbai, Ankara
      </div>
    </div>
  </div>
</template>

