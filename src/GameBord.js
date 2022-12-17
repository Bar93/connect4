import React from "react";
import Row from "./Row";

const NUM_OF_ROW=7;
const NUM_OF_COL=7;
const NUM_OF_START_CELL=3;
const PLAYER1=1;
const PLAYER2=2;



class GameBord extends React.Component{

   state={gameBord:[],currentPlayer:PLAYER1,currentCell:NUM_OF_START_CELL,
       message:"move:[arrows L+R] insert:[space] Good Luck!",
       winGame:false};

   createBord(){
       let board=[];
       for (let row=0; row<NUM_OF_ROW;row++){
           let row=[];
           for (let col=0;col<NUM_OF_COL; col++){
               row.push(null);
           }
           board.push(row);
       }
       for(let i=0;i<NUM_OF_ROW;i++){
           board[0][i]=0
       }
       board[0][NUM_OF_START_CELL]=PLAYER1;
       this.setState({gameBord:board});
   }


    componentWillMount() {
        this.createBord();
    }

    componentDidMount() {
        document.onkeydown = this.onKeyDown;
    }

    onKeyDown = e => {
        e = e || window.event;
        let direction;
        switch (e.keyCode) {
            case 37:
               direction= "LEFT";
                break;
            case 39:
                direction= "RIGHT";
                break;
            case 32:
                this.insertCoin();
                break;
        }
        this.movePlayer(direction);
    }

    movePlayer(direction) {
           if (this.state.winGame!=true) {
               let bord = this.state.gameBord;
               let newCell = this.state.currentCell;
               if (direction === "LEFT" && newCell > 0) {
                   bord[0][newCell] = 0;
                   newCell--;
               }
               if (direction === "RIGHT" && newCell < 6) {
                   bord[0][newCell] = 0;
                   newCell++;
               }
               this.setState({currentCell: newCell});
               bord[0][this.state.currentCell] = this.state.currentPlayer;
               this.setState({gameBord: bord});
           }

    }

    insertCoin() {
        if (this.state.winGame!=true) {
            let bord = this.state.gameBord;
            let row = 1;
            if (bord[1][this.state.currentCell] != null) {
                return;
            } else {
                while (bord[row][this.state.currentCell] == null && row < NUM_OF_ROW - 1) {
                    row++;
                    if (bord[row][this.state.currentCell] == PLAYER1 || bord[row][this.state.currentCell] == PLAYER2) {
                        row--;
                        break;
                    }
                }
            }
            bord[0][this.state.currentCell] = 0;
            bord[row][this.state.currentCell] = this.state.currentPlayer;
            this.setState({gameBord: bord})
            this.checkWin(row, this.state.currentCell);
            if (this.state.currentPlayer === PLAYER1) {
                this.setState({currentPlayer: PLAYER2});
            } else {
                this.setState({currentPlayer: PLAYER1});
            }
        }

    }

    checkRow(row){
       let bord=this.state.gameBord;
       let checkWin=false;
       for (let c=0;c<NUM_OF_COL-4;c++){
           if (bord[row][c]==this.state.currentPlayer
               && bord[row][c+1]==this.state.currentPlayer &&bord[row][c+2]==this.state.currentPlayer
           &&bord[row][c+3]==this.state.currentPlayer){
               checkWin=true;
               alert(this.state.currentPlayer+"row");
           }
       }
       return checkWin;
   }
    checkCol(col){
        let bord=this.state.gameBord;
        let checkWin=false;
        for (let r=NUM_OF_ROW-1;r>0;r--){
            if (bord[r][col]==this.state.currentPlayer
                && bord[r-1][col]==this.state.currentPlayer &&bord[r-2][col]==this.state.currentPlayer
                &&bord[r-3][col]==this.state.currentPlayer){
                checkWin=true;
                alert(this.state.currentPlayer+"col")
            }
        }
        return checkWin;
    }
    checkDiagonal(){
        let bord=this.state.gameBord;
        let checkWin=false;
     for (let r=NUM_OF_ROW-1;r>2;r--) {
         for (let c = 0; c < NUM_OF_COL - 4; c++) {
             if (bord[r][c] == this.state.currentPlayer
                 && bord[r - 1][c + 1] == this.state.currentPlayer && bord[r - 2][c + 2] == this.state.currentPlayer
                 && bord[r - 3][c + 3] == this.state.currentPlayer) {
                 checkWin = true;
                 alert(this.state.currentPlayer+"dia ri")
                 return checkWin;
             }
         }
     }
         for (let r=NUM_OF_ROW-1;r>3;r--){
             for (let c=NUM_OF_COL-1;c>2;c--){
                 if (bord[r][c]==this.state.currentPlayer
                     && bord[r-1][c-1]==this.state.currentPlayer &&bord[r-2][c-2]==this.state.currentPlayer
                     &&bord[r-3][c-3]==this.state.currentPlayer){
                     checkWin=true;
                     alert(this.state.currentPlayer+"di le")
                     return checkWin;
                 }
             }
     }
         return checkWin;
    }

    checkWin(row,col){
       if (this.checkRow(row)==true || this.checkCol(col)==true ||this.checkDiagonal()==true){
          this.setState({winGame:true})
           debugger;
           let newMessage="Player"+this.state.currentPlayer+" Win!";
           this.setState({message:newMessage})
       }
        this.checkGameOver()
    }

    checkGameOver(){
       let bord = this.state.gameBord;
       let count=0
       for (let i=0;i<NUM_OF_COL;i++){
           if (bord[1][i]!=null){
               count++;
           }
       }
       if (count==7){
           let newMessage="Draw! GameOver!";
           this.setState({message:newMessage})
       }

    }

    render() {
        return (
            <div>
                <div className="button" onClick={() => { this.createBord() }}>New Game</div>
                <p className="message">{this.state.message}</p>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                    {this.state.gameBord.map((row) => (<Row  row={row} />))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameBord;