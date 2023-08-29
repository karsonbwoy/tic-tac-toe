export default function Square({value, isWinning, onSquareClick, winner}) {
    return (
      <button className = {isWinning ? 'square winning-square' : 'square'} disabled={value !== null || winner} onClick={onSquareClick} >{value}</button>
    );
  }