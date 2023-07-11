import * as bcrypt from 'bcrypt'
export const hashpass = async (password: string) => await bcrypt.hash(password, 10)

export const comparePassword = async(plainPassword,dbPassword)=> await bcrypt.compare(plainPassword,dbPassword)