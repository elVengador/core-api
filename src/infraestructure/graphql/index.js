import { userSchema } from './user/user.schema';
import { userResolver } from './user/user.resolver';
import { mediaMutation, mediaQuery, mediaSchema } from './media/media.schema';
import { viewMutation, viewQuery, viewSchema } from './view/view.schema';
import { mediaResolver } from './media/media.resolver';
import { viewResolver } from './view/view.resolver';
import { permissionMutation, permissionQuery, permissionSchema } from './permission/permission.schema';
import { permissionResolver } from './permission/permission.resolver';
import { authResolver } from './auth/auth.resolver';
import { authMutation, authQuery, authSchema } from './auth/auth.schema';

// Construct a schema, using GraphQL schema language
export var coreSchemas = `
    ${authSchema}
    ${mediaSchema}
    ${viewSchema}
    ${permissionSchema}
    ${userSchema}
`

export const coreQuerySchemas = `
    ${authQuery}
    ${mediaQuery}
    ${viewQuery}
    ${permissionQuery}
`

export const coreMutationSchemas = `
    ${authMutation}
    ${mediaMutation}
    ${viewMutation}
    ${permissionMutation}
`

// The root provides a resolver function for each API endpoint
export const coreResolvers = {
    ...authResolver,
    ...mediaResolver,
    ...viewResolver,
    ...userResolver,
    ...permissionResolver
};
