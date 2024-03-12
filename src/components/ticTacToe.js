import { useState } from 'react';

function Square({ value, onSquareClick, isWinnerSquare }) {
    let className = "square";
    if (isWinnerSquare) {
        className += " winner";
    }
    if (value === 'O') {
        className += " O";
    }
    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    // const winner = calculateWinner(squares);
    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo && winnerInfo.winner;
    const winningLine = winnerInfo && winnerInfo.line;

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Your Turn: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>

            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinnerSquare={winningLine && winningLine.includes(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinnerSquare={winningLine && winningLine.includes(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinnerSquare={winningLine && winningLine.includes(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinnerSquare={winningLine && winningLine.includes(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinnerSquare={winningLine && winningLine.includes(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinnerSquare={winningLine && winningLine.includes(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinnerSquare={winningLine && winningLine.includes(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinnerSquare={winningLine && winningLine.includes(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinnerSquare={winningLine && winningLine.includes(8)} />
            </div>
            <div className="status">{status}</div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        let className;
        if (move > 0) {
            className = 'history';
            description = 'Go to move #' + move;
        }
        else {
            className = '';
            description = '';
        }
        return (
            <li key={move}>
                <button className={className} onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game-wrapper">
            <div className="left-pic"></div>
            <div className="game">
                <div className='game-title'> Welcome to Tic Tac Toe</div>
                <div className="game-board-wrapper">
                    <div><button className='restart' onClick={() => jumpTo(0)}></button></div>
                    <div className="game-board">
                        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                    </div>
                    {/* <div className="game-info">
                    {moves}
                </div> */}
                </div>
            </div>
            <div className="right-pic"></div>
        </div>
    );
}

function calculateWinner(squares) {
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
            // return squares[a];
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return null;
}
