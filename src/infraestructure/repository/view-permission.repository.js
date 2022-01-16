import { collection } from '../mongo-db';
import { ObjectId } from 'mongodb';

export const getViewPermission = async ({ id }) => {
    return await collection('viewPermissions').findOne({ _id: new ObjectId(id) });
}

export const addViewPermission = async ({ view, operationPermissions, viewPermission }) => {
    const data = { view, operationPermissions, viewPermission }
    const view = await collection('views').insertOne(data)
    return view.insertedId
}
