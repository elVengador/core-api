import dotenv from 'dotenv'
dotenv.config()

export const dbHost = process.env.DB_MONGODB_HOST
export const dbPort = process.env.DB_MONGODB_PORT
export const dbUser = process.env.DB_MONGODB_USER
export const dbPass = process.env.DB_MONGODB_PASS
export const dbName = process.env.DB_MONGODB_NAME
export const dbRedisHost = process.env.DB_REDIS_HOST
export const dbRedisPort = process.env.DB_REDIS_PORT
export const dbRedisPass = process.env.DB_REDIS_PASS
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET