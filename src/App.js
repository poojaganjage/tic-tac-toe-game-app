import {useState, useEffect} from 'react';
import Square from './components/Square';
import {Patterns} from './Patterns';
import WinnerScreen from './components/WinnerScreen';
import './App.css';

// Game sound initialize.
const click = new Audio('./click.mp3');
const gameWinnerSound = new Audio('./win.wav');
const restartSound = new Audio('./restart.wav');

// Game sound functions.
const clickPlay = () => {
  click.play();
}

const gameWinner = () => {
  gameWinnerSound.play();
}

const gameRestart = () => {
  restartSound.play();
}

function App() {
  // Box index.
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  // Player turn.
  const [player, setPlayer] = useState('O');
  // Result.
  const [result, setResult] = useState({
    winner: 'none',
    state: 'none'
  });
  // Check winner.
  const [win, setWin] = useState(false);

  useEffect(() => {
    checkWinner();
    checkIfTie();
    if(player == 'X') {
      setPlayer('O');
    } else {
      setPlayer('X');
    }
  }, [board]);

  useEffect(() => {
    if(result.state != 'none') {
      setWin(true);
      gameWinner();
      //alert(`Game Finished! Winning Player: ${result.winner}`);
    }
  }, [result]);

  // Handling click on box.
  const handleClick = (square) => {
    clickPlay();
    setBoard(board.map((val, index) => {
      if(index == square && val == '') {
        return player;
      }
      return val;
    }));
  }

  // Checking winners.
  const checkWinner = () => {
    Patterns.forEach((currentPattern) => {
      //console.log(currentPattern);
      //console.log(currentPattern[0]);
      const firstPlayer = board[currentPattern[0]];
      console.log(firstPlayer);
      if(firstPlayer == '') return;
      let foundWinningPattern = true;
      console.log(currentPattern);
      currentPattern.forEach((index) => {
        console.log(index);
        if(board[index] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if(foundWinningPattern) {
        setResult({winner: player, state: 'Won'});
      }
    });
  }

  // Restart the game.
  const restartGame = () => {
    gameRestart();
    setBoard(['', '', '', '', '', '', '', '', '']);
    //setPlayer("O");
    setWin(false);
  }

  // Checking for tie.
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if(square == '') {
        filled = false;
      }
    });
    if(filled) {
      setResult({winner: 'No One', state: 'Tie'});
    }
  }

  return (
    <div className='app'>
      <h1 className='title'>Let's Play  <br/> Tic Tac Toe</h1>
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => handleClick(0)} />
          <Square val={board[1]} chooseSquare={() => handleClick(1)} />
          <Square val={board[2]} chooseSquare={() => handleClick(2)} />
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => handleClick(3)} />
          <Square val={board[4]} chooseSquare={() => handleClick(4)} />
          <Square val={board[5]} chooseSquare={() => handleClick(5)} />
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => handleClick(6)} />
          <Square val={board[7]} chooseSquare={() => handleClick(7)} />
          <Square val={board[8]} chooseSquare={() => handleClick(8)} />
        </div>
      </div>
      {win ? <WinnerScreen restartGame={restartGame} playerWon={result.winner} /> : null}
    </div>
  );
}
export default App;
