'use strict';

import './css/styles.css';
import '@fortawesome/fontawesome-free/js/all';

const Gameboard = (() => {
  const _board = ['', '', '', '', '', '', '', '', ''];
  const getBoard = () => _board;

  // // print each field in the game board, prints _ if the field is not set
  // const printBoard = () => {
  //   for (let i = 0; i < 9; i += 3) {
  //     console.log(_board[i] || '_', _board[i + 1] || '_', _board[i + 2] || '_');
  //   }
  // };
  const resetBoard = () => {
    for (let i in _board) _board[i] = '';
  };

  const getField = (index) => {
    return _board[index];
  };

  const getEmptyFieldsIndex = () => {
    const emptyFields = [];
    for (let i = 0; i < _board.length; i++) {
      if (_board[i] === '') {
        emptyFields.push(i);
      }
    }
    return emptyFields;
  };

  // place a player's marker on the board
  const setMarker = (index, marker) => {
    if (_board[index] === '') {
      _board[index] = marker;
      return true;
    }
    return false;
  };

  return { setMarker, getBoard, getField, getEmptyFieldsIndex, resetBoard };
})();

const Player = (marker) => {
  let _marker = marker;
  const getMarker = () => _marker;

  const chooseField = (Gameboard, index) => {
    return Gameboard.setMarker(index, _marker);
  };
  return { getMarker, chooseField };
};

const GameLogic = (() => {
  const _player1 = Player('X');
  const _player2 = Player('O');

  // winning positions:
  // 1) [0, 1, 2], [3, 4, 5], [6, 7, 8] (Horizontal)
  // 2) [0, 3, 6], [1, 4, 7], [2, 5, 8] (Vertical)
  // 3) [0, 4, 8], [2, 4, 6] (Diagonal)
  const _WINPOSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let _activePlayer = _player1;

  let _message = `Player ${_activePlayer.getMarker()}'s turn:`;
  const getMessage = () => _message;

  const _switchPlayer = () => {
    _activePlayer = _activePlayer === _player1 ? _player2 : _player1;
  };

  const winnerMessage = (player) => `Player ${player.getMarker()} Wins!`;
  const drawMessage = () => "It's a draw!";

  const reseteGameLogic = () => {
    _activePlayer = _player1;
    _message = _message = `Player ${_activePlayer.getMarker()}'s turn`;
  };

  // check if there is a winner before round starts
  const _winner = (player) => {
    for (let [x, y, z] of _WINPOSITIONS) {
      if (
        Gameboard.getBoard()[x] === player.getMarker() &&
        Gameboard.getBoard()[y] === player.getMarker() &&
        Gameboard.getBoard()[z] === player.getMarker()
      ) {
        return true;
      }
    }
    return false;
  };

  const _draw = () => Gameboard.getEmptyFieldsIndex().length === 0;
  const isGameOver = () => _winner(_player1) || _winner(_player2) || _draw();

  const playRound = (position) => {
    // only switch player if the player made a valid move
    if (_activePlayer.chooseField(Gameboard, position)) {
      _switchPlayer();
      _message = `Player ${_activePlayer.getMarker()}'s turn`;
    }
    if (_winner(_player1)) _message = winnerMessage(_player1);
    if (_winner(_player2)) _message = winnerMessage(_player2);
    if (_draw()) _message = drawMessage();
  };

  return { playRound, isGameOver, getMessage, reseteGameLogic };
})();

const displayController = (() => {
  const fieldsEl = document.querySelectorAll('.field');
  const messageEl = document.querySelector('#message');
  const resetBtn = document.querySelector('#resetBtn');

  // update each field to show marker, show message before and after each round
  const updateScreen = () => {
    for (let i = 0; i < fieldsEl.length; i++) {
      fieldsEl[i].textContent = Gameboard.getField(i);
    }
    messageEl.textContent = GameLogic.getMessage();
  };

  const placeMarker = (e) => {
    const index = +e.target.getAttribute('data-index');

    if (!GameLogic.isGameOver()) GameLogic.playRound(index);
    updateScreen();
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    GameLogic.reseteGameLogic();
    updateScreen();
  };

  fieldsEl.forEach((field) => {
    field.addEventListener('click', placeMarker);
  });

  // display round start message when the page is loaded
  window.addEventListener('DOMContentLoaded', () => {
    messageEl.textContent = GameLogic.getMessage();
  });

  resetBtn.addEventListener('click', resetGame);
})();
