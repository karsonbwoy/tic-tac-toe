import Square from './Square.js'

export default function Board({ xIsNext, squares, onPlay }) {
  
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
      onPlay(nextSquares, i);
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
          onSquareClick = {() => handleClick(j*3+i)}
          winner = {winner}
          />
        );
        
      }
      board.push(<div key = {j} className='board-row'>{row}</div>)
      
    }
  
    return (
      <>
        <div className='status'>{status}</div>
        <div className='board'>
          {board}
        </div>
      </>
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
  