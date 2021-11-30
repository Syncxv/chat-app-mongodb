import { Request, Response } from 'express'
import DmChannels from '../../models/channels'
import User, { UserType } from '../../models/user'
import argon2 from 'argon2'
import { createAcessToken } from '../../utils/auth'
const users = {
    index: async (_: Request, res: Response) => {
        const data = await User.find()
        res.send({ data })
    },
    getUser: async (req: Request<{ id: string }>, res: Response) => {
        try {
            const { id } = req.query
            const user = await User.find({ id })
            if (!user) {
                return res.status(404).send({ error: 'cant find him :|' })
            }
            console.log(user)
            return res.send(user || { data: null })
        } catch (err) {
            return res.send({ error: err.message })
        }
    },
    register: async (req: Request<any, any, UserType>, res: Response) => {
        try {
            const { username, password, email } = req.body
            const hash = await argon2.hash(password)
            const user = new User({ username, password: hash, email })
            console.log(user)
            const token = createAcessToken(user, user.id)
            console.log(token)
            user.save()
            res.status(201).send({ user, acessToken: token })
        } catch (err) {
            console.error(err)
            res.send({ error: err.message })
        }
    },
    login: async (req: Request<any, any, UserType>, res: Response) => {
        try {
            const user = (
                await User.find({ username: req.body.username }).select(
                    '+password'
                )
            )[0]
            if (!user)
                return res.send({
                    error: { feild: 'username', message: 'unkown username' }
                })
            const valid = await argon2.verify(user.password, req.body.password)
            if (!valid)
                return res.send({
                    error: {
                        feild: 'password',
                        message: 'password is incorrect nobba'
                    }
                })
            return res.send({
                user,
                acessToken: createAcessToken(user, user.id)
            })
        } catch (err) {
            console.error(err)
            return res.send({ error: err.message })
        }
    },
    me: {
        index: async (req: Request, res: Response) => {
            const user = await User.findById(req.query.id)
            res.send({ user })
        },
        createChannel: async (
            req: Request<any, any, { members: string[] }>,
            res: Response
        ) => {
            try {
                const { members } = req.body
                if (members.length > 2)
                    throw new Error(
                        'can only create channel with 2 people okay'
                    )
                const channel = await DmChannels.create({ members })
                await channel.save()
                res.send({ data: channel })
            } catch (err) {
                res.send({ error: { message: err.message } })
            }
        },
        getChannels: async (req: Request, res: Response) => {
            try {
                const channels = await DmChannels.find({
                    members: { $in: [req.params.id] }
                })
                res.status(200).send(channels)
            } catch (err) {
                res.send({ error: { message: err.message } })
            }
        }
    }
}

export default users
