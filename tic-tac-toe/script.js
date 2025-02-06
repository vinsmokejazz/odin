const Gameboard=(()=>{
  const board= Array(9).fill(null);

  const getBoard=()=> board;

  const markCell=(index,marker)=>{
    if(board[index]===null){
      board[index]=marker;
      return true;
    }
    return false;
  };

  const resetBoard=()=>{
    board.fill(null);
  };
  return{getBoard,markCell,resetBoard}
})();