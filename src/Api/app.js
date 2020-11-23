const axios = require('axios');

var baseUrl

if(process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.15.10:3333/';
} else if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://192.168.15.15:3000/';
} else {
  baseUrl = 'https://zigzag.labtropadigital.com.br/'
}

const TOKEN = window.localStorage.getItem('token')

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': 'Bearer '+TOKEN
  }
})

export { api, TOKEN }