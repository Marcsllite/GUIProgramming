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
        $.getJSON("json/board.json", function(response){
            var i = Math.floor(Math.random() * 8);  // getting board at random index i
            boardPoints = response.rows[i].points;
            boardBackground = response.rows[i].image;
            slotsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            $("#score").text("0");
            console.log("NEW-BOARD slotsUsed: " + slotsUsed);
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
          $($slotnum).data( 'num', i ).data("used", "false").droppable( {
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
            $.getJSON("json/pieces.json", function(response){
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

                        $('<div></div>').data( 'num', i ).data("value", tilesValues[i-1]).data("slot", -1).attr({"id": $tileNum, "class":"dragobj"}).appendTo('#cardPile').css({
                             "background": tileBackgrounds[i-1],
                             "background-size": "100% 100%",
                             "background-repeat": "no-repeat"}).draggable( {
                                      containment: '#content',
                                      stack: '#cardPile div',
                                      cursor: 'move',
                                      stop: function(){  // figures out if the tile is on the rack or board
                                               if($(this).css('left') === '0px' && $(this).css('top') === '0px'){
                                                   $(this).data("parent", "tileContainer");
                                                   $(this).data('slot', -1);
                                               } else{
                                                   $(this).data("parent", "cardContainer");
                                               }
                                           console.log("Tile[" + $(this).data('num') + "] slot: " + $(this).data('slot'));
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
            slotsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            $("#score").text("0");
            console.log("INIT-TILES slotsUsed: " + slotsUsed);
            // making holder droppable
            $("#tileContainer").droppable({
                accept: '#cardPile div',
                drop: function(event, ui){
                    if(ui.draggable.data('slot') != -1) {
                        var oldSlot = "#slot-" + ui.draggable.data('slot').toString();
                        ui.draggable.data('slot', -1);
                        $(oldSlot).data('used', "false");
                    }
                    ui.draggable.css("left", "0px");
                    ui.draggable.css("top", "0px");
                     
                    }
                });
            // making new tiles draggable
//            for(var i = tilesUsed.length; i > tilesUsed.length - 7; i--) {
//                $dragnum = "#tile-" + i.toString();
//                $($dragnum).css({
//                    "background": tileBackgrounds[i],
//                    "background-size": "100% 100%",
//                    "background-repeat": "no-repeat"});
//                $($dragnum).data( 'num', i ).data("value", tilesValues[i])
//                $($dragnum).draggable( {
//                    containment: '#content',
//                    cursor: 'move',
//                    // reverts back to stand if not on draggable else snaps to draggable
//                    stop: function(){
//                            console.log("Tile[" + $(this).data('num') + "] slot: " + $(this).data('slot'));    
//                    },
//                    revert: function(event, ui) {
//                            $(this).data("uiDraggable").originalPosition = {
//                                top : 0,
//                                left : 0
//                            };
//                            return !event;
//                        }
//                } );
//            }
        }
    }

    // handles the dropping of the tiles on the board
    function handleTileDrop( event, ui ) {
        var slotNumber = $(this).data( 'num' );
        console.log("TILE STATUS: " + $(this).data());
        if(ui.draggable.data('slot') === -1) { // if the tile came from the holder
            if($(this).data('used') == "true"){  // if there is already a tile in this slot
                alert("This slot is already being used by another tile. This tile will be moved back to the holder.");
                console.log("Tile came from holder and there's already a tile in the slot");
                ui.draggable.css("left", "0px");
                ui.draggable.css("top", "0px");
                ui.draggable.data('slot', -1);
                var num = slotNumber-1;
                console.log("Slot[" + num + "] used: " + $(this).data('used'));
            } else {
                 ui.draggable.data('slot', slotNumber-1);
                ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
                $(this).data('used', "true");
                var num = slotNumber-1;
                console.log("Slot[" + num + "] used: " + $(this).data('used'));
            }
            
        } 
        else {  // if the tile came from another slot
            var oldSlot = "#slot-" + ui.draggable.data('slot').toString();
            console.log("oldSlot: " + oldSlot);
            $(oldSlot).data('used', "false");  // marking old slot as unused
            console.log("Slot[" + ui.draggable.data('slot') + "] used: " + $(oldSlot).data('used'));
            
            if($(this).data('used') == "true"){  // if there is already a tile in this slot
                alert("This slot is already being used by another tile. This tile will be moved back to the holder.");
                console.log("Tile came from another slot and there's already a tile in the slot");
                ui.draggable.css("left", "0px");
                ui.draggable.css("top", "0px");
                ui.draggable.data('slot', -1);
            } 
            else {
                 ui.draggable.data('slot', slotNumber-1);
                ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
                $(this).data('used', "true");
                var num = slotNumber-1;
                console.log("Slot[" + num + "] used: " + $(this).data('used'));
            }
        }
       
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

    function boardEmpty(){
        for(var i = 0; i < slotsUsed.length; i++){
            if(slotsUsed[i] != 0){
                return false;
            }
        }
        return true;
    }

    function calculate(){
         slotsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
         var $dragnum;
         for(var i = tilesUsed.length; i > tilesUsed.length - 7; i--) {  // getting location of current tiles
                $dragnum = "#tile-" + i.toString();
                if($($dragnum).data('slot') != -1) {
                    slotsUsed[$($dragnum).data('slot')] = $($dragnum).data('value');
                }
            }
            console.log("CALCULATE slotsUsed: " + slotsUsed);
        if(boardEmpty()){
            alert("There are no pieces on the board to make claculations.");
            console.log("boardEmpty?: " + boardEmpty);
        } else {
            var score = 0;
            var triple = false;
            var double = 0;
            for(var i = 0; i < slotsUsed.length; i++){
                if(boardPoints[i] == 30 && slotsUsed[i] != 0){
                    triple = true;
                }
                else if(boardPoints[i] == 20 && slotsUsed[i] != 0) {
                    double++;
                } else {
                    score += slotsUsed[i] * boardPoints[i];
                }
            }
            if(triple){
                score = 3 * score;
                 $('#score').text(score);
            }else if (double == 1){
                score = 2 * score;
                 $('#score').text(score);
            }else if (double == 2){
                score = 4 * score;
                 $('#score').text(score);
            }else {
                $('#score').text(score);
            }
        }
    }

    // making sure onclick of the buttons call the proper function
    document.querySelector("#newBoard").addEventListener('click', initBoard);
    document.querySelector("#newLetters").addEventListener('click', function(){
        $('#cardPile').empty();
        initTiles();
        for ( var i=1; i<=15; i++ ) {
          $slotnum = "#slot-" + i.toString();
          $($slotnum).data("used", "false");
        }
    });
    document.querySelector("#submit").addEventListener('click', calculate);
});
