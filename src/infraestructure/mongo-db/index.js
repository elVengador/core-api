import { MongoClient } from 'mongodb';

import { dbHost, dbUser, dbPass, dbName, dbPort } from '../../core.enviroments';

let dbClient = null

const main = async () => {
    try {
        const productionUri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/?retryWrites=true&w=majority`
        const uri = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}?retryWrites=true&w=majority`
        const selectedUri = process.env.NODE_ENV === "development"?uri:productionUri
        console.log('> > connect to URI:',{env:process.env.NODE_ENV,selectedUri}, selectedUri);
        dbClient = new MongoClient(selectedUri);
        await dbClient.connect();
        console.log("[💽 MongoDB]: connected successfull");
    } catch (err) {
        console.error('> >', err);
    } finally {
        // await dbClient.close();
    }
}

export const collection = name => dbClient.db(dbName).collection(name)

main()
