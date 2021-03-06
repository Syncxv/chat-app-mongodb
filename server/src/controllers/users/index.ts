import { Request, Response } from 'express'
import { ioMap } from '../..'
import DmChannels from '../../models/channels'
import User, { UserType } from '../../models/user'
import { handleFriendRequest } from '../../socket/users/friends'
import { FreindTypes, queryAuthType } from '../../types'
import getChannels from '../../utils/getChannels'
import login from './login'
import register from './register'
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
            return res.status(500).send({ error: { message: err.message } })
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
                        members: [...sheesh, currentUser?._id.toString()]
                    })
                    await channel.save()
                    return res.status(201).send(await channel.populate({ path: 'members' }))
                }
                return res.status(404).send({ error: ':| member mismatch ig' })
            } catch (err) {
                return res.status(500).send({ error: { message: err.message } })
            }
        },
        getChannels: async (req: Request<any, any, any, queryAuthType>, res: Response) => {
            const { user: jwt_user } = req.query.jwt
            try {
                const channel = await getChannels(jwt_user.id, true)
                res.status(200).send(channel)
            } catch (err) {
                res.status(500).send({ error: { message: err.message } })
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
                    res.status(500).send({ error: { message: err.message } })
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
                    if (req.body.username === jwt_user.username)
                        return res.status(405).send({ error: { message: 'bruh cant add yo self' } })
                    const requestedUser = await User.findOneAndUpdate(
                        { username: req.body.username },
                        {
                            $addToSet: {
                                friends: { user: jwt_user.id, type: FreindTypes.PENDING_INCOMMING }
                            }
                        },
                        { new: true }
                    ).populate({ path: 'friends', populate: { path: 'user' } })
                    if (!requestedUser) return res.status(404).send({ error: { message: 'who tf is that' } })
                    const currentUser = await User.findOneAndUpdate(
                        { _id: jwt_user.id },
                        {
                            $addToSet: {
                                friends: { user: requestedUser!._id, type: FreindTypes.PENDING_OUTGOING }
                            }
                        },
                        { new: true }
                    ).populate({ path: 'friends', populate: { path: 'user' } })
                    const io = ioMap.get('io')!
                    handleFriendRequest(io, requestedUser, currentUser!)
                    return res.send({
                        user: currentUser.toJSON()
                    })
                } catch (err) {
                    console.log(err)
                    return res.status(500).send({ error: { message: err.message } })
                }
            },
            accept: async (req: Request<{ id: string }, any, any, queryAuthType>, res: Response) => {
                try {
                    const { user: jwt_user } = req.query.jwt
                    if (!req.params.id)
                        return res.status(400).send({ error: { message: 'WHY DIDNT YOU PROVIDE AN ID HUH' } })
                    const user = await User.findById(jwt_user.id).populate({
                        path: 'friends',
                        ref: 'Friend',
                        populate: { path: 'user', model: 'User' }
                    })
                    const requestedUser = await User.findById(req.params.id).populate({
                        path: 'friends',
                        ref: 'Friend',
                        populate: { path: 'user', model: 'User' }
                    })
                    if (!requestedUser)
                        return res.status(400).send({ error: { message: 'who tf is that eh' } })
                    console.log(user, requestedUser)
                    ;(global as any).user = user
                    ;(global as any).requestedUser = requestedUser
                    user.friends.find((s: { user: UserType }) => s.user.id === requestedUser.id)!.type =
                        FreindTypes.FRIEND
                    requestedUser.friends.find((s: { user: UserType }) => s.user.id === user.id)!.type =
                        FreindTypes.FRIEND
                    await user.save()
                    await requestedUser.save()
                    return res.send({ user })
                } catch (err) {
                    console.log(err)
                    return res.status(500).send({ error: { message: err.message } })
                }
            },
            remove: async (req: Request<{ id: string }, any, any, queryAuthType>, res: Response) => {
                try {
                    const { user: jwt_user } = req.query.jwt
                    await User.findOneAndUpdate(
                        { _id: req.params.id },
                        {
                            $pull: {
                                friends: { user: jwt_user.id }
                            }
                        },
                        { new: true }
                    )
                    const user = await User.findOneAndUpdate(
                        { _id: jwt_user.id },
                        {
                            $pull: {
                                friends: { user: req.params.id }
                            }
                        },
                        { new: true }
                    ).populate({ path: 'friends', populate: { path: 'user' } })
                    return res.send({ user })
                } catch (err) {
                    return res.status(500).send({ error: { message: err.message } })
                }
            }
        }
    }
}

export default users
