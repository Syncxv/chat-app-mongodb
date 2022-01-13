import { Schema, model } from 'mongoose'

export interface DmChannelType {
    members: any[]
}

const DmChannel = new Schema<DmChannelType>(
    {
        members: [{ type: 'ObjectId', ref: 'User' }]
    },
    { timestamps: true }
)

export default model('DmChannel', DmChannel)
