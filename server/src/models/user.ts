import { Schema, model, Document } from 'mongoose'
// 1. Create an interface representing a document in MongoDB.
export interface UserType {
    id: string
    _id: any
    username: string
    password: string
    discriminator: number
    email: string
    avatar?: string
    friends: FriendType[]
}
export type MongooseUserType = Document<any, any, UserType> &
    UserType & {
        _id: any
    }
export interface FriendType {
    user: UserType
    type: number
}
const Friend = new Schema<FriendType>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: Number
        }
    },
    { timestamps: false, _id: false }
)
const FriendModel = model('Friend', Friend)
export { FriendModel }

export const User = new Schema<UserType>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        discriminator: { type: Number },
        password: { required: true, type: String, select: false },
        avatar: { type: String, default: null },
        friends: { type: [Friend], select: false }
    },
    { timestamps: true }
)

export default model('User', User)
