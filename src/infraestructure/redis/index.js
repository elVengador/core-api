import { createClient } from 'redis'
import { dbRedisHost, dbRedisPort,dbRedisPassword } from '../../core.enviroments';

// redis[s]://[[username][:password]@][host][:port][/db-number]
const url = `redis://:${dbRedisPassword}@${dbRedisHost}:${dbRedisPort}`
console.log({url})
const client = createClient({url});

const main = async () => {
    await client.connect()
    console.log("[💽 Redis]: connected successfull");
}

export default client

main()