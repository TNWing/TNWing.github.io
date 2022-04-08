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

/* Audio credits go to these freesound users: deathpie, florian reinke, christopherderp, bbrocer, michorvath,
breviceps, as well as the Pokemon Company */

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
var lvl=1;
var edgeArray=[];//contains all edges
var goodEdges=[];//contains all edges that are currently accessible
let xsize=0;
let ysize=0;
let gameover=-1;//-1 if game is running, 0 if lost, 1 if won
var myMap = {
    width : xsize,
    height : ysize,
    pixelSize : 1, // format 1
    data:[]
};
var setColor=function(i){
    let color=null;
    switch(i){
        case -1:{//should this be a hole?
            break;
        }
        case 0:{
            color=PS.COLOR_WHITE;
            break;
        }
        case 1:{
            color=PS.COLOR_RED;
            break;
        }
        case 2:{
            color=PS.COLOR_BLACK;
            break;
        }
        case 3:{
            color=PS.COLOR_GRAY;
            break;
        }
        case 4:{
            color=PS.COLOR_GREEN;
            break;
        }
    }
    return color;
}
var myTimer;
var pathOptions={
    no_diagonals :true,
    cut_corners:false,
};
//0: walkable space, 1: beadling space, 2: wall, 3: walkable tile (can't place walls), 4: edge (where the beadling needs to go), -1: blank/hole
//-1: maybe hole?

var beadling={
    behavior:0,
    xcoord:0,
    ycoord:0,
    move:function(xCurrent,yCurrent){//have 3rd param, which consists of edges to not include
        if (goodEdges.length<=0){
            PS.statusText("YOU WON");
            gameover=1;
            lvl++;
            levelBuild(lvl);
        }
        else{
            myMap.width=xsize;
            myMap.height=ysize;
            myMap.data=[];
            for (let yC=0;yC<ysize;yC++){
                for(let xC=0;xC<xsize;xC++){
                    let bD=PS.data(xC,yC);
                    if (bD[0]==0 || bD[0]==1 || bD[0]==3 || bD[0]==4){//can move along these things
                        myMap.data.push(1);
                    }
                    else{
                        myMap.data.push(0);
                    }
                }
            }
            let mapID=PS.pathMap(myMap);

            let closest=0;
            let beadCoord=goodEdges[0];
            let dist=PS.pathFind(mapID,xCurrent,yCurrent,goodEdges[0][0],goodEdges[0][1],pathOptions).length;
            for (let i=1;i<goodEdges.length;i++){
                let val=PS.pathFind(mapID,xCurrent,yCurrent,goodEdges[i][0],goodEdges[i][1],pathOptions).length;
                if (val < dist){
                    dist=val;
                    closest=i;
                }
            }
            let chosenEdge=goodEdges[closest];
            var path=PS.pathFind(mapID,xCurrent,yCurrent,chosenEdge[0],chosenEdge[1],pathOptions);
            if (path.length==0){//bead can't find path
                goodEdges.splice(closest,1);
                //remove from goodEdges
                this.move(xCurrent,yCurrent);
                //at this point, the bead should attempt to use a different edge
                //loop the earlier part of this func
            }
            else{//actually moves
                let color=setColor(PS.data(xCurrent,yCurrent)[2]);
                PS.color(xCurrent,yCurrent,color);
                let d=PS.data(xCurrent,yCurrent);
                PS.data(xCurrent,yCurrent,[0,d[1],d[2]]);
                let newX=path[0][0];
                let newY=path[0][1];
                let pathVal=PS.data(newX,newY)[0];
                let newData=[1,PS.data(newX,newY)[1],PS.data(newX,newY)[2]];//error here, can't read undefined
                PS.data(path[0][0],path[0][1],newData);
                PS.color(newX,newY,PS.COLOR_RED);
                this.xcoord=newX;
                this.ycoord=newY;
                PS.audioPlay("scurry"+(PS.random(3)).toString(), { fileTypes: ["wav"], path: "audio/" });
                if (pathVal==4){
                    PS.statusText("You lost!");
                    gameover=0;
                    myTimer=PS.timerStart ( 120, levelBuild);
                    //lvl++;
                    //levelBuild(lvl);
                }
            }
        }


    }
}

var behaviors={
    stubborn:function(currentP,dest){//use pathmap

    }
}

var resetGrid=function(){
    PS.data(PS.ALL,PS.ALL,0);
    PS.color(PS.ALL,PS.ALL,PS.COLOR_WHITE);
}

var levelCopy=function(level){
    var newLVL=level.slice(0);
    for(var i =0;i< newLVL.length; i++) {
        if (newLVL[i] instanceof Array) {
            newLVL[i] = levelCopy(newLVL[i]);
        }
    }
    return newLVL;
}

