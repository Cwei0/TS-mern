import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import GameCard from "../../components/general/GameCard";

const GamePage = () => {
    const { games } = useAppSelector(state => state.game)
    return (
        <Container>
            <Typography variant="h2" fontWeight={"bold"} sx={{mt: 5}}>Games</Typography>
            <Grid spacing={2} sx={{marginTop: 5, display: "flex", flexDirection: "row", flexWrap:"wrap", gap:"10px" }}>
                {games && games.map((game) => (
                    <Grid xs={4} item key={game._id}>
                        <Link to={`game/${game._id}`}>
                            <GameCard game={game}/>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default GamePage;