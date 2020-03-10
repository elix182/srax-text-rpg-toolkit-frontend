"use strict";

import axios from "axios";

let config = {
  baseURL: "http://localhost:8000",
  // baseURL: "http://192.168.10.10",
  timeout: 60 * 1000, // Timeout
};

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = config.baseURL;
axios.defaults.timeout = config.timeout;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';