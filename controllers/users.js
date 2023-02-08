const userServices = require('../services/users')
const JWT = require('../utils/JWT')
const { sendData } = require('../utils/utils')
const dayjs = require('dayjs')

const userController = {
  register: async (req, res) => {
    try {
      const data = await userServices.register(req.body)
      if (data) {
        res.send(sendData(true))
      }
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

  login: async (req, res) => {
    const values = req.body
    try {
      const data = await userServices.login(values)
      if (data[0].length) {
        const { username, id, gender, birth, nickname } = data[0][0]
        const birthday = dayjs(birth).valueOf()
        const today = dayjs().valueOf()
        const age = Math.floor(
          parseInt((today - birthday) / 1000) / 86400 / 365
        )
        const result = {
          username,
          nickname,
          id,
          gender,
          birth,
          age,
        }
        const token = JWT.generate(result, '1h')
        res.header('Authorization', token)
        res.send(sendData(true, '', result))
        return
      }
      res.send(sendData(false, '用户名或密码错误'))
    } catch (error) {
      console.log('🚀  login:  error', error)
    }
  },
}

module.exports = userController
