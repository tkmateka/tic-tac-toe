import { Component } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toe';
  isSystemUser: boolean = false;
  tiles!: any[];

  constructor() {
    this.resetGame()
  }

  resetGame() {
    this.tiles = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }

  play(rowIndx: number, colIndex: number) {
    if(!this.tiles[rowIndx][colIndex]) {
      this.tiles[rowIndx][colIndex] = this.isSystemUser ? 'O' : 'X';
      this.isSystemUser = !this.isSystemUser;
  
      // Check all rows, columns and Diagonal
      if (this.checkRow() || this.checkColumns(rowIndx, colIndex) || this.checkDiagonals(rowIndx, colIndex)) {
        alert(`${this.tiles[rowIndx][colIndex]} WON!!!`);
        this.resetGame()
      }

      if(!this.hasMoves()) {
        alert('No more moves left');
        this.resetGame();
      };
    }
  }

  hasMoves() {
    let response: boolean = false;
    
    this.tiles.forEach((row:string[]) => {
      if(row.includes('')){
        response = true
      }
    })

    return response
  }

  checkRow(): boolean {
    let response: boolean = false;

    this.tiles.forEach((tile: string[]) => {
      // Check all rows
      if (tile.join('') === 'OOO' || tile.join('') === 'XXX') {
        response = true;
      }
    })

    return response
  }

  checkColumns(rowIndx: number, colIndex: number) {
    let response: boolean = false;
    const winings = this.tiles[rowIndx][colIndex] === 'O' ? 'OOO' : 'XXX';
    // Check all columns
    const col1 = `${this.tiles[0][0]}${this.tiles[1][0]}${this.tiles[2][0]}`;
    const col2 = `${this.tiles[0][1]}${this.tiles[1][1]}${this.tiles[2][1]}`;
    const col3 = `${this.tiles[0][2]}${this.tiles[1][2]}${this.tiles[2][2]}`;

    if (col1 === winings || col2 === winings || col3 === winings) {
      response = true;
    }
    return response
  }

  checkDiagonals(rowIndx: number, colIndex: number) {
    let response: boolean = false;
    const winings = this.tiles[rowIndx][colIndex] === 'O' ? 'OOO' : 'XXX';
    // Check all Diagonals
    const diag1 = `${this.tiles[0][0]}${this.tiles[1][1]}${this.tiles[2][2]}`;
    const diag2 = `${this.tiles[0][2]}${this.tiles[1][1]}${this.tiles[2][0]}`;

    if (diag1 === winings || diag2 === winings) {
      response = true;
    }
    return response
  }
}