var levelBuild=function(){//why is levelbuild being called const
    if (lvl>3){
        PS.statusText("YOU BEAT THE GAME");
    }
    else{
        if (myTimer!=null){
            PS.timerStop(myTimer);
            myTimer=null;
        }
        gameover=-1;
        let level=null;
        resetGrid();
        switch(lvl){
            case 1:{
                level=levelCopy(level1);
                break;
            }
            case 2:{
                level=levelCopy(level2);
                break;
            }
            case 3:{
                level=levelCopy(level3);
                break;
            }
            default:{
                //invalid level
            }
        }
        if (level!=null) {
            let x = 0;
            let y = 0;
            let size = level[0];
            xsize = size[0];//6
            ysize = size[1];//5
            let space = 0;
            PS.gridSize(xsize, ysize);
            for (let i = 1; i < level.length; i++) {
                let data = PS.data(x, y, level[i]);
                switch (level[i][0]) {
                    case -1: {
                        PS.visible(x, y, false);
                        break;
                    }
                    case 0: {
                        space++;
                        PS.color(x, y, PS.COLOR_WHITE);
                        break;
                    }
                    case 1: {
                        PS.color(x, y, PS.COLOR_RED);
                        beadling.xcoord = x;
                        beadling.ycoord = y;
                        break;
                    }
                    case 2: {
                        PS.color(x, y, PS.COLOR_BLACK);
                        break;
                    }
                    case 3: {
                        PS.color(x, y, PS.COLOR_GRAY);
                        break;
                    }
                    case 4: {
                        PS.color(x, y, PS.COLOR_GREEN);
                        edgeArray.push([x, y]);
                        break;
                    }
                    case 5: {
                        break;
                    }
                }
                x++;
                if (x >= xsize) {
                    x = 0;
                    y++;
                }
            }
            goodEdges = edgeArray;
        }
    }


}

PS.init = function( system, options ) {
    PS.statusText( "Don't let it reach green!" );
    PS.audioLoad("click1", { fileTypes: ["wav"], path: "audio/" });
    PS.audioLoad("click2", { fileTypes: ["wav"], path: "audio/" });
    PS.audioLoad("click3", { fileTypes: ["wav"], path: "audio/" });
    PS.audioLoad("click4", { fileTypes: ["wav"], path: "audio/" });
    PS.audioLoad("scurry1", { fileTypes: ["wav"], path: "audio/" });
    PS.audioLoad("scurry2", { fileTypes: ["wav"], path: "audio/" });
    PS.audioLoad("scurry3", { fileTypes: ["wav"], path: "audio/" });
    PS.audioLoad("abomasnow", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("ampharos", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("arcanine", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("arceus", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("azumarill", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("bayleef", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("bellsprout", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("bidoof", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("blissey", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("caterpie", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("charizard", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("cloyster", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("cubone", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("cyndaquil", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("dodrio", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("espeon", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("farfetchd", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("flareon", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("garchomp", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("hoothoot", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("houndoom", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("jolteon", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("jynx", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("kricketune", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("kyogre", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("lugia", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("magikarp", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("mew", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("ninetales", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("palkia", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("pelipper", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("pidgeot", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("poochyena", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("porygon", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("psyduck", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("raichu", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("rayquaza", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("slowpoke", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("sunkern", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("tentacruel", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("typhlosion", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("umbreon", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("vaporeon", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("voltorb", { fileTypes: ["mp3"], path: "pokemon cries/" });
    PS.audioLoad("zubat", { fileTypes: ["mp3"], path: "pokemon cries/" });
    levelBuild(lvl);

    //PS.audioLoad("click5", {  path: "audio/" });

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
    if (gameover==-1){//level is being "overwritten", the actual file isn't being touched, but levelX changes every time a wall is made
        let arr =PS.data(x,y);
        if (arr[0]==0){
            //so level is being overwritten by the arr func
            arr[0]=2;
            PS.color(x,y,PS.COLOR_BLACK);
            beadling.move(beadling.xcoord,beadling.ycoord);
            PS.audioPlay("click"+(PS.random(4)).toString(), { fileTypes: ["wav"], path: "audio/" });
        }
        else if (arr[0]==1){
            PS.statusText("That's the beadling!")
            const Cries = [
                "abomasnow",
                "ampharos",
                "arcanine",
                "arceus",
                "azumarill",
                "bayleef",
                "bellsprout",
                "bidoof",
                "blissey",
                "caterpie",
                "charizard",
                "cloyster",
                "cubone",
                "cyndaquil",
                "dodrio",
                "espeon",
                "farfetchd",
                "flareon",
                "garchomp",
                "hoothoot",
                "houndoom",
                "jolteon",
                "jynx",
                "kricketune",
                "kyogre",
                "lugia",
                "magikarp",
                "mew",
                "ninetales",
                "palkia",
                "pelipper",
                "pidgeot",
                "poochyena",
                "porygon",
                "psyduck",
                "raichu",
                "rayquaza",
                "slowpoke",
                "sunkern",
                "tentacruel",
                "typhlosion",
                "umbreon",
                "vaporeon",
                "voltorb",
                "zubat"
            ];

            let choice = PS.random( Cries.length );
            PS.audioPlay( Cries[ choice - 1 ], { fileTypes: ["mp3"], path: "pokemon cries/" } );
        }
        else{
            PS.statusText("You can't build a wall there!");
        }
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

