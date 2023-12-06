import { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true);
    const [aiIsThinking, setAiIsThinking] = useState(false);
    const winner = calculateWinner(squares);

    const handleClick = (i) => {

        if (squares[i] || winner || aiIsThinking) return;

        const newSquares = squares.slice();

        newSquares[i] = xIsNext ? "X" : "O";

        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    useEffect(() => {
        if (!xIsNext && !winner) {
          setAiIsThinking(true);
          setTimeout(() => {
            aiMove(squares, setSquares, setXIsNext);
            setAiIsThinking(false);
          }, 1000);
        }
      }, [xIsNext, squares, winner]);

    return (
        <div>
            <div className="status">
                Status: {
                    winner ? <p className="winner">O vencedror é: {winner}</p>
                        : `Próximo à jogar é: ${xIsNext ? "X" : "O"}`
                }
            </div>
            <div className="board-row">
                <Square value={squares[0]} clica={() => handleClick(0)} />
                <Square value={squares[1]} clica={() => handleClick(1)} />
                <Square value={squares[2]} clica={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} clica={() => handleClick(3)} />
                <Square value={squares[4]} clica={() => handleClick(4)} />
                <Square value={squares[5]} clica={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} clica={() => handleClick(6)} />
                <Square value={squares[7]} clica={() => handleClick(7)} />
                <Square value={squares[8]} clica={() => handleClick(8)} />
            </div>
            <button className="reset-button" onClick={resetGame}>Reiniciar Jogo</button>
        </div>
    );
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
};

const aiMove = (squares, setSquares, setXIsNext) => {
    let move = null;
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            move = i;
            break;
        }
    }

    if (move !== null) {
        const newSquares = squares.slice();
        newSquares[move] = "O";
        setSquares(newSquares);
        setXIsNext(true);
    }
}

export default Board;