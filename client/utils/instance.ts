import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API

const api = axios.create({
  baseURL: apiURL
});

export default api
