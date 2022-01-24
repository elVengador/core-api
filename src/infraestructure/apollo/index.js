import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';

import { app } from '../express/index';
import { formatError } from '../../application/utils/error.util';
import { getUserIdFromToken } from '../../application/utils/auth.util';
import { getUserIdByAccessToken, verifyAccessToken } from '../../application/utils/jwt.util';

export const startApolloServer = async (typeDefs, resolvers, port) => {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async requestDidStart(requestContext) {
                    console.log('[📝 Log]:', requestContext.request.operationName);

                    // return {
                    //     async parsingDidStart(requestContext) {
                    //         console.log('Parsing started!');
                    //     },

                    //     async validationDidStart(requestContext) {
                    //         console.log('Validation started!');
                    //     }
                    // }
                },
            }
        ],
        formatError: formatError,
        context: async ({ req }) => { // save value to use in resolvers as a middleware
            try {
                console.log('[💾 Context]');
                const token = req.headers.authorization || '';
                if (!token) { return { userId: null } }
                const accessToken = token.split(' ')[1]

                const userId = await getUserIdByAccessToken(accessToken)
                return { userId };
            } catch (err) {
                return { userId: null }
            }
        },
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port }, resolve));
    console.log(`[📡 Server]: ready at http://localhost:${port}${server.graphqlPath}`);
}