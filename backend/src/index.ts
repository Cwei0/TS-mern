import { app } from "./app"
import mongoose, { ConnectOptions } from "mongoose"

const Port: string | undefined = process.env.PORT

const startServer = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.MONGODB_URL!,{
            dbName: 'TsFootballApp',
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        } as ConnectOptions)
        console.log('Connected to MongoDB ✅')
        app.listen(Port, () => console.log('Server running on: ', Port))
    } catch (error) {
        console.log('Failed to connect to Db ❌')
        console.error(error)
    }
}

startServer()