import { useCallback, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useAppDispatch } from "./app/hooks"
import Navbar from "./components/layouts/Navbar"
import CreateGamePage from "./store/Games/CreateGamePage"
import EditGame from "./store/Games/EditGame"
import GamePage from "./store/Games/GamePage"
import { getGames } from "./store/Games/GameSlice"
import SingleGamePage from "./store/Games/SingleGamePage"
import LoginPage from "./store/Auth/LoginPage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
    const dispatch = useAppDispatch()

    const initApp = useCallback(async () => {
        await dispatch(getGames())
    }, [dispatch])

    useEffect(() => {
        initApp()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <BrowserRouter>
            <ToastContainer/>
            <Navbar />
            <Routes>
                <Route path='/' element={<GamePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='game/:id' element={<SingleGamePage />} />
                <Route path='creategame' element={<CreateGamePage />} />
                <Route path='editgame/:id' element={<EditGame />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App
