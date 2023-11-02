const JWT = require('../utils/JWT')
const { sendData } = require('../utils/utils')

const excludeUrl = ['/users/login', '/users/register', '/users/check-username']
const authentication = (req, res, next) => {
  if (excludeUrl.includes(req.url)) {
    next()
    return
  }
  const token = req.headers['authorization']?.split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      // 重新计算token过期时间
      const { username, id } = payload
      const newToken = JWT.generate({ username, id }, '1h')
      res.header('Authorization', newToken)
      req.body = { ...req.body, id }
      next()
      return
    }
    // 否则token过期 则返回401
    res.status(401).send(sendData(false, '登录超时，请重新登陆'))
    return
  }
  next()
}

module.exports = authentication
