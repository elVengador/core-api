// import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

// dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

console.log('AT', accessTokenSecret, 'RT', refreshTokenSecret);

const getTokenFromHeader = (header) => {
    const [_, token] = header.split(' ')
    return token
}

export const signAccessToken = ({ userId, rol, aud = 'app' }) => {
    return new Promise((resolve, reject) => {
        const expiresIn = '15m'
        const issuer = 'vauth'
        const payload = { rol, aud, sub: userId }
        const secret = accessTokenSecret
        const options = { expiresIn, issuer }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) { return reject(new Error(err)) }
            if (!token) { return reject(new Error('Server error at')) }
            resolve(token)
        })
    })
}

export const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) { return next(new Error('Not authorization')) }
    const token = getTokenFromHeader(req.headers['authorization'])
    jwt.verify(token, accessTokenSecret, (err, payload) => {
        if (err.name === 'JsonWebTokenError') { return next(new Error('Token invalid')) }
        if (err) { return next(new Error(err.message)) }
        req.payload = payload
        next()
    })
}

export const signRefreshToken = ({ userId, aud = 'app' }) => {
    return new Promise((resolve, reject) => {
        const expiresIn = '1y'
        const issuer = 'vauth'
        const payload = { aud, sub: userId }
        const secret = refreshTokenSecret
        const options = { expiresIn, issuer }
        jwt.sign(payload, secret, options, (err, token) => {
            console.log('ERR:', err, '????');
            console.log('TOKEN', token, '????');
            if (err || !token) { return reject(new Error('Invalid')) }
            console.log('resolve', token);
            resolve(token)
        })
    })
}

export const verifyRefreshToken = ({ refreshToken }) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
                if (err) throw new Error()
                return resolve(payload.sub)
            })
        } catch (err) {
            return reject(new Error('Not authorization'))
        }
    })
}

