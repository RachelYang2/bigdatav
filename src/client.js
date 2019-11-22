var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://123.207.215.131:5000',
});

module.exports = axiosInstance;