import { ValidatePassword } from '../service/user.service'

import {Request , Response} from 'express'
import { createSession } from '../service/session.service'

export async function createUserSessionHandler(req:Request , res:Response){
    const user = await ValidatePassword(req.body)

    if(!user){
        return res.status(401).json({message: 'email or password'})
    }
    const session = await createSession(user._id , req.get('user-agent') || '')
}