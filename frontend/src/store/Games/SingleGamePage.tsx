import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteGame, getGameById } from "./GameSlice";

const SingleGamePage = () => {
    const dispatch = useAppDispatch()
    const { game } = useAppSelector(state => state.game)
    const { id } = useParams()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"


    useEffect(() => {
        if(!id) return 
        dispatch(getGameById(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleDelete = () => {
        if(!id) return
        try {
            dispatch(deleteGame(id))
            navigate(from, { replace: true })
        } catch (error) {
            console.log(error)
        }
    }
    
    return ( 
        <Container sx={{ marginTop: 10 }}> 
            <Typography sx={{my: 3}} variant="h2">Welcome to the Game</Typography>
            <Typography variant="h4" fontWeight={600} sx={{color: "gray"}}>
                {`${game?.address} ${game?.time ? `-${game.time}`: ""} - ${game?.date ? (game?.date)?.toString().substring(0, 10).replaceAll("-", "/") : ""}`}
            </Typography>
            <Grid container>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        {game?.name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        No. Players: {game?.numberOfPeople}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        {game?.time}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{width: "100%", justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                    <Link to={`/editgame/${game?._id}`}>
                        <Button className="green-btn">
                            Edit
                        </Button>
                    </Link>
                    <Button type="submit" variant="contained" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Container> 
    );
}

export default SingleGamePage;