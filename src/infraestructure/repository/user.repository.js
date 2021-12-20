import { User } from '../../domain/user.entities';

const userMock = User
userMock.name = 'Jimy'
userMock.nick = 'ev'

const getUser = () => {
    return userMock
}

const getUsers = () => {
    return userMock
}

const addUser = () => {
    return userMock
}

export { getUser }