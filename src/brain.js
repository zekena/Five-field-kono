export class Brain {
  constructor() {
    this.gameBoard = [];
    this.gameActive = false;
    this.activePlayer = 0;
    this.playerColor = [];
    this.playerColor[1] = "green";
    this.playerColor[2] = "brown";
  }

  beginGame() {
    if (this.gameActive == true) return false;
    this.gameActive = true;
      for (let r = 0; r < 5; r++) {
      this.gameBoard[r] = [];
      for (let c = 0; c < 5; c++) {
        if (r === 0) {
          this.gameBoard[r][c] = 1;
        } else if (r === 1 && (c === 0 || c === 4)) {
          this.gameBoard[r][c] = 1;
        } else if (r === 4) {
          this.gameBoard[r][c] = 2;
        } else if (r === 3 && (c === 0 || c === 4)) {
          this.gameBoard[r][c] = 2;
        } else {
          this.gameBoard[r][c] = 0;
        }
      }
    }
    this.activePlayer = 1;
  }
  possibleMoves(r, c) {
      let posMoves = {};
                let i = 0;
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (Math.abs(r - row)  == 1 && Math.abs(c - col) == 1) {
                let arr = [];
                arr.push(row,col);
                posMoves[i] = arr;
                i++;
            }
      }
    }
    return posMoves;
  }
  move(preR, preC, postR, postC) {
      if (this.gameBoard[postR][postC] == 0){
          this.gameBoard[preR][preC] = 0;
          this.gameBoard[postR][postC] = this.activePlayer;
          console.dir(this.gameBoard);
      }
      else return "Illegal move! Hacker alert!!";

      this.setTurn();
      return this.checkWin();
  }
  checkWin() {
      if (
        this.gameBoard[0][0] === 2 &&
        this.gameBoard[0][1] === 2 &&
        this.gameBoard[0][2] === 2 &&
        this.gameBoard[0][3] === 2 &&
        this.gameBoard[0][4] === 2 &&
        this.gameBoard[1][0] === 2 &&
        this.gameBoard[1][4] === 2
      ) {
        this.gameActive = false;
        this.activePlayer = 0;
        return 2;
      } else if (
        this.gameBoard[4][0] === 1 &&
        this.gameBoard[4][1] === 1 &&
        this.gameBoard[4][2] === 1 &&
        this.gameBoard[4][3] === 1 &&
        this.gameBoard[4][4] === 1 &&
        this.gameBoard[3][0] === 1 &&
        this.gameBoard[3][4] === 1
      ) {
        this.gameActive = false;
        this.activePlayer = 0;
        return 1;}
    else return 0;
  }
    endGame(){
        let winner = this.checkWin();
        if (winner === 0){
            return false;
        }
        if (winner === 1 || winner === 2) {
            this.beginGame();
            return true;}
    }
    setTurn(){
        if (this.activePlayer == 2) this.activePlayer = 1;
        else if (this.activePlayer == 1) this.activePlayer =2;
    }
    reset(){
        this.beginGame();
        this.gameActive = false;
        this.activePlayer = 0;
    }
}
