import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log('AUTH MIDDLEWARE')

    const token = req.headers['authorization']
    console.log(token)
    if (!token) {
        return res.status(401).send({ error: 'No Authorization Present nobba' })
    }
    try {
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        req.query.jwt = payload
    } catch (err) {
        console.log(err)
        return res.status(401).send({ error: 'bruh wrong token' })
    }
    return next()
}

export default isAuth
