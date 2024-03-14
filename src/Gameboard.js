const Gameboard = (function () {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const setMarker = (index, marker) => {
    try {
      if (index >= board.length) {
        throw Error('Index out of bounds');
      } else if (board[index] !== '') {
        throw Error('This spot is occupied by another marker');
      }

      board[index] = marker;
    } catch (error) {}
  };
})();

export default Gameboard;
