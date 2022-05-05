import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'

const requireUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = get(req, "user")
    if(!user){
        return res.status(403).json({message: "u must be authorized"})
    }
    return next()
}

export default requireUser