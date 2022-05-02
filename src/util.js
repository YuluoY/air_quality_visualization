import { randomExtend } from "@jiaminghi/data-view/lib/util";

export function predict(cacheName, dataName) {
  const data = JSON.parse(localStorage.getItem(cacheName));
  if (data) {
    this[dataName] = data;
    return true;
  }
  return false;
}

export function findObjMax(arr) {
  let max = 0;
  arr.forEach(item => {
    let temp = Object.values(item)[0];
    if (temp > max) {
      max = temp;
    }
  });
  return max;
}

export function zoneAverageAQI(area, data) {
  let result = {
    "东北": [],
    "华北": [],
    "华中": [],
    "华东": [],
    "华南": [],
    "西北": [],
    "西南": []
  };
  for (const areaKey in area) {
    let count = [];
    data.forEach((item, index, arr) => {
      if (area[areaKey].includes(item.name)) {
        result[areaKey].push(item.value);
        count.push(index);
      }
    });
    data = data.filter((item, index, arr) => !count.includes(index));
  }
  for (const resKey in result) {
    result[resKey] = Math.floor(result[resKey].reduce((prev, curr, index, arr) => {
      return prev + curr;
    }) / result[resKey].length);
  }
  return result;
}

export function arrSum(arr) {
  let sum = 0;
  arr.forEach(item => {
    sum += item;
  });
  return sum;
}

export function areaDataCategory(areaData, citiesData, provinceName) {
  const result = [];
  const cities = areaData[provinceName];

  for (let i = 0, len = citiesData.length; i < len; i++) {
    const item = citiesData[i];
    if (cities.includes(item["city"])) {
      result.push(item);
    }
    if (result.length >= cities.length) break;
  }
  return result;
}

export function toChartData(arr, cityCompleteNameMap) {
  const result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (["巴音郭楞州", "辛集", "定州"].includes(arr[i]["city"])) {
      arr[i].aqi = randomExtend(40, 200);
    }
    result.push({ name: cityCompleteNameMap.get(arr[i]["city"]), value: arr[i]["aqi"] });
  }
  return result;
}

export function toKeysAndValues(arr) {
  const values = [];
  const keys = [];

  arr.forEach(item => {
    // if(item.value === undefined) {
    //   item['value'] = 22;
    // }
    keys.push(item["name"]);
    values.push(item["value"]);
  });
  return [keys, values];
}