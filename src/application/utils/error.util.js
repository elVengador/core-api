const MESSAGES = {
    BAD_REQUEST: 'Bad Request',
    FIELD_IS_BEING_USED: 'Field is being used',
    FIELD_INVALID: 'Field invalid',
    JWT_EXPIRED: 'Jwt expired', // DEPRECATED check to delete
    /** When access token is invalid and need other access token with refresh token */
    UNAUTHORIZED: 'Unauthorized',
    /** When refresh token is invalid and frontend need to redirect to signIn */
    SESSION_EXPIRED: 'Session Expired',
    SERVER_ERROR: 'Server Error'
}

const ERRORS = [
    { name: MESSAGES.BAD_REQUEST, statusCode: 400 },
    { name: MESSAGES.FIELD_IS_BEING_USED, statusCode: 400 },
    { name: MESSAGES.FIELD_INVALID, statusCode: 400 },
    { name: MESSAGES.JWT_EXPIRED, statusCode: 400 },
    { name: MESSAGES.UNAUTHORIZED, statusCode: 401 },
    { name: MESSAGES.SESSION_EXPIRED, statusCode: 401 },
    { name: MESSAGES.SERVER_ERROR, statusCode: 500 },
]

export const NEW = (message) => new Error(message)

export const BAD_REQUEST = () => new Error(MESSAGES.BAD_REQUEST)
export const FIELD_IS_BEING_USED = (field) => new Error(MESSAGES.FIELD_IS_BEING_USED)
export const FIELD_INVALID = (field) => new Error(MESSAGES.FIELD_INVALID)
export const JWT_EXPIRED = () => new Error(MESSAGES.JWT_EXPIRED)
export const UNAUTHORIZED = () => new Error(MESSAGES.UNAUTHORIZED)
export const SESSION_EXPIRED = () => new Error(MESSAGES.SESSION_EXPIRED)
export const SERVER_ERROR = () => new Error(MESSAGES.SERVER_ERROR)


const getErrorCode = (message) => {
    const error = ERRORS.find(cur => cur.name === message)
    return error ? error.statusCode : 500
}

const report = (err) => {
    console.log(`[🔥 Error]: ${err.message}`);
}

// export const formatError = (err) => {
//     console.log('formatError:', err.message);
//     report(err, req)    // <-- report log
//     return {
//         message: err.message,
//         code: getErrorCode(err.message),
//         locations: err.locations,
//         path: err.path
//     };
// }

export const formatError = (err) => {
    report(err)
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Database Error: ')) { return new Error('Internal server error') }
    return { message: err.message }
    // return err;
}