


var LifeStates = {
    DEAD: 0,
    ALIVE: 1
};


// define a cell object
function cell(row,col) {
    this.row = row;
    this.col = col;
}


var LifeCore = {

    _rows: 140,
    _columns: 240,
    _logicBoardMatrix : [],
    _generation : 0,

    getRowsNumber : function () {
        return this._rows;
    },

    getColmunsNumber : function(){
        return this._columns;
    },

    getCellValue: function(row,col){
        if(this._logicBoardMatrix == null || this._logicBoardMatrix == undefined || this._logicBoardMatrix.length <=0)
        {
            console.error("Game is not started , board is undefine yet.}");
            return;
        }
        if (row < 0 || row > (this._rows - 1)) {
            console.error("Can not get cell value due to wrong row value {" + row + "}");
            return;
        }

        if (col < 0 || col > (this._columns - 1)) {
            console.error("Can not get cell value due to wrong column value {" + col + "}");
            return;
        }

        return this._logicBoardMatrix[row][col];
    },

    getGeneration: function () {
        return this._generation;
    },

    startNewBoard : function () {
        this._logicBoardMatrix = [];
        this._generation = 0;
        this.initLifeMatrix(this._logicBoardMatrix);
    },

    initLifeMatrix: function (arr) {

        console.debug("Initializing life matrix");
        for (var i = 0; i < this._rows; i++) {
            arr.push([0])
            for (var j = 0; j < this._columns; j++) {
                arr[i][j] = LifeStates.DEAD;
            }
        }
        console.debug(arr);
    },

    setLifeMatrixCell: function (cell, newValue) {
        if (cell.row < 0 || cell.row > (this._rows - 1)) {
            console.error("Can not update cell due to wrong row value {" + cell.row + "}");
            return;
        }

        if (cell.col < 0 || cell.col > (this._columns - 1)) {
            console.error("Can not update cell due to wrong column value {" + cell.col + "}");
            return;
        }

        this._logicBoardMatrix[cell.row][cell.col] = newValue;

    },

    setLifeMatrixCells : function (cells) {

        for(var i = 0; i < cells.length;i++)
        {
            this.setLifeMatrixCell(cells[i],LifeStates.ALIVE);
        }

    },

    nextGenerationMatrix: function () {

        var newlogicBoardMatrix = [];
        this.initLifeMatrix(newlogicBoardMatrix);


        for(var row = 0; row < this._rows; row++){
            for (var col = 0; col < this._columns; col++)
            {
                newlogicBoardMatrix[row][col] = this.getCellNextGenerationValue(row,col);
            }
        }

        this._logicBoardMatrix = newlogicBoardMatrix;
        this._generation++;
        //console.info("Next Generation is :");
        //console.info(this._logicBoardMatrix);

    },

    getCellNextGenerationValue : function (row, col) {

        var cellNeighbors = this.getNeighborsCount(row, col);
        if(this._logicBoardMatrix[row][col] && cellNeighbors === 2 || cellNeighbors === 3){
            return LifeStates.ALIVE;
        }
        else{
            return LifeStates.DEAD;
        }
    },

    getNeighborsCount: function (row, col) {

        var nc = 0;
        var neighbours = [[-1,-1],[-1,0], [-1,+1],
                          [0,-1] ,/*    */[0,+1],
                          [+1,-1],[+1,0],[+1,+1]];

        for (var i=0; i <neighbours.length; i++) {
            var offset = neighbours[i];
            var neighbourRowPosition = row + offset[0];
            var neighbourColPosition = col + offset[1];

            if(neighbourRowPosition >=0 && neighbourColPosition >=0 && neighbourRowPosition < this._rows && neighbourColPosition < this._columns ){
                if(this._logicBoardMatrix[neighbourRowPosition][neighbourColPosition] === LifeStates.ALIVE){
                    nc++;
                }
            }

        }

        return nc;

    }


}


//************** Tests *************************/
//LifeCore.initLifeMatrix(LifeCore.logicBoardMatrix);

//LifeCore.setLifeMatrixCell(new cell(LifeStates.ALIVE),0,0);
//LifeCore.setLifeMatrixCellMirror(new cell(LifeStates.ALIVE),0,0);

//LifeCore.setLifeMatrixCell(new cell(LifeStates.ALIVE),2,5);
//LifeCore.setLifeMatrixCellMirror(new cell(LifeStates.ALIVE),2,5);

/*Test 10 in a row*/
/*for(var i =0; i<10;i++)
{
    LifeCore.setLifeMatrixCell(new cell(5,i+5));
}

/* test Blinker*
LifeCore.setLifeMatrixCell(new cell(1,1));
LifeCore.setLifeMatrixCell(new cell(1,2));
LifeCore.setLifeMatrixCell(new cell(1,3));
*/













//================================================================================================================================================

//================================================================================================================================================
/*
- Mirror algorithm in order to set 1 cell
- button to stop / start generations
- visual display the board
- define players
- define game flow using players
- define board and screen borders and size.
- define each player borders


 */