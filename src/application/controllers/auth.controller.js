import { User } from "../../domain/user.entities";
import * as userRepository from "../../infraestructure/repository/user.repository"
import * as tokenRepository from "../../infraestructure/repository/redis/token.repository"
import { encriptPassword, matchPassword } from "../utils/auth.util";
import { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.util";

export const signUp = async ({ signUpInput }) => {
    const { nick, email, password } = signUpInput
    const existUser = await userRepository.getUser({ email })
    if (existUser) { throw new Error('Email ya esta en uso') }

    let newUser = User()
    newUser.nick = nick
    newUser.email = email
    newUser.password = await encriptPassword({ password })
    return await userRepository.addUser(newUser)
}

export const signIn = async ({ signInInput }) => {
    try {
        const { email, password } = signInInput
        const user = await userRepository.existUser({ email })
        if (!user) { return new Error('User is not registered') }

        const isMatch = await matchPassword({ password, user })
        if (!isMatch) { return new Error('User / Password is not valid') }

        const accessToken = await signAccessToken({ userId: user._id, rol: user.rol || 'dev' })
        const refreshToken = await signRefreshToken({ userId: user._id })
        const YEAR_IN_SECONDS = 365 * 24 * 60 * 60
        await tokenRepository.addRefreshToken({ userId: user._id.toString(), token: refreshToken, expiration: YEAR_IN_SECONDS })
        return { accessToken, refreshToken }
    } catch (err) {
        return new Error('Server error')
    }
}

export const signOff = async ({ refreshToken: currentRefreshToken }) => {
    if (!currentRefreshToken) return new Error('Not authorization')

    const userId = await verifyRefreshToken({ refreshToken: currentRefreshToken })
    const validRefreshToken = await tokenRepository.getRefresToken({ userId })
    if (currentRefreshToken !== validRefreshToken) { return new Error('Not authorization') }

    await tokenRepository.removeRefreshToken({ userId })
    return true
}

export const refreshToken = async ({ refreshToken: currentRefreshToken }) => {
    if (!currentRefreshToken) { return new Error('Bad Request') }

    const userId = await verifyRefreshToken({ refreshToken: currentRefreshToken })
    const accessToken = await signAccessToken({ userId: userId, rol: 'dev' })
    const refreshToken = await signRefreshToken({ userId: userId })
    return { accessToken, refreshToken }
}