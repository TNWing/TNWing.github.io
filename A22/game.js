/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
//bead data: what should it be?
//[color,type,misc_array]
//misc_array is an array of any size, as type will detemrine what the values in misc_array represent
//misc_array will always have at least 1 value, which contains whether or not the player is on that bead

//note: as player position upon loading map is dependent on player dir, its an issue
//make it so the misc_array stores the value of the position the player moves to?
//also, player should not teleport to new map if they move along the teleporting beads (ie: move from 1 teleport cell to another)
var mapNum=0;
var inventory=[]

//need to find a way to save maps

var mapList=[]

var roomStatus=[];//status update while in room


var completedPuzzles=[];
//-1 for not completed
//0 for finished
//1 for easter egg found


var updateStatus=function(){
    let statusIndex=roomStatus[mapNum];
    switch(mapNum){
        case 0:{
            break;
        }
        case 1:{
            break;
        }
        case 2:{
            break;
        }
        case 3:{
            switch(statusIndex){
                case 0:{
                    PS.statusText("Green is good");
                    break;
                }
                case 21:{
                    PS.statusText("Fine! Take the stupid egg!");
                    PS.audioPlay("chicken", { fileTypes: ["wav"], path: "Audio/" });
                    roomStatus[3]=22;
                    break;
                }
                default:{
                    PS.statusText("Hey, stop that!");
                    break;
                }
            }
            break;
        }
        case 4:{
            switch(statusIndex){
                case 0:{
                    PS.statusText("What the...");
                    break;
                }
                case 1:{
                    PS.statusText("I didn't make this room.");
                    break;
                }
                case 2:{
                    PS.statusText("Do whatever you want.");
                    break;
                }
                case 3:{
                    PS.statusText("...");
                    break;
                }
                case 4:{
                    PS.statusText("An easter egg");
                    break;
                }
            }
        }
    }
}

var loadStatus=function(){//status changes based on completed puzzle or not
    let statusIndex=completedPuzzles[mapNum];
    switch(mapNum){
        case 0: {
            PS.statusText("A Beginning");
            break;
        }
        case 1: {
            switch(statusIndex){
                case -1:{
                    PS.statusText("Pirate Treasure");
                    break;
                }
                case 0:{
                    PS.statusText("What are you looking for?");
                    break;
                }
                case 1:{
                    PS.statusText("");
                    break;
                }
            }
            break;
        }
        case 2:{
            switch (statusIndex){
                case -1:{
                    PS.statusText("A Simple Maze");
                    break;
                }
                case 1:{
                    PS.statusText("");
                    break;
                }
            }
            break;
        }
        case 3:{
            switch(statusIndex){
                case -1:{
                    PS.statusText("Green is good");
                    break;
                }
                case 0:{
                    PS.statusText("Why are you here again?");
                    break;
                }
                case 1:{
                    PS.statusText("");
                    break;
                }
            }
            break;
        }
        case 4:{
            updateStatus();
        }
    }
}
//idea: use map copy to add to map list, and just utilize mapList

var mapInit=function(){
    mapList.push(mapCopy(mapstart));
    roomStatus.push(0);
    completedPuzzles.push(-1);
    mapList.push(mapCopy(mapPirate));
    roomStatus.push(0);
    completedPuzzles.push(-1);
    mapList.push(mapCopy(mapMaze1));
    roomStatus.push(0);
    completedPuzzles.push(-1);
    mapList.push(mapCopy(mapChoose1))
    roomStatus.push(0);
    completedPuzzles.push(-1);
    mapList.push(mapCopy(mapChain1));
    roomStatus.push(0);
    completedPuzzles.push(-1);
}

var player={//player represented by CYAN
    xcoord:0,
    ycoord:0,
    horizontalDir:0,
    verticalDir:0,
}
var resetGrid=function(){
    PS.data(PS.ALL,PS.ALL,0);
    PS.color(PS.ALL,PS.ALL,PS.COLOR_WHITE);
    PS.gridSize(16,16);
}

var getColor=function(i){
    let color=null;
    switch (i){
        case -1:{//yellow move to next section color
            color=[229,255,102];
            break;
        }
        case 0:{//white
            //PS.debug("HEY WHITE");
            color=PS.COLOR_WHITE;
            break;
        }
        case 1:{
            color=PS.COLOR_BLACK;
            break;
        }
        case 2:{//gray
            color=[137,137,137];
            break;
        }
        case 3:{//supposed to be similar to gray but marginally lighter
            color=[122,122,122];
            break;
        }
        case 4:{
            color=PS.COLOR_RED;
            break;
        }
        case 5:{
            color=PS.COLOR_MAGENTA;
            break;
        }
        case 6:{//pink
            color=[206, 77, 190];
            break;
        }
        case 7:{//gray with hint of pink
            color=[137, 120, 137];
            break;
        }
        case 8:{//orange
            color=[255, 145, 23];
            break;
        }
        case 9:{//green
            color=[67, 255, 128];
            break;
        }
        default:{
            color=-1;
            break;
        }
    }
    return color;
}

