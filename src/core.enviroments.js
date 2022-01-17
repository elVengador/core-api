import dotenv from 'dotenv'
dotenv.config()

export const dbHost = process.env.DB_HOST
export const dbUser = process.env.DB_USER
export const dbPass = process.env.DB_PASS
export const dbName = process.env.DB_NAME
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET