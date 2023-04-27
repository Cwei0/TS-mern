import express, { Application, Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import { logError, logRequest } from "./middleware/events"
import gameRoutes from "./routers/game"
import authRoutes from "./routers/auth"
import userRoutes from "./routers/user"
import { cor } from "./config/cors"

const app: Application = express()

//Request Logger
app.use(logRequest)

//Cors
app.use(cors(cor))

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.get('/', (req: Request, res: Response) => {
    res.send({ message: "it works" })
})
app.use('/api/games', gameRoutes)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

//Error Logger
app.use(logError)

export { app }