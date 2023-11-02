const sendData = (success, message, data) => ({
  success,
  message,
  data,
})

const selectSql = (data) => data[0][0]

module.exports = {
  sendData,
  selectSql,
}
