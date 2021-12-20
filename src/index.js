import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { coreSchemas, coreResolvers } from './infraestructure/graphql';
import './infraestructure/mongo-db';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: coreSchemas,
    rootValue: coreResolvers,
    graphiql: true,
}));

app.get('/', (req, res) => res.send('🚀'))

app.listen(4000, () => console.log('Running api on port 4000'));