import { Types } from "mongoose"
import jwt from "jsonwebtoken"
import "dotenv/config"


export const generateJwt = (id:Types.ObjectId, email:string)  => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                id, email
            },
            process.env.ACCESS_TOKEN!,
            {expiresIn: '4h'},
            (err, token) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            }
        )
    })
}
