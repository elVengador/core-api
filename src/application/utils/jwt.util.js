import { locatedError } from 'graphql';
import jwt from 'jsonwebtoken'

import { accessTokenSecret, refreshTokenSecret } from '../../core.enviroments';
import { SERVER_ERROR, UNAUTHORIZED } from './error.util';

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
            console.log('will verify', accessToken, accessTokenSecret);
            jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
                console.log('will compare');
                console.log('ERRRRR', err, '\n -->', err?.name, '\n');
                if (err && err?.name === 'JsonWebTokenError') { return reject(UNAUTHORIZED()) }
                if (err && err?.name === 'TokenExpiredError') { return reject(UNAUTHORIZED()) }
                if (err) { return reject(SERVER_ERROR()) }
                console.log('will resolver');
                return resolve(payload.sub)
            })
        } catch (err) {
            // return reject(new Error('Not authorization'))
            return reject(SERVER_ERROR())
        }
    })
}

export const signRefreshToken = ({ userId, aud = 'app' }) => {
    return new Promise((resolve, reject) => {
        const expiresIn = '30 days'
        const issuer = 'vauth'
        const payload = { aud, sub: userId }
        const secret = refreshTokenSecret
        const options = { expiresIn, issuer }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err || !token) { return reject(new Error('Invalid')) }
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

export const getUserIdByAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
                if (err && err?.name === 'JsonWebTokenError') { return resolve(null) }
                if (err && err?.name === 'TokenExpiredError') { return resolve(null) }
                if (err) { return reject(SERVER_ERROR()) }
                return resolve(payload.sub)
            })
        } catch (err) {
            // return reject(new Error('Not authorization'))
            console.log('ERR_GET_USER_BY_TOKEN:', err);
            return reject(SERVER_ERROR())
        }
    })
}