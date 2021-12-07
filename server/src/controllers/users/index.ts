import { Request, Response } from 'express'
import DmChannels from '../../models/channels'
import User, { UserType } from '../../models/user'
import { queryAuthType } from '../../types'
import login from './login'
import register from './register'
const users = {
    index: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data = await User.findById(id)
            if (!data) return res.send({ error: 'no user eh' })
            return res.send({ data })
        } catch (err) {
            console.error(err)
            return res.send({ error: err.message })
        }
    },
    register,
    login,
    me: {
        index: async (
            req: Request<any, any, any, { jwt: { user: UserType } }>,
            res: Response
        ) => {
            console.log('BRO WHY')
            try {
                const { user: jwt_user } = req.query.jwt
                console.log(jwt_user)
                if (!jwt_user)
                    return res
                        .status(500)
                        .send({ error: 'idk mawn jwt user isnt there' })
                const user = await User.findById(jwt_user.id)
                return res.send({ user })
            } catch (err) {
                console.error(err)
                return res.send(err.message)
            }
        },
        createChannel: async (
            req: Request<any, any, { members: string[] }, queryAuthType>,
            res: Response
        ) => {
            try {
                const { members } = req.body
                const { user: jwt_user } = req.query.jwt
                if (members.length > 2)
                    throw new Error(
                        'can only create channel with 2 people okay'
                    )
                const channel = await DmChannels.create({
                    members: [jwt_user.id, ...members]
                })
                await channel.save()
                res.send({ data: channel })
            } catch (err) {
                res.send({ error: { message: err.message } })
            }
        },
        getChannels: async (
            req: Request<any, any, any, queryAuthType>,
            res: Response
        ) => {
            const { user: jwt_user } = req.query.jwt
            try {
                const channels = await DmChannels.find({
                    members: { $in: [jwt_user.id] }
                })
                console.log(channels)
                const realchannel = channels.map(chan => {
                    chan.members = chan.members.filter(id => id !== jwt_user.id)
                    return chan
                })
                res.status(200).send(realchannel)
            } catch (err) {
                res.send({ error: { message: err.message } })
            }
        }
    }
}

export default users
