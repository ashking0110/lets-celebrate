import axios from 'axios';

// Ensure this matches the IP your Expo logs say you are serving from or localhost if in web
// Replace with your local IP if running on a physical device. e.g., 192.168.x.x
export const API_URL = 'http://192.168.29.182:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
