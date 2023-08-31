import Board from "./Board.js";
import { useState, useEffect } from 'react';

export default function Game() {
  
    const initialGameState = loadGameState() || {
        history: [],
        currentMove: 0,
        clickHistory: [],
        isAscending: true,
        darkMode: false
      };
    
    const [history, setHistory] = useState(initialGameState.history);
    const [currentMove, setCurrentMove] = useState(initialGameState.currentMove);
    const [clickHistory, setClickHistory] = useState(initialGameState.clickHistory);
    const [isAscending, setIsAscending] = useState(initialGameState.isAscending);
    const [darkMode, setDarkMode] = useState(initialGameState.darkMode);
    const currentSquares =  history[currentMove];
    const xIsNext = currentMove % 2 === 0
  
    function saveGameState(history, currentMove, clickHistory, isAscending, darkMode) {
        const gameState = {
          history,
          currentMove,
          clickHistory,
          isAscending,
          darkMode
        };
        localStorage.setItem('ticTacToeGameState', JSON.stringify(gameState));
      }

      function loadGameState() {
        const gameState = localStorage.getItem('ticTacToeGameState');
        return gameState ? JSON.parse(gameState) : null;
      }

      useEffect(() => {
        saveGameState(history, currentMove, clickHistory, isAscending, darkMode);
      }, [history, currentMove, clickHistory, isAscending, darkMode]);

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

    function toggleDarkMode() {
      setDarkMode(!darkMode);
    }

    function handleReset() {
        
            setHistory([Array(9).fill(null)]);
            setCurrentMove (0);
            setClickHistory([]);
            setIsAscending(true);
        
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
      <div className={`game ${darkMode ? 'dark-mode' : ''}`}>
        <button onClick={toggleDarkMode}>{darkMode ? 'Light mode' : 'Dark mode'}</button>
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
          <button onClick = {handleReset}>Reset</button>
        </div>
      </div>
    )  
  }
  