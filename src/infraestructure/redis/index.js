import { createClient } from 'redis'
import { dbRedisHost, dbRedisPort, dbRedisPass } from '../../core.enviroments';

// redis[s]://[[username][:password]@][host][:port][/db-number]
console.log(' === ==== > HOST:', dbRedisHost, ':', dbRedisPort);
const client = createClient({
    url: `redis://${dbRedisHost}:${dbRedisPort}`
});

const main = async () => {
    // const url= 'redis://alice:foobared@awesome.redis.server:6380'
    await client.connect()
    console.log("[💽 Redis]: connected successfull");
}

export default client

main()