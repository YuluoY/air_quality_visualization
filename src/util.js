export function predict(cacheName, dataName){
  const data = JSON.parse(localStorage.getItem(cacheName));
  if(data){
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
