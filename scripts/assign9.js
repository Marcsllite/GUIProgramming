/*
   FILE: https://marcsllite.github.io/GUIProgramming/scripts/assign9.js
   Copyright (c) 2018 by Marc Pierre. All rights reserved.
   Author: Marc Pierre, mpierre1@cs.uml.edu,
   Class: UMass Lowell 91.61 GUI Programming I,
   updated by MP on December 18, 2018
   Description: This jquery corresponds to assignment 9. In this
   file you'll find code to make drag and drop blocks and create my scrabble
   game assignment
   References: W3Schools
   http://spolearninglab.com/curriculum/SEP/2015/unit_01/drag_and_drop.html
   https://www.youtube.com/watch?v=DEk2g4Pe_HA
"use strict";
*/

$(function(){
    var boardBackground;  // holds the image of the current board
    var boardPoints; // holds the value of each space on the current board
    var tileBackgrounds = [];  // array to hold the image of the current 7 tiles user has
    var tilesValues = [];
    var tilesUsed = [];

    var boardData = new XMLHttpRequest();
    var tileData = new XMLHttpRequest();

    boardData.open('GET', 'json/board.json', true);  // preparing the request
    tileData.open('GET', 'json/pieces.json', true);  // preparing the request
    boardData.send(null);  // send the request to server
    tileData.send(null);  // send the request to server
    boardData.onload = function() {
        var responseObject = JSON.parse(boardData.responseText); // turning .json file into a javascript object
        var i = Math.floor(Math.random() * 8);  // getting board at random index i
        boardPoints = responseObject.rows[i].points;
        boardBackground = 'url(/' + responseObject.rows[i].image + ')';
        $("#cardContainer").css({"background": boardBackground, "background-size": "1400px 80pt", "background-repeat": "no-repeat"});
         // making locations droppable
        var $slotnum;
        for ( var i=1; i<=15; i++ ) {
              $slotnum = "#slot-" + i.toString();
            $($slotnum).data( 'num', i ).droppable( {
              accept: '#cardPile div',
              hoverClass: 'hovered',
              drop: handleTileDrop
            } );
          }
    };
    tileData.onload = function() {
        var responseObject2 = JSON.parse(tileData.responseText); // turning .json file into a javascript object
        var i, num = 1;
        while(num <= 7) {
            i = Math.floor(Math.random() * 27);  // getting tile at random index i

            // checking if there are any more of those tiles left to use
            if(responseObject2.pieces[i].amount - timesUsed(responseObject2.pieces[i].letter) > 0){
                console.log("Tile: " + responseObject2.pieces[i].letter
                          + " Remaining: " + Number(responseObject2.pieces[i].amount - timesUsed(responseObject2.pieces[i].letter) - 1));
                tilesUsed.push(responseObject2.pieces[i].letter);
                tileBackgrounds.push(responseObject2.pieces[i].image);
                tilesValues.push(responseObject2.pieces[i].value);
                num++;
            }
        }
        // making tiles draggable
        var $dragnum;
          for ( var i=1; i<=7; i++ ) {
              $dragnum = "#tile-" + i.toString();
              $($dragnum).css({"background": tileBackgrounds[i-1], "background-size": "100% 100%", "background-repeat": "no-repeat"});
              $($dragnum).data( 'num', i ).data('value', tilesValues[i-1]).data('name', tilesUsed[i-1]);
            $($dragnum).draggable( {
              containment: '#content',
              stack: '#cardPile div',
              cursor: 'move',
              revert: function(event, ui) {  // reverts back to stand if not on draggable else snaps to draggable
                        $(this).data("uiDraggable").originalPosition = {
                            top : 0,
                            left : 0
                        };
                        return !event;
                     }
            } );
          }
    };

    function timesUsed(name){
        var count = 0;
        for(var i = 0; i < tilesUsed.length; i++) {
            if(name === tilesUsed[i]){
                count++;
            }
        }
        return count;
    }

    function handleTileDrop( event, ui ) {
        var slotNumber = $(this).data( 'num' );
        var tileNumber = ui.draggable.data( 'num' );
        var tileName = ui.draggable.data( 'name' );
        var tileValue = ui.draggable.data( 'value' );

        console.log("Tile " + tileName + " was droppped onto block " + slotNumber);

        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    }

});
