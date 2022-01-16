import { collection } from '../mongo-db';
import { ObjectId } from 'mongodb';
import { User } from '../../domain/user.entities';

// const userMock = User
// userMock.name = 'Jimy'
// userMock.nick = 'ev'

export const getUser = async ({ email }) => {
    return await collection('users').findOne({ email })
}

// export const getUsers = async () => {
//     const cursor = await collection('users').find({});
//     return await cursor.toArray()
// }

export const addUser = async (newUser) => {
    const user = await collection('users').insertOne(newUser)
    return user.insertedId
}

export const existUser = async ({ email }) => {
    return await collection('users').findOne({ email })
}
