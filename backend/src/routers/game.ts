import { Router } from "express";
import { getAllGames, createGame, getGameById, updateGame, deleteGame } from "../controllers/GameController";

const router: Router = Router()

router.route('/')
    .get(getAllGames)
    .post(createGame)

router.route('/:id')
    .get(getGameById)
    .put(updateGame)
    .delete(deleteGame)

export default router