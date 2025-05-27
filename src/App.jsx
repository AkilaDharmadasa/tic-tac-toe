import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],

];

function deriveWinner(gameBoard, players) {
    let winner = null;
    WINNING_COMBINATIONS.forEach((combination) => {

        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    });

    return winner;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD].map((row) => [...row]);

    gameTurns.forEach((turn) => {
        gameBoard[turn.square.row][turn.square.col] = turn.player;
    });

    return gameBoard;
}

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {

    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);
    const activePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);

    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {

        setGameTurns((prevGameTurns) => {

            const currentPlayer = deriveActivePlayer(prevGameTurns);

            const updatedGameTurns = [{
                player: currentPlayer,
                square: {row: rowIndex, col: colIndex}
            },...prevGameTurns];

            return updatedGameTurns;
        });
    }

    function handleReset() {
        setGameTurns([]);
    }

    function handlePlayerChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialPlayerName="Player 1"
                  symbol="X"
                  isActivePlayer={activePlayer === 'X'}
                  onNameChange={handlePlayerChange}
          />
          <Player initialPlayerName="Player 2"
                  symbol="O"
                  isActivePlayer={activePlayer === 'O'}
                  onNameChange={handlePlayerChange}
          />
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleReset}/>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard}/>
      </div>
        <Log turns={gameTurns}/>
    </main>
  );
}

export default App
