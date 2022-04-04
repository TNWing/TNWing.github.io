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

//import {readFile} from 'fs';
var edgeArray=[];//contains all edges
var goodEdges=[];//contains all edges that are currently accessible
let xsize=0;
let ysize=0;
var myMap = {
    width : xsize,
    height : ysize,
    pixelSize : 1, // format 1
    data:[]
};
var beadData={
    data:0,
    properties:0,
}
const testArrayBD=[ [0,0],[4,0],[0,0],
                    [0,0],[0,0],[0,0],
                    [0,0],[1,0],[0,0],
                    [4,0],[0,0],[0,0],
]

var U={//utility
    calcDist:function(x1,y1,x2,y2){
        let dist=Math.sqrt(
            (Math.pow(x2-x1,2)) +(Math.pow(y2-y1,2))
        );
        return dist;
    }
}

var beadling={
    behavior:0,
    xcoord:0,
    ycoord:0,
    move:function(xCurrent,yCurrent){//have 3rd param, which consists of edges to not include
        myMap.width=xsize;
        myMap.height=ysize;
        myMap.data=[];
        for (let yC=0;yC<ysize;yC++){
            for(let xC=0;xC<xsize;xC++){
                let bD=PS.data(xC,yC);
                if (bD[0]==0 || bD[0]==1 || bD[0]==4){//claims not defined
                    myMap.data.push(1);
                    PS.debug(1);
                }
                else{
                    myMap.data.push(0);
                    PS.debug(0);
                }
                PS.debug(",");
            }
            PS.debug("\n");
        }
        let mapID=PS.pathMap(myMap);

        let closest=0;
        let beadCoord=goodEdges[0];
        let dist=PS.pathFind(mapID,xCurrent,yCurrent,goodEdges[0][0],goodEdges[0][1]).length;
        PS.debug(dist+"\n");
        for (let i=1;i<goodEdges.length;i++){
            let val=PS.pathFind(mapID,xCurrent,yCurrent,goodEdges[i][0],goodEdges[i][1]).length;
            PS.debug(val+"\n");
            if (val < dist){
                dist=val;
                closest=i;
            }
        }
        PS.debug("done calc\n");
        let chosenEdge=goodEdges[closest];

        PS.debug(xCurrent + "," + yCurrent + " going to " +
            chosenEdge[0] + "," + chosenEdge[1] + "\n");
        var path=PS.pathFind(mapID,xCurrent,yCurrent,chosenEdge[0],chosenEdge[1]);
        if (path.length==0){//bead can't find path
            PS.debug("NO WAY THR\n");
            goodEdges.splice(closest,1);
            //remove from goodEdges
            this.move(xCurrent,yCurrent);
            //at this point, the bead should attempt to use a different edge
            //loop the earlier part of this func
        }
        else{
            PS.color(xCurrent,yCurrent,PS.COLOR_WHITE);
            let d=PS.data(xCurrent,yCurrent);
            PS.data(xCurrent,yCurrent,[0,d[1]]);
            let newX=path[0][0];
            let newY=path[0][1];
            PS.debug("NEW coords " + newX + "," + newY);
            PS.debug("\n");
            let newData=[1,PS.data(newX,newY)[1]];//error here, can't read undefined
            PS.data(path[0][0],path[0][1],newData);
            PS.color(newX,newY,PS.COLOR_RED);
            this.xcoord=newX;
            this.ycoord=newY;
        }

    }
}

var behaviors={
    stubborn:function(currentP,dest){//use pathmap

    }
}


PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.
    xsize=3;
    ysize=4;
	PS.gridSize(xsize, ysize);
    let file='./levels/1.txt';
    //readFile(file,(err,data)=>test(data));
    let x=0;
    let y=0;
    for (let i=0;i<testArrayBD.length;i++){
        PS.data(x,y,testArrayBD[i]);
        switch(testArrayBD[i][0]){
            case 0:{
                break;
            }
            case 1:{
                PS.color(x,y,PS.COLOR_RED);
                beadling.xcoord=x;
                beadling.ycoord=y;
                PS.statusText(beadling.ycoord);//so bbeadling does get updated
                break;
            }
            case 2:{
                break;
            }
            case 3:{
                break;
            }
            case 4:{
                PS.color(x,y,PS.COLOR_GREEN);
                edgeArray.push([x,y]);
                break;
            }
            case 5:{
                break;
            }
        }
        x++;
        if (x>=xsize){
            x=0;
            y++;
        }
    }
    goodEdges=edgeArray;
	// PS.statusText( "Game" );

	// Add any other initialization code you need here.
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
    let arr = [0,0];
    arr=PS.data(x,y);
    if (arr[0]==0){
        arr[0]=2;
        PS.data(x,y,arr);
        PS.color(x,y,PS.COLOR_BLACK);
        beadling.move(beadling.xcoord,beadling.ycoord);
    }
    else{
        PS.statusText("You can't build a wall there!");
    }
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

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

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

