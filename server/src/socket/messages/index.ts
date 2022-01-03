import { UserType } from '../../models/user'
interface createMessageEvent {
    message: { author: UserType; content: string }
}
export const handleMessagePost = (event: createMessageEvent) => {}