var mapCopy=function(map){
    var newMap=map.slice(0);
    for(var i =0;i< newMap.length; i++) {
        if (newMap[i] instanceof Array) {
            newMap[i] = mapCopy(newMap[i]);
        }
    }
    return newMap;
}

var mapBuild=function() {//why is levelbuild being called const
    resetGrid();
    loadStatus();
    PS.border ( PS.ALL, PS.ALL,0)
    if (mapList[mapNum]!=null){
        let x=0;
        let y=0;
        for (let i=0;i<mapList[mapNum].length;i++){
            let c=mapList[mapNum][i][0];
            PS.color(x,y,getColor(c));//why all balck
            PS.data(x,y,mapList[mapNum][i]);
            x++;
            if (x>15){
                x=0;
                y++;
            }
        }
    }
    setBorderEdges()
}

var setBorderEdges=function(){
    //set borders for edge beads
    let topEdge={
        top:1,
        left:0,
        bottom:0,
        right:0,
    }
    let botEdge={
        top:0,
        left:0,
        bottom:1,
        right:0,
    }
    let leftEdge={
        top:0,
        left:1,
        bottom:0,
        right:0,
    }
    let rightEdge={
        top:0,
        left:0,
        bottom:0,
        right:1,
    }
    for (let x=1;x<15;x++){
        PS.border (x,0,topEdge);
        PS.border (x,15,botEdge);
    }
    for (let y=1;y<15;y++){
        PS.border (0,y,leftEdge);
        PS.border (15,y,rightEdge);
    }
    let corner={
        top:1,
        left:1,
        bottom:0,
        right:0,
    }
    //do corners next

    PS.border(0,0,corner);
    corner.left=0;
    corner.right=1;
    PS.border(15,0,corner);
    corner.top=0;
    corner.bottom=1;
    PS.border(15,15,corner);
    corner.right=0;
    corner.left=1;
    PS.border(0,15,corner);
}

var saveMap=function(mapNum){
    let x=0;
    let y=0;
    //maybe make new map
    for (let i=0;i<mapList[mapNum].length;i++){
        mapList[mapNum][i]=PS.data(x,y);
        x++;
        if (x>15){
            x=0;
            y++;
        }
    }
}


