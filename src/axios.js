import axios from "axios";

const Axios = axios.create({
  baseURL: "https://aqiapp.daqi110.com/report"
});

Axios.interceptors.request.use(req => {
  return req;
}, err => {
  return Promise.reject(err);
})

export default Axios;