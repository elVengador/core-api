import { NEW, SERVER_ERROR, UNAUTHORIZED } from "../../../application/utils/error.util"
import { verifyAccessToken } from "../../../application/utils/jwt.util"

const getTokenFromHeader = (header) => {
    const [_, token] = header.split(' ')
    return token
}

export const auth = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) { return next(new Error('.Not authorization')) }
        const accessToken = getTokenFromHeader(req.headers['authorization'])
        const userId = await verifyAccessToken({ accessToken })
        if (!userId) { return UNAUTHORIZED() }
        next();
    } catch (err) {
        next(SERVER_ERROR())
    }
}

export const error = (err, req, res, next) => {
    console.log('----- ----- ----->>> err:\n', err.message, '\n<<<----- ----- -----\n');
    res.status(500).json({ 'state': 'BAD' })
    // next() : default handling error ny nodeJs
    // IMPORTANT!!: if the error is knowing ? you must control what you respond : next()
}