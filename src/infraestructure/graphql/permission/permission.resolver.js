import * as permissionController from '../../../application/controllers/permission.controller';

export const permissionResolver = {
    getPermission: permissionController.getPermission,
    addPermission: permissionController.addPermission,
}
