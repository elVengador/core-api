import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import { userSchema } from './user/user.schema';
import { userResolver } from './user/user.resolver';

// Construct a schema, using GraphQL schema language
var coreSchemas = buildSchema(`
  ${userSchema}  
`);

// The root provides a resolver function for each API endpoint
var coreResolvers = {
  ...userResolver,
};

// const graphQlHttpConfig = graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// })

export { coreSchemas, coreResolvers }