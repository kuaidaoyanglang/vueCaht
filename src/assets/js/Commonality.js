const subGroup = (array, SubLength) => {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += SubLength)));
  }
  return newArray;
};
const JsonSort = (jsonData) => {
  try {
    let tempJsonObj = {};
    let sdic = Object.keys(jsonData).sort();
    sdic.map((item, index) => {
      tempJsonObj[item] = jsonData[sdic[index]]
    });
    return tempJsonObj;
  } catch (e) {
    return jsonData;
  }
};
/**
 * 轻提示
 * @param msg
 * @param _this this指向
 */
const toast = (msg, _this) => {
  _this.$toast({
    duration: 2000,
    position: "bottom",
    message: msg
  });
};
export default {
  subGroup,
  JsonSort,
  toast
};
