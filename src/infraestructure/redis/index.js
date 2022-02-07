import { createClient } from 'redis'
import { dbRedisHost, dbRedisPort } from '../../core.enviroments';

// redis[s]://[[username][:password]@][host][:port][/db-number]
const client = createClient({
    url: `redis://${dbRedisHost}:${dbRedisPort}`
});

const main = async () => {
    await client.connect()
    console.log("[💽 Redis]: connected successfull");
}

export default client

main()