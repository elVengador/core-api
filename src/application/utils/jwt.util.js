import jwt from 'jsonwebtoken'

import { accessTokenSecret, refreshTokenSecret } from '../../core.enviroments';

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

export const verifyAccessToken = ({ accessToken }) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
                if (err && err?.name === 'JsonWebTokenError') { return reject('Token invalid') }
                if (err) { return reject(err.message) }
                return resolve(payload.sub)
            })
        } catch (err) {
            return reject(new Error('Not authorization'))
        }
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

