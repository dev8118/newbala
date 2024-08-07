import axios from 'axios'

const Http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 150000
})

Http.interceptors.response.use(
  function (response) {
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default Http
