import * as authController from '../../../application/controllers/auth.controller';

export const authResolver = {
    signUp: authController.signUp,
    signIn: authController.signIn,
    signOff: authController.signOff,
    refreshToken: authController.refreshToken,
    privateContent: authController.privateContent
}