import { User } from "../../domain/user.entities";
import * as userRepository from "../../infraestructure/repository/user.repository"
import * as tokenRepository from "../../infraestructure/repository/redis/token.repository"
import { encriptPassword, matchPassword } from "../utils/auth.util";
import { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.util";
import * as errorUtil from '../utils/error.util';
import { waitMilliseconds } from "../utils/timer";

const YEAR_IN_SECONDS = 365 * 24 * 60 * 60

export const signUp = async (parent, { signUpInput }) => {
    try {
        const { nick, email, password } = signUpInput
        const existUser = await userRepository.getUser({ email })
        if (existUser) { return errorUtil.NEW('Email ya esta en uso') }

        let newUser = User()
        newUser.nick = nick
        newUser.email = email
        newUser.password = await encriptPassword({ password })
        return await userRepository.addUser(newUser)
    } catch (err) {
        console.log(err);
        return errorUtil.SERVER_ERROR()
    }
}

export const signIn = async (parent, { signInInput }) => {
    try {
        await waitMilliseconds(1000)
        const { email, password } = signInInput
        const user = await userRepository.existUser({ email })
        if (!user) { return errorUtil.FIELD_INVALID('User') }

        const isMatch = await matchPassword({ password, user })
        if (!isMatch) { return errorUtil.FIELD_INVALID('User / Password is not valid') }

        const accessToken = await signAccessToken({ userId: user._id, rol: user.rol || 'dev' })
        const refreshToken = await signRefreshToken({ userId: user._id })

        await tokenRepository.addRefreshToken({ userId: user._id.toString(), token: refreshToken, expiration: YEAR_IN_SECONDS })
        return { accessToken, refreshToken }
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const signOff = async ({ signOffInput }) => {
    try {
        const { currentRefreshToken } = signOffInput
        if (!currentRefreshToken) { return errorUtil.UNAUTHORIZED() }

        const userId = await verifyRefreshToken({ refreshToken: currentRefreshToken })
        const validRefreshToken = await tokenRepository.getRefresToken({ userId })
        if (currentRefreshToken !== validRefreshToken) { return errorUtil.UNAUTHORIZED() }

        await tokenRepository.removeRefreshToken({ userId })
        return true
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const refreshToken = async (parent, { refreshTokenInput }) => {
    try {
        const { currentRefreshToken, retryNumber } = refreshTokenInput
        if (retryNumber > 1) { return errorUtil.NEW('MANY_TRYS') }
        if (!currentRefreshToken) { return errorUtil.BAD_REQUEST() }
        console.log(' REFRESH_TOKEN:', currentRefreshToken);
        const userId = await verifyRefreshToken({ refreshToken: currentRefreshToken })
        const validRefreshToken = await tokenRepository.getRefresToken({ userId })
        if (currentRefreshToken !== validRefreshToken) { return errorUtil.SESSION_EXPIRED() }

        const accessToken = await signAccessToken({ userId, rol: 'dev' })
        const refreshToken = await signRefreshToken({ userId })
        await tokenRepository.addRefreshToken({ userId, token: refreshToken, expiration: YEAR_IN_SECONDS })
        return { accessToken, refreshToken }
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const privateContent = async () => {
    try {
        return 'Hi man you got access to private content'
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}