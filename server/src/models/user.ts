import { Schema, model } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface UserType {
    id: string
    username: string
    password: string
    discriminator: number
    email: string
    avatar?: string
}

const User = new Schema<UserType>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        discriminator: { type: Number },
        password: { required: true, type: String, select: false },
        avatar: { type: String, default: null }
    },
    { timestamps: true }
)

export default model('User', User)
