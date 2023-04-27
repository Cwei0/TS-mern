
const allowedOrigins:string[] = ['http://localhost:5173']

interface CorsTypes {
    origin: string[],
    credentials: boolean
}

const cor: CorsTypes = {
    origin: allowedOrigins,
    credentials: true,
}

export {allowedOrigins, cor}