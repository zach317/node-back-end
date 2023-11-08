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

const maskEmail = (email) => {
  const atIndex = email.indexOf('@') // 找到@符号的位置
  if (atIndex > 0) {
    const username = email.substring(0, atIndex)
    const domain = email.substring(atIndex)
    const maskedUsername = username.substring(0, 3) + '****' // 保留前三位字符，其余用*替代
    return maskedUsername + domain
  } else {
    // 处理无效的邮箱地址
    return email
  }
}

module.exports = {
  sendData,
  selectSql,
  randomSixDigitNumber,
  maskPhoneNumber,
  maskEmail,
}
