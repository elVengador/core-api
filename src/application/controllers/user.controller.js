import * as userRepository from "../../infraestructure/repository/user.repository"

export const getUser = ({ email }) => {
    return userRepository.getUser({ email })
}

// export const getUsers = () => {
//     return userRepository.getUsers()
// }

// export const addUser = ({ nick, email, password }) => {
//     let newUser = User
//     newUser.nick = nick
//     newUser.email = email
//     newUser.password = password
//     return userRepository.addUser(newUser)
// }
