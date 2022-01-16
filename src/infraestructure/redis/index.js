import { createClient } from 'redis'

// redis[s]://[[username][:password]@][host][:port][/db-number]
const client = createClient({});

const main = async () => {
    // const url= 'redis://alice:foobared@awesome.redis.server:6380'
    await client.connect()
    console.log(">. Redis connected successfull");
}

export default client

main()