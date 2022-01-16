import * as express from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import { coreSchemas, coreResolvers } from './infraestructure/graphql';
import './infraestructure/mongo-db';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(coreSchemas),
    rootValue: coreResolvers,
    graphiql: true,
}));

app.get('/', (req, res) => res.send('🛹'))

app.listen(4100, () => console.log('Running api on port 4100'));