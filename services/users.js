const userServices = {
  register: (body) => {
    const { userName, password, gander, birth } = body
    //操作数据库
    // return sqlQuery(
    //   'INSERT INTO user (user_name,password,gender,birth) VALUES (?,?,?,?)',
    //   [userName, password, gander, birth]
    // )
    return sqlQuery(
      `INSERT INTO user (user_name,password,gender,birth) VALUES ('${userName}','${password}','${gander}','${birth}')`
    )
  },
}

module.exports = userServices
