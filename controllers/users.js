const userServices = require('../services/users')

const userController = {
  register: async (req, res) => {
    try {
      const data = await userServices.register(req.body)
      console.log('🚀  register:  data', data)
      res.send({ ok: 1 })
    } catch (error) {
      console.log('🚀  register:  error', error)
    }
  },
}

module.exports = userController
