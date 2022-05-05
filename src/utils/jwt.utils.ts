import { object } from 'yup';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

const secretKey = config.get("secretKey") as string;

export function sign(object:Object , options?: jwt.SignOptions | undefined ){
    return jwt.sign(object , secretKey , options)
}
export function decode(token: string) {
    try{
        const decoded = jwt.verify(token, secretKey);
        //console.log(decoded)
  return {
      decoded,
      valid: true,
      expired : false
    }
    }catch(error){
        console.log({error})
        return {
            decoded: null,
            valid: false,
            expired : true
        }
    }
  

}
