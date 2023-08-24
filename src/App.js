import './App.css';
import { useState } from 'react';

function Square({value, isWinning, onSquareClick}) {
  return (
    <button className = {isWinning ? 'square winning-square' : 'square'} onClick={onSquareClick}>{value}</button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  
  const [winner, line] = calculateWinner(squares);
  
  function handleClick(i) {
    if(squares[i] || winner){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  let status;
  if(winner){
    status = "Winner is: " + winner + ' in line ' + line.toString();
  } else if(!squares.includes(null)){
    status = "Draw."
  } else {
    status = "Next move is: " + (xIsNext ? 'X' : '0')
  }
  
  const board = []
  for (let j = 0; j < 3; j++) {
    let row = []
    for (let i = 0; i < 3; i++) {
      row.push(
        <Square 
        key = {j*3+i} 
        value = {squares[j*3+i]} 
        isWinning = {line.includes(j*3+i)}
        onSquareClick = {() => handleClick(j*3+i)}/>
      );
      
    }
    board.push(<div key = {j} className='board-row'>{row}</div>)
    
  }

  return (
    <>
      <div className='status'>{status}</div>
      {board}
    </>
  )
}

function Game() {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares =  history[currentMove];
  const xIsNext = currentMove % 2 === 0

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleOrder() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    if(currentMove === move){
      return ;
    }
    let description;
    if(move > 0){
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className='game-info'>
        {"You're at move #" + currentMove}
        <button onClick = {toggleOrder}>Toggle</button>
        <ol>
          {isAscending ? moves : moves.reverse()}
        </ol>
      </div>
    </div>
  )  
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
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return [squares[a], lines[i]];
    }
  }
  return [null,[null]];
}

export default function App(){
 return (
  <Game />
 )
}