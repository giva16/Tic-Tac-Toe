const Gameboard = (function () {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  // place a player's marker on the board
  const setMarker = (row, col, marker) => {
    try {
      if (row >= board.length || col >= board[row].length) {
        throw Error('Index out of bounds');
      } else if (board[row][col] !== '') {
        throw Error('This spot is occupied by another marker');
      }

      board[row][col] = marker;
    } catch (error) {
      console.log(error);
    }
  };

  const getBoard = () => board;

  return { setMarker, getBoard };
})();

export default Gameboard;
