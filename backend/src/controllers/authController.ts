import { Request, Response } from "express"
import User from "../models/User"
import bcrypt, { compare } from "bcrypt"
import { generateJwt } from "../middleware/JWT"


export const signUp = async (req:Request, res: Response) => {
    const {email, password, username} = req.body
    if(!email || !password) return res.status(400).json({msg: 'Email and Password are required'})
    const emailCheck = await User.findOne({email}).exec()
    if(emailCheck) return res.sendStatus(401).json({error: 'An account with that email already exists'})
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, salt)
        const result = await User.create({
            'username': username,
            'email': email,
            'password': hashedPwd
        })
        result.save()
        res.status(201).json({message: 'Successful signup',success: result})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const signIn = async (req:Request, res: Response) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec()
    if (!user) return res.status(400).json({error: 'check credentials'})

    const validatePassword = await compare(password, user.password)
    if(!validatePassword) {
        return res.status(403).json({msg: 'Check credentials'})
    }
    const token = await generateJwt(user._id, email);
    
    return res.status(200).json({cookie: token})
}