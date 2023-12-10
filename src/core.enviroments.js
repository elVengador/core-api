import dotenv from 'dotenv'
dotenv.config()

export const dbHost = process.env.DB_MONGODB_HOST||"127.0.0.1"
export const dbPort = process.env.DB_MONGODB_PORT||"5062"
export const dbUser = process.env.DB_MONGODB_USER||"dev"
export const dbPass = process.env.DB_MONGODB_PASS||"123123123"
export const dbName = process.env.DB_MONGODB_NAME||"dev-database"
export const dbRedisHost = process.env.DB_REDIS_HOST||"127.0.0.1"
export const dbRedisPort = process.env.DB_REDIS_PORT||"5063"
export const dbRedisPassword = process.env.DB_REDIS_PASSWORD||"pass132124325ed"
export const dbRedisUser = process.env.DB_REDIS_USER
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET||"shhhh-access-12312"
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET||"shhhh-refresh-14552"