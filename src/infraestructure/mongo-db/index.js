import { MongoClient } from 'mongodb';

import { dbHost, dbUser, dbPass, dbName, dbPort } from '../../core.enviroments';

let dbClient = null

const main = async () => {
    try {
        const uri = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}?retryWrites=true&w=majority`
        dbClient = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });
        await dbClient.connect();
        console.log("[💽 MongoDB]: connected successfull");
    } catch (e) {
        console.error(e);
    } finally {
        // await dbClient.close();
    }
}

export const collection = name => dbClient.db(dbName).collection(name)

main()
