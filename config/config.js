require('dotenv').config()

const{
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = process.env

module.exports = {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
}