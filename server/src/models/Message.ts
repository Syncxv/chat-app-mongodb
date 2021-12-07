import { Schema, model } from 'mongoose'

export interface MessageType {
    channel_id: string
    content: string
    author: Object
}
const Message = new Schema<MessageType>(
    {
        channel_id: {
            required: true,
            type: String
        },
        content: {
            required: true,
            type: String
        },
        author: {
            required: true,
            type: Object
        }
    },
    { timestamps: true }
)

export default model('Message', Message)
