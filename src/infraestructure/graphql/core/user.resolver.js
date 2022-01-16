import * as userController from '../../../application/controllers/user.controller';

const userResolver = {
    getUser: userController.getUser,
    // getUsers: userController.getUsers,
    addUser: userController.addUser
}

export { userResolver }