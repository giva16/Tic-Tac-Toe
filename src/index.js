import './css/styles.css';
const Gameboard = (() => {
  const _board = new Array(9);

  const getBoard = () => _board;

  // print each field in the game board, prints _ if the field is not set
  const printBoard = () => {
    for (let i = 0; i < 9; i += 3) {
      console.log(_board[i] || '_', _board[i + 1] || '_', _board[i + 2] || '_');
    }
  };

  const getField = (index) => {
    try {
      if (index >= _board.length || index < 0) {
        throw new Error('Index out of bounds');
      }
      return _board[index];
    } catch (error) {
      console.log(error);
    }
  };

  const getEmptyFieldsIndex = () => {
    const emptyFields = [];
    for (let i = 0; i < _board.length; i++) {
      if (_board[i] === undefined) {
        emptyFields.push(i);
      }
    }
    return emptyFields;
  };

  // place a player's marker on the board
  const setMarker = (index, marker) => {
    try {
      if (getField(index) !== undefined) {
        throw new Error('This spot is taken');
      }
      _board[index] = marker;
    } catch (error) {
      console.log(error);
    }
  };

  return { setMarker, getBoard, getField, getEmptyFieldsIndex, printBoard };
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

  //print initial message at the start of each round ("Player ...'s Turn" + Gameboard) and gets input
  const _getInput = () => {
    if (Gameboard.getBoard().length === Gameboard.getEmptyFieldsIndex().length) {
      return prompt('Welcome to Tic Tac Toe!\n\nPlayer X goes first!\n\nSelect a position on the board (0-8): ');
    } else {
      return prompt(`Player ${_activePlayer.getMarker()}'s turn\n\nSelect a position on the board (0-8):`);
    }
  };

  // print winner message
  const printWinner = (player) => {
    console.log(`Player ${player.getMarker()} Wins!`);
  };

  // print draw message
  const printDraw = () => {
    console.log("It's a draw!");
  };

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

  // play a round:
  // print board
  // check for winner/draw -> stop game if winner/draw, print winner/draw message
  // if no winner ->  get input -> place player marker -> switch player -> repeat
  const _playRound = () => {
    Gameboard.printBoard();

    if (_winner(_player1)) {
      printWinner(_player1);
      return;
    }

    if (_winner(_player2)) {
      printWinner(_player2);
      return;
    }

    if (_draw()) {
      printDraw();
      return;
    }

    const position = +_getInput();

    _activePlayer.chooseField(Gameboard, position);

    _switchPlayer();
  };

  const playGame = () => {
    while (!_winner(_player1) && !_winner(_player2) && !_draw()) {
      _playRound();
    }
  };

  return { _playRound, playGame };
})();

//GameLogic.playGame();
