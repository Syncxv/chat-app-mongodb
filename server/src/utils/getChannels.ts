import DmChannels from '../models/channels'
const getChannels = async (id: string, raw: boolean = false) => {
    if (!raw) {
        const channels = await DmChannels.find({
            members: { $in: [id] }
        })
        const realchannel = channels.map(chan => {
            chan.members = chan.members.filter(memberId => memberId !== id)
            return chan
        })
        return realchannel
    }
    const channels = await DmChannels.find({
        members: { $in: [id] }
    }).populate({ path: 'members', model: 'User' })
    const rawRealchannel = channels.map(item => ({
        ...item.toJSON(),
        members: item.toJSON().members.filter((member: any) => member._id.toString() !== id)
    }))
    return rawRealchannel
}

export default getChannels
