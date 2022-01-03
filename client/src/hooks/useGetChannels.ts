import channelStore from '../stores/channel'
import { RawChannel } from '../types'
import sleep from '../util/sleep'

const getChannels = (): RawChannel[] => {
    return Object.values(channelStore.getChannels())
}
export default getChannels
