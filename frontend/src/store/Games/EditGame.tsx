import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {  getGameById, updateGame } from "./GameSlice";

function EditGame() {
    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useAppDispatch()
    const { game } = useAppSelector(state => state.game)

    const { id } = useParams()
    const from = location.state?.from?.pathname || "/"

    
    useEffect(() => {
        if(!id) return
        dispatch(getGameById(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [singleGame, setSingleGame] = useState({
        name: game?.name,
        address: game?.address,
        numberOfPeople: game?.numberOfPeople,
        date: game?.date,
        time: game?.time,
        fieldNumber: game?.fieldNumber,
    })
    const Submit = () => {
        const data = {
            _id: id,
            name: singleGame.name,
            address: singleGame.address,
            numberOfPeople: singleGame.numberOfPeople,
            date: singleGame.date,
            time: singleGame.time,
            fieldNumber: singleGame.fieldNumber
        }
        console.log(data)
        try {
            dispatch(updateGame(data))
            navigate(from, { replace: true })
        } catch (error: unknown) {
            console.log(error)
        }

    }
    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid item sx={{ margin: "0 auto" }}>
                <Typography sx={{ marginBottom: 5 }} variant="h4" fontWeight={600}>
                    {game?.name} - {game?.address}
                </Typography>
                <Grid container spacing={2} component="form" onSubmit={Submit}>

                    <Grid item={true} xs={12}>
                        <TextField
                            fullWidth
                            value={singleGame.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSingleGame({ ...singleGame, name: e.target.value })}
                            label="name" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField
                            fullWidth
                            value={singleGame.address}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSingleGame({ ...singleGame, address: e.target.value })}
                            label="address" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField
                            type="number"
                            fullWidth
                            value={singleGame.numberOfPeople}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSingleGame({ ...singleGame, numberOfPeople: Number(e.target.value) })}
                            label="numberOfPeople" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={singleGame.date}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSingleGame({ ...singleGame, date: e.target.value })}
                            label={`Current Date - ${(game?.date)?.toString().substring(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}`} />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField
                            fullWidth
                            value={singleGame.time}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSingleGame({ ...singleGame, time: e.target.value })}
                            label="time" />
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField
                            type="number"
                            fullWidth
                            value={singleGame.fieldNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSingleGame({ ...singleGame, fieldNumber: Number(e.target.value) })}
                            label="fieldNumber" />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EditGame;