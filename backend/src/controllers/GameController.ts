import { Request, Response } from "express";
import Game from "../models/Game"

export const getAllGames = async (req: Request, res: Response) => {
    const games = await Game.find();
    try {
        if(!games) {
            return res.status(204).json({msg: 'there is no game'})
        }
        res.status(200).json(games)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const getGameById = async (req:Request, res:Response) => {
    if(!req?.params?.id) return res.status(400)
    const singleGame = await Game.findById(req.params.id).exec()
    try {     
        res.json(singleGame).status(200)
    } catch (error) {
        res.status(404).json({err: error})  
    }
}

export const createGame = async (req:Request, res:Response) => {
    if(!req?.body) return res.status(400).json({message: 'Please enter game details'})
    const gameToCreate = await Game.create(req.body)
    try {
        return res.status(201).json(gameToCreate)
    } catch (error) {
        return res.status(500).json({msg: 'Couldnt create game'})
    }
}

export const updateGame = async (req:Request, res:Response) => {
    const {id} = req.params
    if(!req?.body) return res.status(400).json({message: 'Please enter game details'})
    const {name, time, date, numberOfPeople, fieldNumber, address} = req?.body
    try {
        const gameUpdate = await Game.findByIdAndUpdate(id, {
            name, time, date, numberOfPeople, fieldNumber, address
        }, {new: true}).exec()
        const result = await gameUpdate?.save()
        res.status(202).json(result)
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

export const deleteGame =async (req:Request, res:Response) => {
    const {id} = req.params
    try {
        await Game.findByIdAndDelete(id)
        res.status(200).json({msg: "Profile deleted successfully"})
    } catch (error) {
        res.status(404).json({msg: error})
    }
}
