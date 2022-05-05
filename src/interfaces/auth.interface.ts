import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'
import { IUserDocument } from '../model/user.model';

export interface IAuthInterface extends Request{
    user: IUserDocument
    //user: JwtPayload | string | null
}