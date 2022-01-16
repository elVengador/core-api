import * as permissionRepository from "../../infraestructure/repository/permission.repository"

export const getPermission = ({ id }) => {
    return permissionRepository.getPermission({ id })
}

export const addPermission = ({ permissionInput }) => {
    return permissionRepository.addPermission(permissionInput)
}
