import * as bcrypt from 'bcryptjs';

export const encriptPassword = async ({ password }) => {
    const salt = await bcrypt.genSalt(11);
    return await bcrypt.hash(password, salt);
}

export const matchPassword = async ({ password, user }) => {
    return await bcrypt.compare(password, user.password);
}

export const saveUserIdFromToken = (req, userId) => {
    console.log('save');
    req.app.set('userId', userId)
}

export const getUserIdFromToken = (req) => {
    const userId = req.app.get('userId')
    if (!userId) { return errorUtil.BAD_REQUEST() }
    console.log('userID:', userId);
    return userId
}