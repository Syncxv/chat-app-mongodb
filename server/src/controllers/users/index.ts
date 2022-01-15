import { Request, Response } from 'express'
import { ioMap } from '../..'
import DmChannels from '../../models/channels'
import User, { UserType } from '../../models/user'
import { recciveFriendRequest } from '../../socket/users/friends'
import { FreindTypes, queryAuthType } from '../../types'
import getChannels from '../../utils/getChannels'
import login from './login'
import register from './register'
import { Server } from 'socket.io'
const users = {
    index: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data = await User.findOne({ _id: id })
            console.log(data)
            if (!data) return res.send({ error: 'no user eh' })
            return res.send({ data })
        } catch (err) {
            console.error(err)
            return res.send({ error: { message: err.message } })
        }
    },
    register,
    login,
    me: {
        // get Current User hehe
        index: async (req: Request<any, any, any, { jwt: { user: UserType } }>, res: Response) => {
            console.log('BRO WHY')
            try {
                const { user: jwt_user } = req.query.jwt
                console.log(jwt_user)
                if (!jwt_user) return res.status(500).send({ error: 'idk mawn jwt user isnt there' })
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
                if (members.length > 2) throw new Error('can only create channel with 2 people okay')
                const currentUser = await User.findOne({ _id: jwt_user.id })
                const sheesh = await Promise.all(
                    members.map(async s => (await User.findOne({ _id: s }))?._id.toString())
                )
                if (currentUser && sheesh.some(s => s !== undefined)) {
                    console.log(currentUser, sheesh, members)
                    const channel = await DmChannels.create({
                        members: [currentUser?._id.toString(), ...sheesh]
                    })
                    await channel.save()
                    return res.status(201).send(channel)
                }
                return res.status(404).send({ error: ':| member mismatch ig' })
            } catch (err) {
                return res.send({ error: { message: err.message } })
            }
        },
        getChannels: async (req: Request<any, any, any, queryAuthType>, res: Response) => {
            const { user: jwt_user } = req.query.jwt
            try {
                const channel = await getChannels(jwt_user.id, true)
                res.status(200).send(channel)
            } catch (err) {
                res.send({ error: { message: err.message } })
            }
        },
        friends: {
            //get all friends
            index: async (req: Request<any, any, any, queryAuthType>, res: Response) => {
                try {
                    const { user: jwt_user } = req.query.jwt
                    const user = await User.findById(jwt_user.id).populate([
                        { path: 'friends', model: 'Friend' }
                    ])
                    console.log('IN FRIENDS.INDEX: ', user)
                    res.send(user || { well: ':|' })
                } catch (err) {
                    console.error(err)
                    res.send({ error: { message: err.message } })
                }
            },
            // getFriend: async (req: Request<any, any, any, queryAuthType>, res: Response) => {
            //     try {
            //         const { user: jwt_user } = req.query.jwt
            //         const user = await User.findById(jwt_user.id).populate([
            //             { path: 'friends', model: 'Friend' }
            //         ])
            //     } catch(e) {
            //         return res.status(500).send({error: e.message})
            //     }
            // },
            add: async (req: Request<any, { username: string }, any, queryAuthType>, res: Response) => {
                try {
                    if (!req.body.username)
                        return res.status(400).send({ error: { message: 'WHY YOU NO PASS USERNAME HUH' } })
                    const { user: jwt_user } = req.query.jwt
                    const user = await User.findById(jwt_user.id).populate([
                        { path: 'friends', model: 'Friend' }
                    ])
                    const requestedUser = await User.findOne({ username: req.body.username }).populate([
                        { path: 'friends', model: 'Friend' }
                    ])
                    if (!requestedUser) return res.status(404).send({ error: { message: 'who tf is that' } })
                    user?.friends.push({ user: req.params.id, type: FreindTypes.PENDING_OUTGOING })
                    requestedUser.friends.push({ user: req.params.id, type: FreindTypes.PENDING_INCOMMING })
                    await user.save()
                    await requestedUser.save()
                    const io = ioMap.get('io')
                    recciveFriendRequest(io as Server, requestedUser.id, user.toJSON() as unknown as UserType)
                    console.log(user, requestedUser)
                    return res.send({ user })
                } catch (err) {
                    console.log(err)
                    return res.send({ error: { message: err.message } })
                }
            },
            //its not done :| ill do it later fuck sake
            remove: async (req: Request<any, any, any, queryAuthType>, res: Response) => {
                try {
                    const { user: jwt_user } = req.query.jwt
                    const user = await User.findById(jwt_user.id).populate([
                        { path: 'friends', model: 'Friend' }
                    ])
                    user.friends.pull({ user: { _id: req.params.id } })
                    user.save()
                    res.send({ user })
                } catch (err) {
                    res.send({ error: { message: err.message } })
                }
            }
        }
    }
}

export default users
