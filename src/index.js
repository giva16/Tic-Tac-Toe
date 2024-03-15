'use strict';

import './css/styles.css';

const Gameboard = (() => {
  const _board = ['', '', '', '', '', '', '', '', ''];
  const getBoard = () => _board;

  // // print each field in the game board, prints _ if the field is not set
  // const printBoard = () => {
  //   for (let i = 0; i < 9; i += 3) {
  //     console.log(_board[i] || '_', _board[i + 1] || '_', _board[i + 2] || '_');
  //   }
  // };
  const reset = () => {
    for (let i in _board) field[i] = '';
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
    _board[index] = marker;
  };

  return { setMarker, getBoard, getField, getEmptyFieldsIndex };
})();

const Player = (marker) => {
  let _marker = marker;
  const getMarker = () => _marker;

  const chooseField = (Gameboard, index) => {
    Gameboard.setMarker(index, _marker);
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
  const getActivePlayer = () => _activePlayer;

  const _switchPlayer = () => {
    _activePlayer = _activePlayer === _player1 ? _player2 : _player1;
  };

  const winnerMessage = (player) => `Player ${player.getMarker()} Wins!`;
  const drawMessage = () => "It's a draw!";

  // check if there is a winner before round starts
  const _winner = (player) => {
    for (let [x, y, z] of _WINPOSITIONS) {
      if (
        Gameboard.getBoard()[x] === player.getMarker() &&
        Gameboard.getBoard()[y] === player.getMarker() &&
        Gameboard.getBoard()[z] === player.getMarker()
      ) {
        printWinner(player);
        return true;
      }
    }
    return false;
  };

  const _draw = () => Gameboard.getEmptyFieldsIndex().length === 0;
  const isGameOver = () => _winner(_player1) || _winner(player2) || _draw;

  // play a round:
  // print board
  // check for winner/draw -> stop game if winner/draw, print winner/draw message
  // if no winner ->  get input -> place player marker -> switch player -> repeat
  const playRound = (position) => {
    if (_winner(_player1)) return winnerMessage(_player1);
    if (_winner(_player2)) return winnerMessage(_player2);
    if (_draw()) return drawMessage();
    _activePlayer.chooseField(Gameboard, position - 1);
    _switchPlayer();
  };

  return { playRound, getActivePlayer, isGameOver };
})();

const displayController = (() => {
  const fieldsEl = document.querySelectorAll('.field');
  const messageEl = document.querySelector('#message');

  const updateScreen = () => {
    for (let i = 0; i <= fieldsEl.length; i++) {
      messageEl.textContent = 'X';
    }
  };

  const placeMarker = (e) => {
    const index = +e.target.getAttribute('data-index');
    console.log(Gameboard.getBoard());
    if (!GameLogic.isGameOver()) {
      //playRound(index);
    }
  };

  fieldsEl.forEach((field) => {
    field.addEventListener('click', placeMarker);
  });

  return { fieldsEl, messageEl, updateScreen };
})();
