import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config()

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const main = async () => {
    const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.cvrvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
