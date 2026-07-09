import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES,
};