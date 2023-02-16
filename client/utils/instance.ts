import axios from 'axios'

const localURlApi = 'http://localhost:3000/api'
const URlApi = process.env.NEXT_PUBLIC_API

const instance = axios.create({
  baseURL: localURlApi
})

export default instance
