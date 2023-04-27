import { Game } from "../../Types/Games";
import "./GameCard.css"

interface props {
    game: Game
}

const GameCard = ({game} : props) => {

    return ( 
        <div className="game-card">
            <h2>{game.name}</h2>
            <p>{game.address}</p>
            <p>{game.numberOfPeople}</p>
            <p>
                {game.time ? game.time : "time not assigned yet"}
            </p>
            <p>{game.date.toString().split("T")[0].split("-").reverse().join("/")}</p>
        </div>
    );
}
 
export default GameCard;