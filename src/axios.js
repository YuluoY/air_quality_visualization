import axios from "axios";

const Axios = axios.create({
  baseURL: "https://aqiapp.daqi110.com/report"
});

export default Axios;