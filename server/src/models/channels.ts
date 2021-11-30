import { Schema, model } from 'mongoose'

export interface DmChannelType {
    members: string[]
}

const DmChannel = new Schema<DmChannelType>(
    {
        members: {
            // required: true
        }
    },
    { timestamps: true }
)

export default model('DmChannel', DmChannel)
