
import { model, Schema } from 'mongoose';
export interface IError {
    text: string;
}

export interface ISUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    created?: Date;
}


export const isError = (something: any | IError) => {
    return (<IError>something).text !== undefined;
}

const userSchema = new Schema<ISUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, required: true, default: () => new Date(Date.now()) },
});


export const UserModel = model<ISUser>('User', userSchema);


export const checkIfEmailExists = async (email: string): Promise<boolean | IError> => {
    try {
        const users = await UserModel.find({ email: email })
        if (users.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return { text: error.toString() }
    }
}


export const findUsers = async (query: any, incPassword?: boolean): Promise<ISUser[] | IError> => {
    const selectFields = (incPassword && incPassword === true ? { _id: true, name: true, email: true, created: true, password: true } : { _id: true, name: true, email: true, created: true })
    try {
        const users = await UserModel.find(query).select(selectFields)
        return users;
    } catch (error: any) {
        return { text: error.toString() }
    }
}

export const addUser = async (data: any): Promise<ISUser | IError> => {
    try {
        const { name, email, password } = data;
        const newUser = new UserModel({ name, email, password })
        await newUser.validate()
        await newUser.save();
        return newUser;
    } catch (error: any) {
        //   console.log("error:", error)
        return { text: error.toString() }
    }
}