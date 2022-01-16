import { collection } from '../mongo-db';
import { ObjectId } from 'mongodb';

// const mediaMock = Media
// mediaMock.size = 100
// mediaMock.name = 'file'
// mediaMock.url = 'some-url.png'

export const getMedia = async ({ id }) => {
    return await collection('medias').findOne({ _id: new ObjectId(id) });
}

export const addMedia = async ({ size, name, url }) => {
    const newMedia = { size, name, url }
    const media = await collection('medias').insertOne(newMedia)
    return media.insertedId
}

export const updateMedia = async ({ id, size, name, url }) => {
    const updateMedia = { size, name, url }
    const media = await collection('medias').updateOne({ _id: new ObjectId(id) }, { $set: updateMedia })
    return media.matchedCount
}

export const removeMedia = async ({ id }) => {
    const media = await collection('medias').deleteOne({ _id: new ObjectId(id) })
    return media.deletedCount
}