PS.init = function( system, options ) {
    player.xcoord=4;
    player.ycoord=8;
	// PS.gridSize( 8, 8 );

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	// PS.statusText( "Game" );
    mapNum=0;
    mapInit();
	// Add any other initialization code you need here.
    mapBuild();

    PS.audioLoad("chicken", { fileTypes: ["wav"], path: "Audio/" });
    PS.audioLoad("concrete_step1", { fileTypes: ["wav"], path: "Audio/" , volume:0.7});
    PS.audioLoad("concrete_step2", { fileTypes: ["wav"], path: "Audio/" , volume:0.7 });
    PS.audioLoad("concrete_step3", { fileTypes: ["wav"], path: "Audio/" , volume:0.7 });
    PS.audioLoad("concrete_step4", { fileTypes: ["wav"], path: "Audio/"  , volume:0.7});
    PS.audioLoad("push", { fileTypes: ["wav"], path: "Audio/" });
    PS.audioLoad("tile_step1", { path: "Audio/" });
    PS.audioLoad("tile_step2", { path: "Audio/" });
    PS.audioLoad("tile_step3", { path: "Audio/" });
    PS.color(player.xcoord,player.ycoord,PS.COLOR_CYAN);
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches
	// over a bead.
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
var flashTimer;
PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:
	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:


	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/


PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:
    let oldX=player.xcoord;
    let oldY=player.ycoord;
    let newX=player.xcoord;
    let newY=player.ycoord;
    player.horizontalDir=0;
    player.verticalDir=0;
    switch(key){
        case 1008:
        case 115:
            newY+=1;
            player.verticalDir=1;
            if (newY>=15){
                newY=15;
            }
            break;
        case 1007:
        case 100:
            newX+=1;
            player.horizontalDir=1;
            if (newX>=15){
                newX=15;
            }
            break;
        case 1006:
        case 119:
            newY-=1;
            player.verticalDir=-1;
            if (newY<=0){
                newY=0;
            }
            break;
        case 1005://left or a
        case 97:
            newX-=1;
            player.horizontalDir=-1;
            if (newX<=0){
                newX=0;
            }
            break;
    }
    PS.audioPlay("concrete_step"+(PS.random(4)).toString(), { fileTypes: ["wav"], path: "Audio/" });
    //check to see if the change to x is blocked
    //also will need to update old stuff
    let typeOld=PS.data(oldX,oldY)[1];
    adjustCurrentBead(oldX,oldY,typeOld)
    let type=PS.data(newX,newY)[1];
    //doesn't do multiple types i think
    switch (type){
        case -2:{//egg collectible
            PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
            PS.color(newX,newY,PS.COLOR_CYAN);
            PS.data(newX,newY,[0,0,[0],[0]]);
            player.xcoord=newX;
            player.ycoord=newY;
            PS.audioPlay("chicken", { fileTypes: ["wav"], path: "Audio/" });
            switch(mapNum){
                case 2:{
                    PS.statusText("Stop taking stuff you don't need!");
                    completedPuzzles[2]=1;
                    break;
                }
            }
            break;
        }
        case -1:{//teleporter
            if (typeOld==-1){//this part doesnt work, not priority though// && (oldX!=newX||oldY!=oldY)
                PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
                PS.color(newX,newY,PS.COLOR_CYAN);
                player.xcoord=newX;
                player.ycoord=newY;
                break;
            }
            saveMap(mapNum);
            let num=PS.data(newX,newY)[2][0];
            let x=PS.data(newX,newY)[2][1][0];
            let y=PS.data(newX,newY)[2][1][1];
            if (mapNum!=num){//move to new map
                mapNum=num;
                mapBuild();
            }
            else{
                PS.color(oldX,oldY,PS.COLOR_WHITE);
            }
            player.xcoord=x;
            player.ycoord=y;
            PS.color(player.xcoord,player.ycoord,PS.COLOR_CYAN);
            break;
        }
        //start to save data changes
        case 0:{//no data should change as it was just a blank tile before
            //gets the default misc_arrays
            let oldData=PS.data(oldX,oldY)[3];
            let oldData2=PS.data(newX,newY)[3];
            let typeOld=PS.data(oldX,oldY)[1];
            adjustCurrentBead(oldX,oldY,typeOld)
            //PS.data(oldX,oldY,oldData)
            PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
            PS.color(newX,newY,PS.COLOR_CYAN);
            player.xcoord=newX;
            player.ycoord=newY;
            //S.data(newX,newY)
            break;
        }
        case 1:{
            if (PS.data(newX,newY)[2][1]==0){//unmovable wall
                newX=oldX;
                newY=oldY;
            }
            else{//need to move wall
                //also, need to check to see if the wall is at the edge of the screen, so
                //change data for old tile to become standard tile
                let moveX=newX+player.horizontalDir;
                let moveY=newY+player.verticalDir;
                if (moveX>=0 && moveX<=15 && moveY>=0 && moveY<=15){
                    if (PS.data(moveX,moveY)[1]==0) {//can move the block
                        PS.audioPlay("push", { fileTypes: ["wav"], path: "Audio/" });
                        let oldData=[0,0,[0],PS.data(newX,newY)[3]];
                        let oldData2=[PS.data(newX,newY)[0],1,PS.data(newX,newY)[2],PS.data(moveX,moveY)[3]];
                        PS.color(moveX,moveY,getColor(PS.data(newX,newY)[0]));
                        PS.data(newX,newY,oldData);
                        PS.color(newX,newY,PS.COLOR_WHITE);
                        PS.data(moveX,moveY,oldData2);
                    }
                    newX=oldX;
                    newY=oldY;
                }
            }
            break;
        }
        case 2:{
            PS.audioPlay("tile_step"+(PS.random(3)).toString(), {  path: "Audio/" });
            PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
            //PS.debug(newX+","+newY+"\t");
            if (PS.data(newX,newY)[0]==4){
                let entry3=[];
                let dataArr=PS.data(newX,newY)[2];
                let puzzleNum=dataArr.shift();
                dataArr.shift();
                entry3.push(puzzleNum);
                entry3.push(5);
                for (let i=0;i<dataArr.length;dataArr++){
                    entry3.push(dataArr[i]);
                }
                PS.data(newX,newY,[5,2,entry3,[0]]);
            }
            else {
                let entry3=[];
                let dataArr=PS.data(newX,newY)[2];
                let puzzleNum=dataArr.shift();
                dataArr.shift();
                entry3.push(puzzleNum);
                entry3.push(4);
                for (let i=0;i<dataArr.length;dataArr++){
                    entry3.push(dataArr[i]);
                }
                PS.data(newX,newY,[4,2,entry3,[0]]);
            }
            PS.color(newX,newY,PS.COLOR_CYAN);
            player.xcoord=newX;
            player.ycoord=newY;
            break;
        }
        case 4:{
            reactorActions(oldX,oldY,newX,newY,PS.data(newX,newY)[2]);
            break;
        }
    }

	// Add code here for when a key is pressed.
};

