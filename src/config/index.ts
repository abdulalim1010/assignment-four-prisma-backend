import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  app_url: process.env.APP_URL,
  frontend_url: process.env.FRONTEND_URL,

  database_url: process.env.DATABASE_URL,

  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),

  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,

  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,

  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,

  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,

  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};