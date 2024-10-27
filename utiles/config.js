require("dotenv").config()


const port = process.env.PORT
const mongoURI = process.env.MONGODB_URL
const cloud_api_key = process.env.CLOUD_API_KEY
const cloud_api_secrete = process.env.CLOUD_API_SECRETE

module.exports = {
  mongoURI,
  port,
  cloud_api_key,
  cloud_api_secrete
}
