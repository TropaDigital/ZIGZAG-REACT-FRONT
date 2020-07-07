const axios = require('axios');

var baseUrl

if(process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.15.15:3000/';
} else if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://192.168.15.15:3000/';
} else {
  baseUrl = 'http://backend.zigzagmob.com'
}

const api = axios.create({
  baseURL: baseUrl
})

const TOKEN = window.localStorage.getItem('token')

export { api, TOKEN }