import * as authController from '../../../application/controllers/auth.controller';

export const authResolver = {
    signUp: authController.signUp,
    signIn: authController.signIn
}