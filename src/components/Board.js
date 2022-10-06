import React from 'react';
import {Square} from './Square';
import {calculateWinner} from './Game';

export class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          key={i}
          winner={this.isWinnerSquare(i)}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          />
      );
    }
  
    isWinnerSquare(i) {
      const winners = calculateWinner(this.props.squares);
      if (winners) {
        return winners.squares.findIndex(obj => obj === i) > -1;
      } else {
        return false;
      }
    }
  
    render() {
      let board = [];
      let counter = 0;
  
      for (let i = 0; i < 3; i++) {
        board = board.concat(<div key={i + 'A'} className="board-row"></div>);
        for (let j = 0; j < 3; j++) {
          board = board.concat(this.renderSquare(counter));
          counter++;
        }
        board = board.concat(<div key={i + 'B'}></div>);
      }
  
      return (
        <div>
          {board}
        </div>
      );
    }
}