import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent,  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Game } from "../../Types/Games";
import { createGame } from "./GameSlice";

function CreateGamePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const dispatch = useAppDispatch()
    const [game, setGame] = useState<Game>({
        name: "",
        address: "",
        numberOfPeople: 0,
        date: "",
        time: "",
        fieldNumber: 0,
    })

    const Submit = () => {
        const data = {
            name: game.name,
            address: game.address,
            numberOfPeople: game.numberOfPeople,
            date: game.date,
            time: game.time,
            fieldNumber: game.fieldNumber
        }
        console.log(data)
        try {
            dispatch(createGame(data))
            navigate(from, {replace: true})
        } catch (error: unknown) {
            console.log(error)
        }
        
    }
    return (
        <Container sx={{ marginTop: 4}}>
            <Grid item sx={{margin: "0 auto"}}>
                <Typography sx={{marginBottom: 5}} variant="h4" fontWeight={600}>
                    Create Game
                </Typography>
                <Grid container spacing={2} component="form" onSubmit={Submit}>

                    <Grid item={true} xs={12}>
                        <TextField 
                            fullWidth 
                            value={game.name} 
                            onChange = {(e: ChangeEvent<HTMLInputElement>) => setGame({...game, name: e.target.value})}
                            label="name" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField 
                            fullWidth 
                            value={game.address}
                            onChange = {(e: ChangeEvent<HTMLInputElement>) => setGame({...game, address: e.target.value})} 
                            label="address" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField 
                            type="number"
                            fullWidth 
                            value={game.numberOfPeople} 
                            onChange = {(e: ChangeEvent<HTMLInputElement>) => setGame({...game, numberOfPeople: Number(e.target.value) })} 
                            label="numberOfPeople" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField 
                            type="date"
                            InputLabelProps={{shrink: true}}
                            fullWidth 
                            value={game.date}
                            onChange = {(e: ChangeEvent<HTMLInputElement>) => setGame({...game, date:e.target.value })} 
                            label="date" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField 
                            fullWidth 
                            value={game.time} 
                            onChange = {(e: ChangeEvent<HTMLInputElement>) => setGame({...game, time:e.target.value})}
                            label="time" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField 
                            type="number"
                            fullWidth 
                            value={game.fieldNumber} 
                            onChange = {(e:ChangeEvent<HTMLInputElement>) => setGame({...game, fieldNumber: Number(e.target.value)})}
                            label="fieldNumber" />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained">
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateGamePage;
