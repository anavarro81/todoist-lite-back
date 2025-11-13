import bcrypt from "bcrypt"

export const hashPassword = async (password: string): Promise<String> => {

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

export const comparePassword = async (password: string, hashPassword: string) => {

    return await bcrypt.compare(password,password )

}