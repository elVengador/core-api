import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config()

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME

let dbClient = null

const main = async () => {
    try {
        const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}?retryWrites=true&w=majority`
        dbClient = new MongoClient(uri);
        await dbClient.connect();
        console.log(">. MongoDB connected successfull");
    } catch (e) {
        console.error(e);
    } finally {
        // await dbClient.close();
    }
}

export const collection = name => dbClient.db(dbName).collection(name)

main()
