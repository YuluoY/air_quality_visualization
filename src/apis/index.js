import axios from "axios";

export default {
  // 获取省份的aqi数据
  getProvincesAQI: function() {
    return axios({
      url: "/country/province",
      method: "get"
    });
  },
  // 获取所有城市的aqi数据
  getCitiesAQI: function() {
    return axios({
      url: "/country/citys",
      method: "get"
    });
  },
  // 获取排序的所有城市，按拼音首字母排序
  getOrderCities: function() {
    return axios({
      url: "/city/all/type?type=1",
      method: "get"
    });
  },
  // 获取分类的所有城市，按省份分类
  getCategoryCities: function() {
    return axios({
      url: "/city/all/type?type=2",
      method: "get"
    });
  }
};