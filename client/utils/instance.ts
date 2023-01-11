import axios from 'axios'

const localURlApi = process.env.NEXT_PUBLIC_LOCAL_API
const URlApi = process.env.NEXT_PUBLIC_API

const instance = axios.create({
  baseURL: localURlApi
})

export default instance
