import { Request, Response } from 'express'
const channels = {
    index: async (req: Request, res: Response) => {
        console.log(req, res)
    }
}

export default channels
