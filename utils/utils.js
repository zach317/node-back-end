const sendData = (success, message, data) => ({
  success,
  message,
  data,
})

const selectSql = (data) => data[0][0]

const randomSixDigitNumber = () => {
  const min = 100000 // 最小值为100000（包括）
  const max = 999999 // 最大值为999999（包括）
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const maskPhoneNumber = (phoneNumber) => {
  if (phoneNumber && phoneNumber.length === 11) {
    // 将手机号的前三位和后四位保留，中间四位用星号(*)替代
    const maskedNumber =
      phoneNumber.substring(0, 3) + '****' + phoneNumber.substring(7)
    return maskedNumber
  } else {
    // 处理无效的手机号
    return phoneNumber
  }
}

module.exports = {
  sendData,
  selectSql,
  randomSixDigitNumber,
  maskPhoneNumber,
}
