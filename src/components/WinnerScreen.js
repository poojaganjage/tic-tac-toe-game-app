import React from 'react'

function WinnerScreen({restartGame, playerWon}) {
  return (
    <div className='winner'>
      <h2 className='congo'>
        {
          playerWon == 'No One' 
          ? 'Oops! Its a draw!!!' 
          : 'Congratulations!!!'
        }
      </h2>
      <h3 className='player'>{playerWon} won the game.</h3>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}
export default WinnerScreen;
