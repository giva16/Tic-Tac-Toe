const Gameboard = (() => {
  const _board = new Array(9);

  const getBoard = () => _board;

  // print each field in the game board, prints _ if the field is not set
  const printBoard = () => {
    for (let i = 0; i < 3; i++) {
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
  const player1 = Player('X');
  const player2 = Player('O');

  let activePlayer = player1;

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  //print initial message at the start of each round ("Player ...'s Turn" + Gameboard)
  const roundStartPrompt = () => {
    if (Gameboard.getBoard().length === Gameboard.getEmptyFieldsIndex().length) {
      console.log('Welcome to Tic Tac Toe!\n\nPlayer X goes first!: ');
    }
    Gameboard.printBoard();
  };

  return { roundStartPrompt };
})();

// player1.chooseField(Gameboard, 2);
// console.log(Gameboard.getBoard());
// console.log(Gameboard.getEmptyFieldsIndex());

GameLogic.roundStartPrompt();
