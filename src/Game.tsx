import { useState, useEffect, useCallback } from "react";
import Square from "./Square";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Game() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(INITIAL_SCORES);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = useCallback(() => {
    window.alert(`Congrats player ${currentPlayer}! You are the winner!`);
    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));

    resetBoard();
  }, [currentPlayer, scores]);

  const handleDraw = useCallback(() => {
    window.alert("The game ended in a draw");
    resetBoard();
  }, []);

  const changePlayer = useCallback(() => {
    setCurrentPlayer((prevPlayer) => prevPlayer === "X" ? "O" : "X");
  }, []);
  

  const checkForWinner = useCallback(() => {
    let roundWon = false;
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];
  
      const a = gameState[winCombo[0]];
      const b = gameState[winCombo[1]];
      const c = gameState[winCombo[2]];
  
      if ([a, b, c].includes("")) {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
  
    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }
  
    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }
    
    // If it's not a win or a draw, change player
    
  }, [gameState, handleWin, handleDraw]);
  

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
  }, [gameState, checkForWinner]);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as Element;
    const cellIndex = Number(target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
    changePlayer();
  };

  return (
    <div className="min-h-screen w-full p-8 text-slate800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        Tic Tac Toe
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto  w-50 sm:w-96">
          {gameState.map((player, index) => (
            <Square
              key={index}
              onClick={handleCellClick}
              {...{ index, player }}
            />
          ))}
        </div>
        <div className="text-white mt-5 mx-auto w-96 text-2xl text-serif">
          <p className="">
            Next Player: <span>{currentPlayer}</span>
          </p>
          <p>
            Player X wins: <span>{scores["X"]}</span>
          </p>
          <p>
            Player O wins: <span>{scores["O"]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Game;
