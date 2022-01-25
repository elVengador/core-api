import { MongoClient } from 'mongodb';

import { dbHost, dbUser, dbPass, dbName } from '../../core.enviroments';

let dbClient = null

const main = async () => {
    try {
        const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}?retryWrites=true&w=majority`
        dbClient = new MongoClient(uri);
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
