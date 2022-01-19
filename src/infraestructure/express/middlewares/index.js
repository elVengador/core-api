import { saveUserIdFromToken } from "../../../application/utils/auth.util"
import { NEW, SERVER_ERROR, UNAUTHORIZED } from "../../../application/utils/error.util"
import { verifyAccessToken } from "../../../application/utils/jwt.util"

const getTokenFromHeader = (header) => {
    const [_, token] = header.split(' ')
    return token
}

const isFreeContent = (operationName) => {
    //operationName
    // example Query
    // query: '\n' +
    // '    mutation($nick:String!,$email:String!,$password:String!){\n' +
    // '        signUp(signUpInput:{\n' +
    // '            nick:$nick,\n' +
    // '            email:$email,\n' +
    // '            password:$password\n' +
    // '        })\n' +
    // '    }\n'
    // const isFree = ['signUp', 'signIn']
    //     .map(cur => operationName.includes(cur))

    const isFree = ['signUp', 'signIn'].includes(operationName)
    // console.log('isFree', isFree);
    // const tt = isFree
    //     .filter(cur => cur)
    //     .length > 0

    // console.log('isFree', isFree);
    // console.log('tt', isFree);
    return isFree
}

export const auth = async (req, res, next) => {
    try {
        // console.log('REQ:', req.body);
        const query = req.body?.query
        // console.log('--- -- -- --- -->\n\n', req.body.operationName);
        if (isFreeContent(query)) { return next() }

        if (!req.headers['authorization']) { return next(UNAUTHORIZED()) }
        const accessToken = getTokenFromHeader(req.headers['authorization'])
        const userId = await verifyAccessToken({ accessToken })
        saveUserIdFromToken(req, userId)
        if (!userId) { return UNAUTHORIZED() }
        next();
    } catch (err) {
        next(SERVER_ERROR())
    }
}

export const error = (err, req, res, next) => {
    if (err.message === 'Unauthorized') { return res.status(400).json({ 'state': err.message }) }

    console.log('----- ----- ----->>> err:\n', err.message, '\n<<<----- ----- -----\n');
    res.status(500).json({ 'state': 'BAD' })
    // next() : default handling error ny nodeJs
    // IMPORTANT!!: if the error is knowing ? you must control what you respond : next()
}