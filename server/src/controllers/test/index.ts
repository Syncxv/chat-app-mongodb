import { Request, Response } from 'express'

const test = {
    index: (_: Request, res: Response) => {
        res.send({ hey: 'hey' })
    }
}

export default test