var adjustCurrentBead=function(x,y,type){
    //PS.debug(type+"\t");
    switch(type){
        case 2:{
            PS.color(x,y,getColor(PS.data(x,y)[0]));
            let puzzleNum=PS.data(x,y,)[2][0];
            checkPuzzle(puzzleNum);
            //needs to change to stored color
            break;
        }
    }
}

//i is the # of the puzzle, currently just one
//5,3 5,4 5,5 5,6 5,7
//6
//7
//8
//9
var checkPuzzle=function(i){
    switch(i){
        case 2:{
            //first, check for standard win
            let allBeads=[[5,3],[6,4],[7,5],[8,6],[9,7],[9,3],[8,4],[6,6],[5,7],[6,3],[7,3],[8,3],
                [5,4],[7,4],[9,4],
                [5,5],[6,5],[8,5],[9,5],
                [5,6],[7,6],[9,6],
                [6,7],[7,7],[8,7],]
            let standardValid=true;
            for (let s=0;s<allBeads.length;s++){
                let arr=allBeads[s];
                if (PS.data(arr[0],arr[1])[0]==4){
                    standardValid=false;
                    break;
                }
            }
            if (standardValid){
                PS.statusText("That wasn't so hard, was it?");
                completedPuzzles[1]=0;
            }
            else{
                //then, secret win
                let XbeadList=[[5,3],[6,4],[7,5],[8,6],[9,7],[9,3],[8,4],[6,6],[5,7]];
                let otherBeads=[[6,3],[7,3],[8,3],
                    [5,4],[7,4],[9,4],
                    [5,5],[6,5],[8,5],[9,5],
                    [5,6],[7,6],[9,6],
                    [6,7],[7,7],[8,7],
                ];
                //add each path bead to the list;
                //check if matches pattern
                let colorNum=PS.data(5,3)[0];
                let valid=true;
                if (colorNum==4){
                    for (let i=0;i<XbeadList.length;i++){
                        let arr=XbeadList[i];
                        if (PS.data(arr[0],arr[1])[0]!=4){
                            valid=false;
                        }
                    }
                    for (let i=0;i<otherBeads.length;i++){
                        let arr=otherBeads[i];
                        if (PS.data(arr[0],arr[1])[0]!=5){//why error here
                            valid=false;
                        }
                    }
                }
                else{
                    for (let i=0;i<XbeadList.length;i++){
                        let arr=XbeadList[i];
                        if (PS.data(arr[0],arr[1])[0]!=5){
                            valid=false;
                        }
                    }
                    for (let i=0;i<otherBeads.length;i++){
                        let arr=otherBeads[i];
                        if (PS.data(arr[0],arr[1])[0]!=4){
                            valid=false;
                        }
                    }
                }
                if (valid){
                    PS.audioPlay("chicken", { fileTypes: ["wav"], path: "Audio/" });
                    PS.statusText("Hey! You weren't supposed to find that!");
                    completedPuzzles[1]=1;
                    //dig up treasure
                    for (let i=0;i<XbeadList.length;i++){
                        let arr=XbeadList[i];
                        PS.data(arr[0],arr[1],[0,0,[0],[0]]);
                        PS.color(arr[0],arr[1],PS.COLOR_WHITE);
                    }
                    for (let i=0;i<otherBeads.length;i++){
                        let arr=otherBeads[i];
                        PS.data(arr[0],arr[1],[0,0,[0],[0]]);
                        PS.color(arr[0],arr[1],PS.COLOR_WHITE);
                    }
                    let t=4;
                    flashTimer=PS.timerStart(t,beadFlash,t,7,5,-1,0,60,1);
                    inventory.push("TREASURE");
                }
                break;
            }
        }
    }
}
//list of actions for reactor beads (type 4)

