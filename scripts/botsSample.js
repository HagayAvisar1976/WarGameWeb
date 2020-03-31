
/****************************************************************************************/
// Attacker Bot
/****************************************************************************************/
var attackerBotName = "AttackerBot";
var engineers1 =["Hagay1","Avisar1","Dude1"];
var engineers2 =["Hagay2","Avisar2","Dude2"];
var engineers3 =["Hagay3","Avisar3","Dude3"];

function attackerBotLogic() {

    var budget = GameEngineSDK.getMyBudget(attackerBotName);
    console.info("My budget :" + budget);

    if((GameEngineSDK.currentGeneration() % 20) === 0){
        var dimensions = GameEngineSDK.getMatrixDimensions();
        var colStart = GameEngineSDK.currentGeneration() % dimensions.cols;
        return createGlider(50,colStart);
    }
    else
    {
        return null;
    }


}

function setCellsAccordingToPosition (cellsPosition,rowStart,colStart)
{
    var cellsToUpdate = [];
    for(var i=0; i< cellsPosition.length;i++){
        var offset = cellsPosition[i];
        var row = rowStart + offset[0];
        var col = colStart + offset[1];
        cellsToUpdate.push(new cell(row, col));
    }

    return cellsToUpdate;
}
function createGlider (rowStart,colStart) {

    var cellsPosition = [[0, 0],
        [1, 1],
        [2, -1], [2, 0], [2, 1]];

    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

}
/*
function createCheptomino  () {
    var cellsToUpdate = [];
    var cellsPosition = [[0,0],[0,1],[0,2],
        [1,-1],[1,0],[1,1],
        [2,0]];
    var rowStart = 20;
    var colStart = 100;

    for(var i=0; i< cellsPosition.length;i++){
        var offset = cellsPosition[i];
        var row = rowStart + offset[0];
        var col = colStart + offset[1];
        cellsToUpdate.push(new cell(row, col));
    }

    return cellsToUpdate;
}
*/

/****************************************************************************************/

GameEngineSDK.regiterBot(attackerBotName,engineers1,attackerBotLogic);


/****************************************************************************************/
// EMPTY Bot
/****************************************************************************************/

function emptyBotlogic(){
    //var cellsToUpdate =[];

    return null;
}

GameEngineSDK.regiterBot("EmptyBot",engineers2,emptyBotlogic);


/****************************************************************************************/
// Defender Bot
/****************************************************************************************/

var defenderBotName = "DefenderBot";
var defenderBotName_row = 40;
function defenderLogic(){
    var budget = GameEngineSDK.getMyBudget(defenderBotName);

    if(budget >=4 && (GameEngineSDK.currentGeneration() % 4) == 0)
    {
        var colStart = GameEngineSDK.currentGeneration() %  GameEngineSDK.getMatrixDimensions().cols;
        if(colStart <= 3)
        {
            defenderBotName_row-=5;
            if(defenderBotName_row <=5){
                defenderBotName_row = 40;
            }
        }
        return createBloack(defenderBotName_row, colStart);
    }

    return null;

}

function createBloack(rowStart,colStart){

    var cellsPosition = [[0,0],[0,1],
                         [1,0],[1,1]];

    return setCellsAccordingToPosition(cellsPosition,rowStart,colStart);

}

GameEngineSDK.regiterBot(defenderBotName,engineers3,defenderLogic);