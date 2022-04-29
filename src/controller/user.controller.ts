import { Request , Response } from "express";
import { createUser } from "../service/user.service";
import {omit} from 'lodash'

export async function createUserHandler(req: Request , res: Response){
    try{
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON() , 'password'))
    }catch(err){
        console.log(err)
        throw err
    }
}