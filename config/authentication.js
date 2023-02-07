const JWT = require('../utils/JWT')

const excludeUrl = ['/users/login', '/users/register']
const authentication = (req, res, next) => {
  if (excludeUrl.includes(req.url)) {
    next()
    return
  }
  console.log('🚀  authentication   req.headers', req.headers)
  const token = req.headers['authorization']?.split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      // 重新计算token过期时间
      const newToken = JWT.generate({ ...payload }, '1h')
      res.headers('Authorization', newToken)
      next()
      return
    }
    // 否则token过期 则返回401
    res.status(401).send({ message: '登录超时，请重新登陆' })
    return
  }
  next()
}

module.exports = authentication
