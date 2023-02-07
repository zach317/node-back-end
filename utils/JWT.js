const jwt = require('jsonwebtoken')

const secret = 'zach-key'
const JWT = {
  // 加密
  generate: (data, expires) => jwt.sign(data, secret, { expiresIn: expires }),
  // 解密
  verify: (token) => {
    try {
      return jwt.verify(token, secret)
    } catch (error) {
      return false
    }
  },
}
module.exports = JWT