var reactorActions=function(oldX,oldY,newX,newY,data){
    let actionType=data[1];
    let puzzleNum=data[0];
    switch(actionType){
        case 0:{//this collects the easter egg
            PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
            PS.color(newX,newY,PS.COLOR_CYAN);
            player.xcoord=newX;
            player.ycoord=newY;
            break;
        }
        case 1:{//deletes given beads
            PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
            PS.color(newX,newY,PS.COLOR_CYAN);
            player.xcoord=newX;
            player.ycoord=newY;
            for (let i=0;i<data.length-2;i++){
                let delX=data[i+2][0];
                let delY=data[i+2][1];
                PS.data(delX,delY,[0,0,[0],[0]]);
                PS.color(delX,delY,PS.COLOR_WHITE);
            }
            switch(mapNum){
                case 2:{
                    PS.statusText("Hey! You shouldn't be there!");
                    break;
                }
            }
            break;
        }
        case 2:{//reduces a counter when attempting to collide. Breaks after X collisions
            let newData=data;
            newData[2]=newData[2]-1;
            if (newData[2]<=0){//if counter is less than 0, breaks the "wall"
                PS.data(newX,newY,[0,0,[0],[0]]);
                PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
                PS.color(newX,newY,PS.COLOR_CYAN);
                player.xcoord=newX;
                player.ycoord=newY;
                switch(puzzleNum){
                    case 4:{
                        if (newX==12){
                            roomStatus[3]=roomStatus[3]+1;
                            completedPuzzles[3]=1;
                            updateStatus();
                        }
                        else if (completedPuzzles[3]!=1){
                            completedPuzzles[3]=0;
                        }
                        break;
                    }
                }
            }
            else{
                let dataArr=PS.data(newX,newY);
                dataArr[2]=newData;
                PS.data(newX,newY,dataArr);
                switch(puzzleNum){
                    case 4:{
                        roomStatus[3]=roomStatus[3]+1;
                        updateStatus();
                        break;
                    }
                }
            }
        }
        case 3:{//triggers a change in another bead. May also be moved
            //formar
            //a: puzzleNum
            //b: is actiontype
            //c: movable or not
            //format: [a,b,c,[coords],[num],activations]
            //num: we use this to determine what data is changed
            //# of activations left
            switch(puzzleNum){
                case 5:{
                    let i=data[4];
                    let nX=0;
                    let nY=0;
                    let move=data[2];
                    let newData=data;
                    newData[5]=newData[5]-1;
                    let hasMove=false;
                    if (move==1){
                        let moveX=newX+player.horizontalDir;
                        let moveY=newY+player.verticalDir;
                        if (moveX>=0 && moveX<=15 && moveY>=0 && moveY<=15){
                            if (PS.data(moveX,moveY)[1]==0) {//can move the block
                                PS.audioPlay("push", { fileTypes: ["wav"], path: "Audio/" });
                                let oldData=[0,0,[0],[0]];
                                let oldData2=newData;
                                PS.color(moveX,moveY,getColor(3));
                                PS.data(newX,newY,oldData);
                                PS.color(newX,newY,PS.COLOR_WHITE);
                                let updateData=[3,4];
                                updateData.push(oldData2);
                                updateData.push([0]);
                                PS.data(moveX,moveY,updateData);
                                hasMove=true;
                            }
                        }
                        if (hasMove){
                            updateStatus();
                            switch (i){
                                case 1:{
                                    nX=7;
                                    nY=12;
                                    break;
                                }
                                case 2:{
                                    nX=5;
                                    nY=4;
                                    break;
                                }
                                case 3:{
                                    break;
                                }
                                default:{
                                    break;
                                }
                            }
                            if (data[5]>=0){
                                roomStatus[mapNum]=roomStatus[mapNum]+=1;
                                if (i==4){
                                    PS.data(newX,newY,[6,-2,[5],[0]]);
                                    PS.color(newX,newY,getColor(6));
                                }
                                else{
                                    let coords=data[3];
                                    PS.data(coords[0][0],coords[0][1],[3,4,[5,3,1,[[nX,nY]],i+1,1],[0]]);
                                    PS.color(coords[0][0],coords[0][1],getColor(3));
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
    }

}
var beadFlash=function(t,x,y,c1,c2,r,i){
    PS.timerStop(flashTimer);
    if (r>0){
        if (i==1){
            PS.color(x,y,getColor(c2));
            flashTimer=PS.timerStart(t,beadFlash,t,x,y,c1,c2,r-1,0);
        }
        else{
            PS.color(x,y,getColor(c1));
            flashTimer=PS.timerStart(t,beadFlash,t,x,y,c1,c2,r-1,1);
        }
    }
}
/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

