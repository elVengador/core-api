import redisClient from '../../redis';

export const addRefreshToken = async ({ userId, token, expiration }) => {
    return await redisClient.set(userId, token, 'EX', expiration)
}

export const getRefresToken = async ({ userId }) => {
    return await redisClient.get(userId)
}

export const removeRefreshToken = async ({ userId }) => {
    return await redisClient.del(userId)
}
