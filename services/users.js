const userServices = {
  register: (body) => {
    const { username, password, gander, birth, nickname } = body
    return sqlQuery(
      `INSERT INTO user (username,password,gender,birth,nickname) VALUES ('${username}','${password}','${gander}','${birth}','${nickname}')`
    )
  },
  checkUsername: (username) => {
    return sqlQuery(
      `SELECT username FROM user WHERE username='${username}' LIMIT 1`
    )
  },
  login: ({ username, password }) => {
    return sqlQuery(
      `SELECT * FROM user WHERE username='${username}' AND password='${password}'`
    )
  },
  updateUserInfo: ({ username, nickname, gender, birth, id }) => {
    return sqlQuery(
      `UPDATE user SET username='${username}',nickname='${nickname}',gender='${gender}',birth='${birth}' WHERE id='${id}' `
    )
  },
  getUserinfo: (userId) => {
    return sqlQuery(`SELECT * FROM user WHERE id='${userId}'`)
  },
  getAvatarUrl: (id) => {
    return sqlQuery(`SELECT avatar FROM user WHERE id='${id}' LIMIT 1`)
  },
  updateAvatar: (file, id) => {
    return sqlQuery(`UPDATE user SET avatar='${file}' WHERE id = ${id}`)
  },
  bindAccount: (data, type, id) => {
    return sqlQuery(`UPDATE user SET ${type}='${data}' WHERE id = ${id}`)
  },
  checkBind: (type, id) => {
    return sqlQuery(`SELECT ${type} FROM user WHERE id='${id}' LIMIT 1`)
  },
  checkPassword: (id) => {
    return sqlQuery(`SELECT password FROM user WHERE id='${id}' LIMIT 1`)
  },
  changePassword: (password, id) => {
    return sqlQuery(`UPDATE user SET password='${password}' WHERE id = ${id}`)
  },
}

module.exports = userServices
