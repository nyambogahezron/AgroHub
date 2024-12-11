import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://agrohub-5p17.onrender.com',
  withCredentials: true,
});
