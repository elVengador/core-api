import { userSchema } from './user/user.schema';
import { userResolver } from './user/user.resolver';

// Construct a schema, using GraphQL schema language
var coreSchemas = `
  ${userSchema}  
`

// The root provides a resolver function for each API endpoint
var coreResolvers = {
  ...userResolver,
};

export { coreSchemas, coreResolvers }