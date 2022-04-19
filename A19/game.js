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
var inventory=[]



var customColors={
}
var player={//player represented by CYAN
    xcoord:0,
    ycoord:0,
}
var resetGrid=function(){
    PS.data(PS.ALL,PS.ALL,0);
    PS.color(PS.ALL,PS.ALL,PS.COLOR_WHITE);
    PS.gridSize(16,16);
}

var getColor=function(i){
    let color=null;
    switch (i){
        case -1:{//white
            color=[229,255,102];
            break;
        }
        case 0:{//white
            color=PS.COLOR_WHITE;
            break;
        }
        case 1:{
            color=PS.COLOR_BLACK;
            break;
        }
        case 2:{
            color=PS.COLOR_GRAY;
            break;
        }
        case 3:{
            color=PS.COLOR_GRAY_LIGHT;
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

var mapBuild=function(mapNum) {//why is levelbuild being called const
    let map = null;
    resetGrid();
    switch (mapNum) {
        case 0: {
            map = mapstart;
            PS.statusText("A beginning");
            break;
        }
        case 1: {
            map = map0_0;
            PS.statusText("Pirate Treasure");
            break;
        }
        default: {
            //invalid level
        }
    }
    if (map!=null){
        let x=0;
        let y=0;
        for (let i=0;i<map.length;i++){
            let c=map[i][0];
            PS.color(x,y,getColor(c));//why all balck
            PS.data(x,y,map[i]);
            x++;
            if (x>15){
                x=0;
                y++;
                //PS.debug("\n");
            }
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

	// Add any other initialization code you need here.
    mapBuild(0);
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

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

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

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

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

	// PS.debug( "PS.exitGrid() called\n" );

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
    let horizontalDir=0;
    let verticalDir=0;
	//PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );
    switch(key){
        case 1008:
        case 115:
            newY+=1;
            verticalDir=1;
            if (newY>=15){
                newY=15;
            }
            break;
        case 1007:
        case 100:
            newX+=1;
            horizontalDir=1;
            if (newX>=15){
                newX=15;
            }
            break;
        case 1006:
        case 119:
            newY-=1;
            verticalDir=-1;
            if (newY<=0){
                newY=0;
            }
            break;
        case 1005://left or a
        case 97:
            newX-=1;
            horizontalDir=-1;
            if (newX<=0){
                newX=0;
            }
            break;
    }
    //check to see if the change to x is blocked
    //also will need to update old stuff
    let type1=PS.data(oldX,oldY)[1];
    adjustCurrentBead(oldX,oldY,type1)
    let type=PS.data(newX,newY)[1];
    //doesn't do multiple types i think
    switch (type){
        case -1:{//move to next map
            let mapID=PS.data(newX,newY)[2][0];
            mapBuild(mapID);
            if (horizontalDir==1){
                player.xcoord=0;
            }
            else if (horizontalDir==-1){
                player.xcoord=15;
            }
            if (verticalDir==1){
                player.ycoord=0;
            }
            else if (verticalDir==-1){
                player.ycoord=15;
            }
            PS.color(player.xcoord,player.ycoord,PS.COLOR_CYAN);
            break;
        }
        case 0:{//kjust move
            //gets the default misc_arrays
            let oldData=PS.data(oldX,oldY)[3];
            let oldData2=PS.data(newX,newY)[3];
            PS.color(oldX,oldY,PS.COLOR_WHITE);
            let type1=PS.data(oldX,oldY)[1];
            adjustCurrentBead(oldX,oldY,type1)
            //PS.data(oldX,oldY,oldData)
            PS.color(newX,newY,PS.COLOR_CYAN);
            player.xcoord=newX;
            player.ycoord=newY;
            //S.data(newX,newY)
            break;
        }
        case 1:{
            if (PS.data(newX,newY)[2][0]==0){//unmovable wall
                newX=oldX;
                newY=oldY;
            }
            else{//need to move wall
                //the data sticks close to player, need to fix
                let moveX=newX+horizontalDir;
                let moveY=newY+verticalDir;
                if (PS.data(moveX,moveY)[1]==0) {//can move the block
                    let oldData=[PS.COLOR_WHITE,0,[0],PS.data(newX,newY)[3]];
                    let oldData2=[PS.data(newX,newY)[0],1,PS.data(newX,newY)[2],PS.data(moveX,moveY)[3]];
                    PS.color(moveX,moveY,getColor(PS.data(newX,newY)[0]));
                    PS.data(newX,newY,oldData);
                    PS.color(newX,newY,PS.COLOR_WHITE);
                    PS.data(moveX,moveY,oldData2);
                }
                newX=oldX;
                newY=oldY;
            }
            break;
        }
        case 2:{//path that changes attribute/color when walked over
            //ONLY HERE AS WELL
            //PS.debug(newX+","+newY+"\t");

            PS.color(oldX,oldY,getColor(PS.data(oldX,oldY)[0]));
            //PS.debug(newX+","+newY+"\t");
            if (PS.data(newX,newY)[0]==4){
                PS.data(newX,newY,[5,2,[5],[0]]);
            }
            else {
                PS.data(newX,newY,[4,2,[4],[0]]);
            }
            //PS.data(oldX,oldY,oldData)
            //if leave path, then it doesn't recolor the old tile for some god forsaken reason
            //
            PS.color(newX,newY,PS.COLOR_CYAN);
            player.xcoord=newX;
            player.ycoord=newY;
            //PS.debug(oldX + "   " + oldY + " TO " + player.xcoord + "   " + player.ycoord);
            //horizontal/vertical dirs are fine, its something else
            //4   7 TO 5   5   5   5 TO 6   6   6   6 TO 7   7
            //but why
            //PS.debug(PS.color(oldX,oldY)+"\n");
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
            checkPathPuzzle(1);
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
var checkPathPuzzle=function(i){
    switch(i){
        case 1:{
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
                    PS.statusText("Hey! You weren't supposed to find that!");
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

