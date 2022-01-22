import { locatedError } from "graphql"
import { saveUserIdFromToken } from "../../../application/utils/auth.util"
import { JWT_EXPIRED, NEW, SERVER_ERROR, UNAUTHORIZED } from "../../../application/utils/error.util"
import { verifyAccessToken } from "../../../application/utils/jwt.util"

const getTokenFromHeader = (header) => {
    const [_, token] = header.split(' ')
    return token
}

const isFreeContent = (body) => {
    if (body.operationName === 'operationName:') {
        console.log('operationName:', body.operationName);
        return ['signUp', 'signIn'].includes(operationName)
    }
    // example Query
    // query: '\n' +
    // '    mutation($nick:String!,$email:String!,$password:String!){\n' +
    // '        signUp(signUpInput:{\n' +
    // '            nick:$nick,\n' +
    // '            email:$email,\n' +
    // '            password:$password\n' +
    // '        })\n' +
    // '    }\n'
    const isFree = ['signUp', 'signIn']
        .map(cur => body.query.includes(cur))
        .filter(cur => cur)
        .length > 0

    return isFree
}

export const auth = async (req, res, next) => {
    try {
        // console.log('--- -- -- --- -->\n\n', req.body.operationName);
        if (isFreeContent(req.body)) { return next() }

        if (!req.headers['authorization']) { return next(UNAUTHORIZED()) }
        // if (!req.headers['authorization']) { return next(UNAUTHORIZED()) }
        const accessToken = getTokenFromHeader(req.headers['authorization'])
        const userId = await verifyAccessToken({ accessToken })
        saveUserIdFromToken(req, userId)
        if (!userId) { return UNAUTHORIZED() }
        next();
    } catch (err) {
        if (err === 'jwt expired') { return reject(locatedError(err)) }

        console.log('|', err, '|');
        next(SERVER_ERROR())
    }
}

export const error = (err, req, res, next) => {
    return res.status(400).send(locatedError('uyu'))
    // if (err.message === 'Unauthorized') { return res.status(400).json({ data: null, error: err.message }) }
    // if (err.message === 'Jwt expired') { return res.status(400).json({ data: null, error: { message: err.message } }) }

    // console.log('----- ----- ----->>> err:\n', err.message, err.stack, '\n<<<----- ----- -----\n');
    // res.status(500).json({ 'state': 'BAD' })
    // next() : default handling error ny nodeJs
    // IMPORTANT!!: if the error is knowing ? you must control what you respond : next()
    // next(err)
}