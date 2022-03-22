//Trevor Ng
//Team : Egg Studio
//Mod 1: beads now have the following data: hasEnemy, which is a boolean and defaults to false
//Mod 2: Entire Starting Grid is Black. Furthermore, 3 beads at the start will have hasEnemy set to true
//Mod 3: PS.touch now interacts with the selected bead as well as the surrounding beads (a 3 by 3).
//Mod 4: Game now has a score system.
//Mod 5: PS.touch now turns ("Reveals") beads to white or green (white if hasEnemy is false, else green). Beads will also fade back to black over a few seconds
//Mod 6: Revealing a bead that has an Enemy will increase score by 10 and set hasEnemy to false (Destroying enemy).
//Mod 7: PS.touch now has a cooldown (you can only perform a "reveal" every 1.5 seconds)
//Mod 8: Game will use a timer to periodically spawn more enemies, with an enemy cap of 20.
//Mod 9: Added some audio for when the player can "reveal" again and when enemy is detected and destroyed
/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

PS.score=0;
var EnemyCount=0;
var canTouch=true;
var myTimer=null;
//gets random num [0,max)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


PS.init = function( system, options ) {
	// Establish grid dimensions
	PS.gridSize(15, 15);

	// Set background color to Perlenspiel logo gray

	PS.gridColor( 0x303030 );

	// Change status line color and text

	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "Find Enemies! Score : " + PS.score.toString());

	let beadData={
        hasEnemy : false,
	};
	// Preload click sound
	PS.data(PS.ALL,PS.ALL,beadData);
    PS.color(PS.ALL,PS.ALL,PS.COLOR_BLACK);
	PS.audioLoad( "fx_click" );
    PS.audioLoad("fx_scratch");
    PS.audioLoad("fx_beep");
    let spawnAmt=3;
    while (spawnAmt>0){
        let xP=getRandomInt(15);
        let yP=getRandomInt(15);
        if (!PS.data(xP,yP).hasEnemy){
            let newData = {
                hasEnemy : true,
            }
            PS.data(xP,yP,newData);
            spawnAmt--;
            EnemyCount++;
        }
    }
    PS.timerStart(300,EnemySpawner);
};

PS.touch = function( x, y, data, options ) {
    if (canTouch){
        canTouch=false;
        myTimer=PS.timerStart(60,resetTouch);
        for (let iX=-1;iX<=1;iX++){
            if (x+iX>=0 && x+iX<=14){
                for (let iY=-1;iY<=1;iY++) {
                    if (y+iY >= 0 && y+iY <= 14) {
                        let nextData = {
                            hasEnemy: false,
                        };
                        PS.fade(x + iX, y + iY, 0);
                        if (PS.data(x + iX, y + iY).hasEnemy) {

                            PS.score += 10;
                            PS.color(x + iX, y + iY, PS.COLOR_GREEN);
                            PS.audioPlay( "fx_scratch" );
                            PS.statusText( "Find Enemies! Score : " + PS.score.toString());
                            EnemyCount--;
                        }
                        else{
                            PS.color(x + iX, y + iY, PS.COLOR_WHITE); // set color to current value of data
                        }

                        PS.data(x + iX, y + iY, nextData);
                        PS.fade(x + iX, y + iY, 120);
                        PS.color(x + iX, y + iY, PS.COLOR_BLACK); // set color to current value of data
                    }
                }
            }
        }
        PS.audioPlay( "fx_click" );
    }
};


var EnemySpawner =function(){
    //calls itself once in a while
    let spawnAmt=0;
    while (spawnAmt<3 && EnemyCount<20){
        let xP=getRandomInt(15);
        let yP=getRandomInt(15);
        if (!PS.data(xP,yP).hasEnemy){
            let newData = {
                hasEnemy : true,
            }
            PS.data(xP,yP,newData);
            spawnAmt++;
            EnemyCount++;
            //PS.debug("SPAWNED #" + EnemyCount.toString() + "\n");
        }
    }
    //should spawn an enemy every X seconds 60=1 sec
}

var resetTouch=function(){
    canTouch=true;
    PS.timerStop(myTimer);
    PS.audioPlay("fx_beep");
    myTimer=null;
}

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

