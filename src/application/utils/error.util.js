export const NEW = (message) => new Error(message)

// 400
export const BAD_REQUEST = () => new Error('Bad Request')
export const FIELD_IS_BEING_USED = (field) => new Error(`${field} is being used`)
export const FIELD_INVALID = (field) => new Error(`${field} invalid`)

// 401
export const UNAUTHORIZED = () => new Error('Unauthorized')

// 500
export const SERVER_ERROR = () => new Error('Server Error')
