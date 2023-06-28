const { Pool } = require("pg")

const pool = new Pool({
    "user": process.env.PS_USER,
    "password": process.env.PS_PASS,
    "host": process.env.PS_HOST,
    "port": process.env.PS_PORT,
    "database": process.env.DB_NAME
})

module.exports = pool