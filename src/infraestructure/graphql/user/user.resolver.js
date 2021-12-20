import { getUser } from '../../repository/user.repository';

const userResolver = {
    getUser: getUser
}

export { userResolver }