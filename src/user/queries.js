const getUserByEmail = "SELECT * FROM users WHERE email = $1"
const createUser = "INSERT INTO users (name, surname, email, password) VALUES($1, $2, $3, $4) RETURNING *"

module.exports = {
    getUserByEmail,
    createUser
}