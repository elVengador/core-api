import { collection } from '../mongo-db';
import { ObjectId } from 'mongodb';

// const viewMock = View
// viewMock.name = 'file'
// viewMock.description = 'some description'
// viewMock.icon = 'fa fa-motorcycle'

export const getView = async ({ id }) => {
    return await collection('views').findOne({ _id: new ObjectId(id) });
}

export const addView = async ({ name, description, icon }) => {
    const newView = { name, description, icon }
    const view = await collection('views').insertOne(newView)
    return view.insertedId
}
