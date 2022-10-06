import React from 'react';
import {Board} from './Board';

export class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        sliderOn: false,
      };
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          location: calculateLocation(i),
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    handleChange() {
      // const history = this.state.history.slice(0, this.state.stepNumber + 1);
      this.setState({
        // history: [...history].reverse(),
        sliderOn: !this.state.sliderOn,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = step.location ?
          'Go to move #' + move + ' (' + step.location.row + ', ' + step.location.col + ')':
          'Go to game start';
          return (
            <li key={move}>
              <button disabled={move === this.state.stepNumber} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
      });
  
      let status;
      if (winner) {
        status = 'Winner: ' + winner.key;
      } else {
        if (this.state.stepNumber < 9) {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else {
          status = 'Draw';
        }
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div className='switch-container'>
              <div className='switch-text'>Switch moves:</div>
              <label className="switch">
                <input 
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <ol reversed={this.state.sliderOn}>{moves}</ol>
          </div>
        </div>
      );
    }
}

export function calculateWinner(squares) {
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
        return {key: squares[a], squares: [a, b, c]};
        }
    }
    return null;
}

function calculateLocation(i) {
    if (i < 3) {
        return {row: 1, col: i + 1};
    } else if (i < 6) {
        return {row: 2, col: i - 2};
    } else if (i < 9) {
        return {row: 3, col: i - 5};
    }
    else {
        throw Error('Location not exists on the game board.');
    }
}