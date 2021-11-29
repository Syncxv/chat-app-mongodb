import { Schema, model } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface User {
    username: string
    discriminator: number
    email: string
    avatar?: string
}

const user = new Schema<User>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        discriminator: { type: Number },
        avatar: String
    },
    { timestamps: true }
)

export default model('User', user)
