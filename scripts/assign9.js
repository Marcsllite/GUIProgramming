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
    var slotsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var numTiles = 0;

    initBoard();
    initTiles();
    // gets a new random scrabble board from json
    function newBoard() {
        $.getJSON("/json/board.json", function(response){
            var i = Math.floor(Math.random() * 8);  // getting board at random index i
            boardPoints = response.rows[i].points;
            boardBackground = response.rows[i].image;
            $("#cardContainer").css({"background": boardBackground, "background-size": "100% 100%", "background-repeat": "no-repeat"});
        });
    }
    // initializes the board with droppable locations and a random board background
    function initBoard(){
      newBoard();
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
    }

    /**$(initTiles);
    // creates new tiles and adds them to tile holder
    // @param number of tiles to create and add to tile holder
    // @return the number of the first new tile created
    */
    function newTiles(number) {
        if(number <= 0) {
                console.log("newTiles: ERROR parameter is less than or euqal to 0");
                return -1;
        }
        else {
            $.getJSON("/json/pieces.json", function(response){
                var $tileNum, rand, i;
                var startloop = tilesUsed.length + 1;
                var endloop = tilesUsed.length + Number(number);
                for(i = startloop; i <= endloop; i++){  // adding json data to arrays
                    $tileNum = "tile-" + i.toString();
                    rand = Math.floor(Math.random() * 27);  // getting tile at random index rand

                    // making sure there are still tiles of this type
                    while(response.pieces[rand].amount - timesUsed(response.pieces[rand].letter) <= 0){
                        rand = Math.floor(Math.random() * 27);  // getting tile at random index rand
                    }

                    tilesUsed.push(response.pieces[rand].letter);
                    numTiles++;
                    tileBackgrounds.push(response.pieces[rand].image);
                    tilesValues.push(response.pieces[rand].value);
                }
                for(i = startloop; i <= endloop; i++){
                        $tileNum = "tile-" + i.toString();

                        $('<div></div>').data( 'num', i ).data("value", tilesValues[i-1]).attr({"id": $tileNum, "class":"dragobj"}).appendTo('#cardPile').css({
                             "background": tileBackgrounds[i-1],
                             "background-size": "100% 100%",
                             "background-repeat": "no-repeat"}).draggable( {
                                      containment: '#content',
                                      stack: '#cardPile div',
                                      cursor: 'move',
                                      stop: function(){  // figures out if the tile is on the rack or board
                                               if($(this).css('left') === '0px' && $(this).css('top') === '0px'){
                                                   $(this).data("parent", "tileContainer");
                                               } else{
                                                   $(this).data("parent", "cardContainer");
                                               }
                                          },
                                      // reverts back to stand if not on draggable else snaps to draggable
                                      revert: function(event, ui) {
                                                $(this).data("uiDraggable").originalPosition = {
                                                    top : 0,
                                                    left : 0
                                                };
                                                return !event;
                                             }});  // creating tile in html
                }
            });
        }
    }
    // initializes 7 seperate draggable tiles with a random tile from the json
    function initTiles(){
        var $dragnum;
        if(newTiles(7) == -1){
            alert("An error occurred while trying to init the new tiles");
        }
        else {
            // making new tiles draggable
            for(var i = tilesUsed.length; i > tilesUsed.length - 7; i--) {
                $dragnum = "#tile-" + i.toString();
                $($dragnum).css({
                    "background": tileBackgrounds[i],
                    "background-size": "100% 100%",
                    "background-repeat": "no-repeat"});
                $($dragnum).data( 'num', i ).data("value", tilesValues[i])
                $($dragnum).draggable( {
                    containment: '#content',
                    stack: '#cardPile div',
                    cursor: 'move',
                    stop: function(){  // figures out if the tile is on the rack or board
                            if($(this).css('left') === '0px' && $(this).css('top') === '0px'){
                                $(this).data("parent", "tileContainer");
                            } else{
                                $(this).data("parent", "cardContainer");
                            }
                        },
                    // reverts back to stand if not on draggable else snaps to draggable
                    revert: function(event, ui) {
                            $(this).data("uiDraggable").originalPosition = {
                                top : 0,
                                left : 0
                            };
                            return !event;
                        }
                } );
            }
        }
    }

    // handles the dropping of the tiles on the board
    function handleTileDrop( event, ui ) {
        var slotNumber = $(this).data( 'num' );
        var $tileNumber = ui.draggable.data( 'num' );
        var tileValue = ui.draggable.data('value');

        slotsUsed[slotNumber] = tileValue;

        console.log("slotsUsed: " + slotsUsed);

        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    }
    // keeps track of how many times that particular tile was used
    // helps to know when there is no more of that tile left
    function timesUsed(name){
        var count = 0;
        for(var i = 0; i < tilesUsed.length; i++) {
            if(name === tilesUsed[i]){
                count++;
            }
        }
        return count;
    }


});
