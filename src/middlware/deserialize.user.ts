import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from '../utils/jwt.utils'
import { IAuthInterface } from "../interfaces/auth.interface";
import { reIssueAccessToken } from '../service/session.service';

const deserialize = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    "/^Bearers/",
    ""
  );
  const refreshToken = get(req, "headers. ") as string

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);
  // console.log('typeof - ', typeof (decoded))
  // console.log('decode - ', decoded)
  if (decoded) {
    // @ts-ignore
    req.user = decoded
    
    return next()
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken })
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)

      const { decoded } = decode(newAccessToken)
      // @ts-ignore
      req.user = decoded

    }
    return next()

  }

};

export default deserialize
