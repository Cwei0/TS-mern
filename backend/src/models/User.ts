import { model, Schema } from "mongoose";

export interface User {
    username: string,
    email: string,
    password: string,
    roles: string,
}

const UserSchema: Schema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: String, default: 'user', enum: ['user', 'admin'] },
}, { timestamps: true })

export default model<User>('User', UserSchema)