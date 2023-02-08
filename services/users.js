const userServices = {
  register: (body) => {
    const { username, password, gander, birth, nickname } = body
    return sqlQuery(
      `INSERT INTO user (username,password,gender,birth,nickname) VALUES ('${username}','${password}','${gander}','${birth}','${nickname}')`
    )
  },
  checkUsername: (username) => {
    return sqlQuery(`SELECT username FROM user WHERE username ='${username}'`)
  },
  login: ({ username, password }) => {
    return sqlQuery(
      `SELECT * FROM user WHERE username='${username}' AND password='${password}'`
    )
  },
}

module.exports = userServices
