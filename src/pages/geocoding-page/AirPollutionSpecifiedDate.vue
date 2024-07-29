<script setup>
import { MaButton, MaForm, MaFormItem, MaInput, MaSelect } from "@mobileaction/action-kit";
import { computed, ref } from "vue";
import router from "@/router/index.js";
import axios from 'axios';

const formStateCityName = ref("");
const formStateStartDate = ref("");
const formStateEndDate = ref("");
const pollutionData = ref([]);
const isPressed = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const loading = ref(false);
const selectedFilters = ref([]);
const options = [
  { label: 'Items Per Page: 10', value: 10 },
  { label: 'Items Per Page: 20', value: 20 },
  { label: 'Items Per Page: 30', value: 30 },
  { label: 'Items Per Page: 40', value: 40 },
  { label: 'Items Per Page: 50', value: 50 },
];
const optionsSort = [
  { label: 'GOOD', value: "GOOD" },
  { label: 'SATISFACTORY', value: "SATISFACTORY" },
  { label: 'MODERATE', value: "MODERATE" },
  { label: 'POOR', value: "POOR" },
  { label: 'SEVERE', value: "SEVERE" },
  { label: 'HAZARDOUS', value: "HAZARDOUS" }
];

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});


const filteredData = computed(() => {
  currentPage.value = 1;
  if (selectedFilters.value.length === 0) {
    return pollutionData.value;
  }
  return pollutionData.value.filter(item => {
    for (const filter of selectedFilters.value) {
      if (item.co === filter || item.so2 === filter || item.o3 === filter) {
        return true;
      }
    }
    return false;
  });
});
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const navigateHome = () => {
  router.push('/');
};

const navigateGeocodingData = () => {
  router.push('/geocoding-page');
};

const navigateThisWeekData = () => {
  router.push('/air-pollution-last-week');
};

const fetchPollutionData = async () => {
  currentPage.value = 1;
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:8080/api/air-pollution/${formStateCityName.value.replace(/\s/g, '')}/${formStateStartDate.value}/${formStateEndDate.value}`);
    isPressed.value = true;
    pollutionData.value = response.data.results.map(item => ({
      date: item.date,
      co: item.co,
      so2: item.so2,
      o3: item.o3,
      quality: item.co
    }));
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 500) {
        alert("Enter a valid city name and date");
      } else {
        alert("An unexpected error occurred: " + error.response.status);
      }
    } else {
      console.error('Error fetching pollution data:', error);
    }
    pollutionData.value = [];
  } finally {
    loading.value = false;
  }
};

const changeItemsPerPage = (count) => {
  itemsPerPage.value = count;
  currentPage.value = 1;
};

const filterItems = () => {
  currentPage.value = 1;
};
</script>

<template>
  <div class="w-full h-full p-8">
    <div class="w-full h-full bg-white rounded-lg max-w-screen-2xl max-h-screen-2xl mx-auto p-4 shadow-lg">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-red-700 mb-6 p-4">
        Find The Air Pollution Data Of A Specified Date
      </h1>
      <div class="flex justify-center mb-6 flex-wrap">
        <MaButton class="flex-1 justify-center m-1" icon="home" size="large" color="green" @click="navigateHome">Home
        </MaButton>
        <MaButton class="flex-1 justify-center m-1" icon="calendar" size="large" color="blue"
                  @click="navigateGeocodingData">Geocoding Data
        </MaButton>
        <MaButton class="flex-1 justify-center m-1" icon="calendar" size="large" color="red"
                  @click="navigateThisWeekData">Pollution Data of This Week
        </MaButton>
      </div>
      <div class="bg-gradient-to-r from-white via-green-50 to-white p-6 rounded-lg mb-8 shadow-sm">
        <p class="text-gray-700 mb-4">
          Access detailed pollution data for a chosen date range in a city. Users can select start and end dates to
          retrieve pollutant levels like CO, SO2, and O3, along with an air quality assessment for the specified period.
          This helps monitor air quality and make data-driven decisions.
        </p>
        <p class="text-gray-700 ">
          Enter a city name, end date, and start date to get the air pollution results:
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
          <ma-input
              v-model:value="formStateStartDate"
              title="Start Date"
              type="text"
              size="large"
              placeholder="Date Format: YYYY-MM-DD"
              hint-text="Start date and end date cannot be earlier than 27 November 2020"
          />
        </ma-form-item>
        <ma-form-item>
          <ma-input
              v-model:value="formStateEndDate"
              title="End Date"
              type="text"
              size="large"
              placeholder="Date Format: YYYY-MM-DD"
          />
        </ma-form-item>
        <ma-form-item>
          <MaButton class="flex-1 justify-center m-2" icon="brain" size="large" color="green"
                    @click="fetchPollutionData">Generate
          </MaButton>
        </ma-form-item>
      </ma-form>
      <div>
        <div v-if="loading" class="mt-6 text-center text-green-700">
          Loading...
        </div>
        <div v-if="pollutionData.length && !loading" class="mt-6">
          <h2 class="text-xl font-bold mb-2 text-green-700">Pollution Data</h2>
          <div class="flex flex-row w-full justify-between">
            <MaSelect
                v-model:value="itemsPerPage"
                @change="changeItemsPerPage"
                class="mb-4 mt-4"
                :options='options'
                size="large"
                placeholder="Data Per Page"
                allow-clear
                option-filter-prop="label"
                show-search
                dropdown-match-select-width
            />
            <MaSelect
                v-model:value="selectedFilters"
                @change="filterItems"
                class="ma-select ma-select--multi-select mb-4 mt-4"
                :options='optionsSort'
                size="large"
                placeholder="Sort By..."
                allow-clear
                option-filter-prop="label"
                show-search
                mode="multiselect"
                prefix-icon="search-normal"
                dropdown-match-select-width
            />
          </div>
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
            <tr v-for="(data, index) in paginatedData" :key="index">
              <td class="py-2 px-4 border border-gray-300">{{ data.date }}</td>
              <td class="py-2 px-4 border border-gray-300">{{ data.co }}</td>
              <td class="py-2 px-4 border border-gray-300">{{ data.so2 }}</td>
              <td class="py-2 px-4 border border-gray-300">{{ data.o3 }}</td>
            </tr>
            </tbody>
          </table>
          <div class="mt-4 flex justify-between items-center">
            <MaButton
                @click="prevPage"
                color="green"
                :disabled="currentPage === 1"
                class="px-4 py-2">
              Previous
            </MaButton>
            <span class="text-center">Page {{ currentPage }} of {{ totalPages }}</span>
            <MaButton
                @click="nextPage"
                color="green"
                :disabled="currentPage === totalPages"
                class="px-4 py-2">
              Next
            </MaButton>
          </div>
        </div>
        <div v-if="!pollutionData.length && pollutionData !== null && isPressed && !loading" class="mt-6 text-red-600">
          No data is available.
        </div>
      </div>
    </div>
  </div>
</template>
