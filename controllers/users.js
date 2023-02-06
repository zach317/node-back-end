const userServices = require('../services/users')
const { sendData } = require('../utils/utils')

const userController = {
  register: async (req, res) => {
    try {
      const data = await userServices.register(req.body)
      console.log('🚀  register:  data', data)
      res.send(sendData())
    } catch (error) {
      console.log('🚀  register:  error', error)
    }
  },
  checkUsername: async (req, res) => {
    const { username } = req.body
    try {
      const data = await userServices.checkUsername(username)
      if (data[0].length) {
        res.send(sendData(false, '用户名已存在'))
        return
      }
      res.send(sendData(true))
    } catch (error) {
      console.log('🚀  checkUsername:  error', error)
    }
  },
}

module.exports = userController
