import { collection } from '../mongo-db';
import { ObjectId } from 'mongodb';

export const getPermission = async ({ id }) => {
    return await collection('permissions').findOne({ _id: new ObjectId(id) });
}

export const addPermission = async ({ name, description }) => {
    const newPermission = { name, description, state: true }
    console.log('newPermisions', newPermission);
    const result = await collection('permissions').insertOne(newPermission)
    console.log('Result', result);
    return result.insertedId
}

// export const updateMedia = async ({ id, size, name, url }) => {
//     const updateMedia = { size, name, url }
//     const media = await collection('medias').updateOne({ _id: new ObjectId(id) }, { $set: updateMedia })
//     return media.matchedCount
// }

// export const removeMedia = async ({ id }) => {
//     const media = await collection('medias').deleteOne({ _id: new ObjectId(id) })
//     return media.deletedCount
// }