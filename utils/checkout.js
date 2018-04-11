const checkFalseExceptZero = value => {
  if(value === 0){
    return true
  }else{
    return value
  }
}

const checkNum = value => {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(value) || regNeg.test(value)) {
    return value;
  } else {
    return false;
  }
}

const checkPhone = value => {
  var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
  if(reg.test(value)){
    return value;
  }else{
    return false;
  }
}

const checkLength = (start,end,value) => {
  const L = value.length;
  if(L >= start && L <= end){
    return value;
  }else{
    return false;
  }
}

module.exports = {
  checkFalseExceptZero: checkFalseExceptZero,
  checkNum: checkNum,
  checkPhone: checkPhone,
  checkLength: checkLength
}