const Gameboard = (() => {
  const _board = new Array(9);

  const getBoard = () => _board;

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

// Gameboard.setMarker(1, 'X');
// Gameboard.setMarker(0, 'X');
// Gameboard.setMarker(2, 'O');
// Gameboard.setMarker(4, 'O');
// Gameboard.setMarker(5, 'O');

const player1 = Player('X');

player1.chooseField(Gameboard, 2);
console.log(Gameboard.getBoard());
console.log(Gameboard.getEmptyFieldsIndex());
