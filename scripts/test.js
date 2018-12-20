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
        boardBackground = '"url(/' + responseObject.rows[i].image + ')"';
        console.log(boardBackground);
        $("#cardContainer").css("background", boardBackground);
    };
    tileData.onload = function() {
        var responseObject2 = JSON.parse(tileData.responseText); // turning .json file into a javascript object
        var i, num = 1;
        while(num <= 7) {
            i = Math.floor(Math.random() * 27);  // getting tile at random index i

            // checking if there are any more of those tiles left to use
            if(responseObject2.pieces[i].amount - timesUsed(responseObject2.pieces[i].letter) > 0){
                tilesUsed.push(responseObject2.pieces[i].letter);
                tileBackgrounds.push(responseObject2.pieces[i].image);
                tilesValues.push(responseObject2.pieces[i].value);
                num++;
            }
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

//    $(gameInit);

//    function gameInit() {
      // making tiles draggable
      var $dragnum;
      for ( var i=1; i<=7; i++ ) {
          $dragnum = "#tile-" + i.toString();
        $($dragnum).data( 'num', i ).css("background", tileBackgrounds[i-1]).data("value", tilesValues[i-1]).draggable( {
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

      // making locations droppable
      var $slotnum;

      for ( var i=1; i<=15; i++ ) {
          $slotnum = "#slot-" + i.toString();
        $($slotnum).data( 'num', i ).css("background", boardBackground).droppable( {
          accept: '#cardPile div',
          hoverClass: 'hovered',
          drop: handleTileDrop
        } );
      }

//    }
    function handleTileDrop( event, ui ) {
      var slotNumber = $(this).data( 'num' );
      var tileNumber = ui.draggable.data( 'num' );

      ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );

      }

});
