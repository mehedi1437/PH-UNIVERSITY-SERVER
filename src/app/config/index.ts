import dotenv from 'dotenv'

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_pass:process.env.DEFAULT_PASS,
};
