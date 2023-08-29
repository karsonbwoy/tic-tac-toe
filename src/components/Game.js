import Board from "./Board.js";
import { useState } from 'react';

export default function Game() {
  
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);
    const [clickHistory, setClickHistory] = useState([]);
    const currentSquares =  history[currentMove];
    const xIsNext = currentMove % 2 === 0
  
    function handlePlay(nextSquares, i) {
      const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
      const nextClickHistory = [...clickHistory.slice(0,currentMove), i];
      setClickHistory(nextClickHistory);
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
        return null;
      }
      let description;
      let x = clickHistory[move-1]%3+1;
      let y = (clickHistory[move-1] - clickHistory[move-1]%3)/3+1
      if(move > 0){
        description = 'Go to move #' + move + ' Position: ' + x + ', ' + y;
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
          <span>
          {"You're at move #" + currentMove + ' '}
          </span>
          <button onClick = {toggleOrder}>Toggle</button>
          <ol>
            {isAscending ? moves : moves.reverse()}
          </ol>
        </div>
      </div>
    )  
  }
  