import * as bcrypt from 'bcrypt'
export const hashpass = async (password: string) => await bcrypt.hash(password, 10)