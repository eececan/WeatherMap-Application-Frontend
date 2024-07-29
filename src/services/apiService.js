import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getGeocodingData = (cityName, apiKey) =>
{
    return axios.get(`${API_BASE_URL}/city/${cityName}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
    });
};

export const getAirPollutionLastWeek = (cityName, apiKey) =>
{
    return axios.get(`${API_BASE_URL}/air-pollution/${cityName}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
    });
};

export const getAirPollutionForDateRange = (cityName, startDate, endDate, apiKey) =>
{
    return axios.get(`${API_BASE_URL}/air-pollution/${cityName}/${startDate}/${endDate}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
    });
};
