const userServices = require('../services/users')
const JWT = require('../utils/JWT')
const { sendData } = require('../utils/utils')
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

const userController = {
  register: async (req, res) => {
    try {
      const data = await userServices.register(req.body)
      if (data) {
        res.send(sendData(true))
      }
    } catch (error) {
      res.status(500).send(sendData(false, error.message))
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
      res.status(500).send(sendData(false, error.message))
    }
  },

  login: async (req, res) => {
    const values = req.body
    try {
      const data = await userServices.login(values)
      if (data[0].length) {
        const { username, id } = data[0][0]
        const result = {
          username,
          id,
        }
        const token = JWT.generate(result, '1h')
        res.header('Authorization', token)
        res.send(sendData(true, '', id))
        return
      }
      res.send(sendData(false, '用户名或密码错误'))
    } catch (error) {
      res.status(500).send(sendData(false, error.message))
    }
  },

  updateUserInfo: async (req, res) => {
    const values = req.body
    try {
      const data = await userServices.updateUserInfo(values)
      if (data[0]) {
        res.send(sendData(true))
      }
    } catch (error) {
      res.status(500).send(sendData(false, error.message))
    }
  },

  getUserInfo: async (req, res) => {
    const { userId } = req.query
    try {
      const data = await userServices.getUserinfo(userId)
      const { username, id, gender, birth, nickname, avatar } = data[0][0]
      const birthday = dayjs(birth).valueOf()
      const today = dayjs().valueOf()
      const age = Math.floor(parseInt((today - birthday) / 1000) / 86400 / 365)
      const result = {
        username,
        nickname,
        id,
        gender,
        birth,
        age,
        avatar,
      }
      res.send(sendData(true, '', result))
    } catch (error) {
      res.status(500).send(sendData(false, error.message))
    }
  },

  updateAvatar: async (req, res) => {
    const { file } = req
    const avatarUrl = `/api/avatars/${file.filename}`
    const { id } = req.body
    const avatarData = await userServices.getAvatarUrl(id)
    const avatar = avatarData[0][0].avatar
    const avatarCode = !!avatar && avatar.split('/').pop()
    try {
      const data = await userServices.updateAvatar(avatarUrl, id)
      if (data[0]) {
        if (!!avatarCode) {
          fs.unlink(path.resolve(__dirname, `../public/avatars/${avatarCode}`))
        }
        res.send(sendData(true))
      }
    } catch (error) {
      res.status(500).send(sendData(false, error.message))
    }
  },
}

module.exports = userController
