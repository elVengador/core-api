import { authMutationResolver, authQueryResolver } from '../apollo/auth/auth.resolver';

// type Query {${querySchemas}}

export const coreQueryResolver = {
    hola: () => 'Hi'
}

export const coreMutationResolver = {
    ...authMutationResolver
}
