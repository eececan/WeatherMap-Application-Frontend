<script setup>
import {MaButton, MaForm, MaFormItem, MaInput} from "@mobileaction/action-kit";
import {ref} from "vue";
import router from "@/router/index.js";
import axios from 'axios';

const formStateCityName = ref("");
const pollutionData = ref([]);
const isPressed = ref(false);
const noData = ref(false);

const navigateHome = () => {
  router.push('/');
};
const navigateGeocodingData = () => {
  router.push('/geocoding-page');
};
const navigateSpecifiedDate = () => {
  router.push('/air-pollution-specified-date');
};
const fetchPollutionData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/air-pollution/${formStateCityName.value.replace(/\s/g, '')}`, {});
    isPressed.value = true;
    noData.value = false;
    pollutionData.value = response.data.results.map(item => ({
      date: item.date,
      co: item.co,
      so2: item.so2,
      o3: item.o3
    }));
    console.log(response.data);
  } catch (error) {
    noData.value = true;
    console.error('Error fetching pollution data:', error);
  }
};
</script>

<template>
  <div class="w-full h-full p-8">
    <div class="w-full h-full bg-white rounded-lg max-w-screen-2xl max-h-screen-2xl mx-auto p-4 shadow-lg">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-red-700 mb-6 p-4">
        Find This Week's Air Pollution Data
      </h1>
      <div class="flex justify-center mb-6 flex-wrap">
        <MaButton class="flex-1 justify-center m-1" icon="home" size="large" color="green" @click="navigateHome">Home
        </MaButton>
        <MaButton class="flex-1 justify-center m-1" icon="calendar" size="large" color="blue"
                  @click="navigateGeocodingData">Geocoding Data
        </MaButton>
        <MaButton class="flex-1 justify-center m-1" icon="calendar" size="large" color="red"
                  @click="navigateSpecifiedDate">Pollution Data of a Specified Date
        </MaButton>
      </div>
      <div class="bg-gradient-to-r from-white via-green-50 to-white p-6 rounded-lg mb-8 shadow-sm">
        <p class="text-gray-700 mb-4">
          Obtain pollution data from this week for a specified city, including levels of pollutants like CO, SO2, and
          O3. This endpoint provides daily measurements and forecasts for the upcoming days in the week, helping users
          track pollution trends and make informed health decisions.
        </p>
        <p class="text-gray-700">
          Enter a city name to get the air pollution results:
        </p>
      </div>
      <ma-form @submit.prevent="fetchPollutionData">
        <ma-form-item>
          <ma-input
              v-model:value="formStateCityName"
              placeholder="ex. London"
              title="City Name"
              type="text"
              size="large"
              hint-text="Choose from: London, Barcelona, Tokyo, Mumbai, Ankara"
          />
        </ma-form-item>
        <ma-form-item>
          <MaButton class="flex-1 justify-center m-2" icon="brain" size="large" color="green"
                    @click="fetchPollutionData">Generate
          </MaButton>
        </ma-form-item>
      </ma-form>
      <div>
        <div v-if="pollutionData.length && !noData" class="mt-6">
          <h2 class="text-xl font-bold mb-2 text-green-700">Pollution Data</h2>
          <table class="min-w-full bg-white border-collapse border">
            <thead>
            <tr>
              <th class="py-2 px-4 border border-white bg-green-600 text-white rounded-lg">Date</th>
              <th class="py-2 px-4 border border-white bg-green-600 text-white rounded-lg">CO</th>
              <th class="py-2 px-4 border border-white bg-green-600 text-white rounded-lg">SO2</th>
              <th class="py-2 px-4 border border-white bg-green-600 text-white rounded-lg">O3</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, index) in pollutionData" :key="index">
              <td class="py-2 px-4 border border-gray-300">{{ data.date }}</td>
              <td class="py-2 px-4 border border-gray-300">{{ data.co }}</td>
              <td class="py-2 px-4 border border-gray-300">{{ data.so2 }}</td>
              <td class="py-2 px-4 border border-gray-300">{{ data.o3 }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="noData" class="mt-6 text-red-600">
          Invalid city is entered. Select from the following: London, Barcelona, Tokyo, Mumbai, Ankara
        </div>
      </div>
    </div>
  </div>
</template>



