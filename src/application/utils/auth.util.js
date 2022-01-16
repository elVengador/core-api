import * as bcrypt from 'bcryptjs';

export const encriptPassword = async ({ password }) => {
    const salt = await bcrypt.genSalt(11);
    return await bcrypt.hash(password, salt);
}

export const matchPassword = async ({ password, user }) => {
    return await bcrypt.compare(password, user.password);
}