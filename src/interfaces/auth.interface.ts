import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'


export interface IAuthInterface extends Request{
    user: JwtPayload | string | null
}