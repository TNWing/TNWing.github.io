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

//Idea: game with an image made of glyphs. Clicking on a glyph can change it
//Maybe 2 modes: glyph mode and color mode
var G={
    myTimer : "",
    mode : 1,
    colorIndex : 0,
    glyphIndex : 0,
    maxGlyphI : 6,
    maxColorI : 4,
    eyeGlyphs:["@","'","*","$","0","o",0x0298,0x03A6,0x03f4,0x03C3,"-"],
    mouthGlyphs:["_","-","w","v","n","m","/","=",">","<"],
    lCheekGlyphs:["\\","*","@","(","=",0x2665,""],
    rCheekGlyphs:["/","*","@",")","=",0x2665,""],
    lBrowGlyphs:["\\","-","~","_",0x23fa,""],
    rBrowGlyphs:["/","-","~","_",0x23fa,""],
    colors : [PS.COLOR_RED,PS.COLOR_BLUE,PS.COLOR_GREEN,PS.COLOR_BLACK,PS.COLOR_WHITE],
    resetStatus : function(){
        //PS.statusText("Color:" + G.printCurrentColor() + " Mode:" + G.printCurrentMode()+" H for Help");
        if (G.myTimer!=""){
            //PS.timerStop(G.myTimer);
            //G.myTimer="";
        }

    },
    printCurrentMode:function(){
        let modeName="";
        switch (this.mode){
            case -1:
                modeName = "Color"
                break;
            case 1:
                modeName = "Glyph"
                break;
        }
        return modeName;
    },
    printCurrentColor : function (){
        let colorName="";
        switch (this.colorIndex){
            case 0:
                colorName="Red";
                break;
            case 1:
                colorName="Blue";
                break;
            case 2:
                colorName="Green";
                break;
            case 3:
                colorName="Black";
                break;
            case 4:
                colorName="White";
                break;
        }
        return colorName;
    },
    incrementIndex : function(){
        switch(this.mode){
            case -1:
                this.colorIndex++;
                if (this.colorIndex>this.maxColorI){
                    this.colorIndex=0;
                }
                let colorName="";
                switch (this.colorIndex){
                    case 0:
                        colorName="Red";
                        break;
                    case 1:
                        colorName="Blue";
                        break;
                    case 2:
                        colorName="Green";
                        break;
                    case 3:
                        colorName="Black";
                        break;
                    case 4:
                        colorName="White";
                        break;
                }
                PS.statusText("NOW USING COLOR " + this.printCurrentColor());
                if (this.myTimer!=""){
                    PS.timerStop(this.myTimer);
                    this.myTimer=PS.timerStart(120,this.resetStatus);
                }
                else{//its null
                    this.myTimer=PS.timerStart(120,this.resetStatus);
                }
                break;
            case 1:
                this.glyphIndex++;
                if (this.glyphIndex>this.maxGlyphI){
                    this.glyphIndex=0;
                }
                break;
        }
    },
}
PS.init = function( system, options ) {
	PS.gridSize(5, 5);
    PS.glyphScale (PS.ALL, PS.ALL, 100);
    PS.statusText("Go");
    PS.audioLoad("fx_pop");
    PS.audioLoad("fx_click");
    PS.audioLoad("fx_bloop");
    PS.audioLoad("fx_drip2");
    //make face
    //default data is 0
    PS.color(PS.ALL,PS.ALL,PS.COLOR_YELLOW);
    PS.data(PS.ALL,PS.ALL,[0,0]);
    PS.borderColor(PS.ALL,PS.ALL,PS.COLOR_YELLOW);

    PS.color(1,1,PS.COLOR_CYAN);
    PS.data(1,1,[6,1]);
    PS.glyph(1,1,"-");
    PS.borderColor(1,1,PS.COLOR_BLACK);

    PS.color(3,1,PS.COLOR_CYAN);
    PS.data(3,1,[5,1]);
    PS.glyph(3,1,"-");
    PS.borderColor(3,1,PS.COLOR_BLACK);

    PS.color(1,2,PS.COLOR_CYAN);
    PS.data(1,2,[1,1]);//eyes
    PS.glyph(1,2,"'");
    PS.borderColor(1,2,PS.COLOR_BLACK);

    PS.color(3,2,PS.COLOR_CYAN);
    PS.data(3,2,[1,1]);
    PS.glyph(3,2,"'");
    PS.borderColor(3,2,PS.COLOR_BLACK);

    PS.color(0,3,PS.COLOR_CYAN);
    PS.data(0,3,[3,4]);//cheeks
    PS.glyph(0,3,"=");
    PS.borderColor(0,3,PS.COLOR_BLACK);

    PS.color(4,3,PS.COLOR_CYAN);
    PS.data(4,3,[4,4]);
    PS.glyph(4,3,"=");
    PS.borderColor(4,3,PS.COLOR_BLACK);

    PS.color(2,3,PS.COLOR_CYAN);
    PS.data(2,3,[2,3]);
    PS.glyph(2,3,"v");
    PS.borderColor(2,3,PS.COLOR_BLACK);
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
    //each bead will have a value det what "face part" it is (mouth, eye, brow, cheek, none)
    switch(G.mode){
        case 1:
            let arr = [0,0];
            arr=PS.data(x,y);
            switch(arr[0]){
                case 1: {
                    let ind=arr[1]+1;
                    if (ind>10){
                        ind=0;
                    }
                    PS.data(x,y,[1,ind]);
                    PS.glyph(x,y,G.eyeGlyphs[ind]);
                    PS.audioPlay("fx_click");
                    break;
                }
                case 2:{
                    let ind=arr[1]+1;
                    if (ind>9){
                        ind=0;
                    }
                    PS.data(x,y,[2,ind]);
                    PS.glyph(x,y,G.mouthGlyphs[ind]);
                    PS.audioPlay("fx_pop");
                    break;
                }
                case 3:{
                    let ind=arr[1]+1;
                    if (ind>6){
                        ind=0;
                    }
                    PS.data(x,y,[3,ind]);
                    PS.glyph(x,y,G.lCheekGlyphs[ind]);
                    PS.audioPlay("fx_bloop");
                    break;
                }
                case 4:{
                    let ind=arr[1]+1;
                    if (ind>6){
                        ind=0;
                    }
                    PS.data(x,y,[4,ind]);
                    PS.glyph(x,y,G.rCheekGlyphs[ind]);
                    PS.audioPlay("fx_bloop");
                    break;
                }
                case 5:{
                    let ind=arr[1]+1;
                    if (ind>5){
                        ind=0;
                    }
                    PS.data(x,y,[5,ind]);
                    PS.glyph(x,y,G.lBrowGlyphs[ind]);
                    PS.audioPlay("fx_drip2");
                    break;
                }
                case 6:{
                    let ind=arr[1]+1;
                    if (ind>5){
                        ind=0;
                    }
                    PS.data(x,y,[6,ind]);
                    PS.glyph(x,y,G.rBrowGlyphs[ind]);
                    PS.audioPlay("fx_drip2");
                    break;
                }
            }
            //PS.glyphC
            break;
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
//
PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:
    switch(key){
        case 32:
            //G.mode*=-1;
            //G.resetStatus();
            break;
        case 9://index change
            //G.incrementIndex();
            break;
        case 72://help
        case 104:
            /*
            if (G.myTimer==""){
                PS.statusText("Tab:Switch Modes Spacebar:Change Color");
                G.myTimer=PS.timerStart(120,G.resetStatus);
            }

             */
            break;
    }
	PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

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

