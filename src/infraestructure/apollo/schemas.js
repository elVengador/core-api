import { authSchema, authQuery, authMutation } from '../apollo/auth/auth.schema';

export var coreSchemas = `
    ${authSchema}
`

export const coreQuerySchemas = `
    ${authQuery}
`

export const coreMutationSchemas = `
    ${authMutation}
`