import { createClient } from 'redis'
import { dbRedisHost, dbRedisPort,dbRedisPassword ,dbRedisUser} from '../../core.enviroments';

// redis[s]://[[username][:password]@][host][:port][/db-number]
const productionUri = `redis://${dbRedisUser}:${dbRedisPassword}@${dbRedisHost}:${dbRedisPort}`
const url = `redis://:${dbRedisPassword}@${dbRedisHost}:${dbRedisPort}`
const selectedUri = process.env.NODE_ENV !== "development"?url:productionUri
console.log({selectedUri})

const client = createClient({url:productionUri});

const main = async () => {
    await client.connect()
    console.log("[💽 Redis]: connected successfull");
}

export default client

main()