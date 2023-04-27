import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken"


export const getAllUsers = async (req:Request, res:Response) => {
    const users = await User.find().exec();
    res.json(users)
}

export const getCurrentUser = async (req:Request, res:Response) => {
    const token = req.header("Authorization");
    if(!token) return res.status(404).json({msg: "Auth token was not found"})

    try {
        const token_info: jwt.JwtPayload | string | any = jwt.verify(token, process.env.ACCESS_TOKEN!)
        const user = await User.findOne({email: token_info.email})
        if(!user) return res.status(400).json({msg: "User not found"})
        const {email, roles, username, ...extraUserData} = user
        return res.status(200).json({username, email, roles})

    } catch (error : unknown) {
        return res.status(500).json({error: error})
    }
}