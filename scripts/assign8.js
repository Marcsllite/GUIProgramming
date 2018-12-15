/*
   FILE: https://marcsllite.github.io/GUIProgramming/scripts/assign7.js
   Copyright (c) 2018 by Marc Pierre. All rights reserved.
   Author: Marc Pierre, mpierre1@cs.uml.edu,
   Class: UMass Lowell 91.61 GUI Programming I,
   updated by MP on November 14, 2018 at 8:36 AM
   Description: This jquery corresponds to assignment 6. In this
   file you'll find code for validating user input as well as code for
   generating a multiplication table from the user input.
   References: https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
   https://formden.com/blog/validate-contact-form-jquery
*/
"use strict";
$("#startXSlide").slider();
$("#endXSlide").slider();
$("#startYSlide").slider();
$("#endYSlide").slider();

$(function(){
    var startX, endX, startY, endY;
    $("#startX").on("input", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eSX").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSX").text("Number entered is invalid!").css("display", "inline");
            }
            startX = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eSX").css("display", "inline");
        }
        
        // checking input of endX for range check
        $("#endX").on("input", function(){
            var startInput = $(this).val();
            startInput = Number(startInput);
            // adding or removing error styling and message
            // based on if field is empty or not
            if(startInput || $(this).val() === "0") {
                $(this).removeClass("invalid").addClass("valid");
                $("#eEX").css("display", "none");
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eEX").text("Number entered is invalid!").css("display", "inline");
                }
                endX = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEX").css("display", "inline");
            }
            
            // checking horizontal range
            if(startX && endX) {
                if(Math.abs(startX - endX) > 1000) {
                    $("#startX").removeClass("valid").addClass("invalid");
                    $("#endX").removeClass("valid").addClass("invalid");    
                    $("#errHR").removeClass("noerr").addClass("errmsg");
                } else {
                    $("#startX").removeClass("invalid").addClass("valid");
                    $("#endX").removeClass("invalid").addClass("valid");
                    $("#errHR").removeClass("errmsg").addClass("noerr");
                }
            }
        });
    });
    
    $("#endX").on("input", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eEX").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEX").text("Number entered is invalid!").css("display", "inline");
            }
            endX = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eEX").css("display", "inline");
        }
        
        //checking input of startX for range check
        $("#startX").on("input", function(){
            var startInput = $(this).val();
            startInput = Number(startInput);
            // adding or removing error styling and message
            // based on if field is empty or not
            if(startInput || $(this).val() === "0") {
                $(this).removeClass("invalid").addClass("valid");
                $("#eSX").css("display", "none");
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eSX").text("Number entered is invalid!").css("display", "inline");
                }
                startX = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSX").css("display", "inline");
            }
            
            // checking horizontal range
            if(startX && endX) {
                if(Math.abs(startX - endX) > 1000) {
                    $("#startX").removeClass("valid").addClass("invalid");
                    $("#endX").removeClass("valid").addClass("invalid");    
                    $("#errHR").removeClass("noerr").addClass("errmsg");
                } else {
                    $("#startX").removeClass("invalid").addClass("valid");
                    $("#endX").removeClass("invalid").addClass("valid");
                    $("#errHR").removeClass("errmsg").addClass("noerr");
                }
            }
        });
    });
    
    $("#startY").on("input", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eSY").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSY").text("Number entered is invalid!").css("display", "inline");
            }
            startY = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eSY").css("display", "inline");
        }
        
        // checking input of endY for range check
        $("#endY").on("input", function(){
            var startInput = $(this).val();
            startInput = Number(startInput);
            // adding or removing error styling and message
            // based on if field is empty or not
            if(startInput || $(this).val() === "0") {
                $(this).removeClass("invalid").addClass("valid");
                $("#eEY").css("display", "none");
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eEY").text("Number entered is invalid!").css("display", "inline");
                }
                endY = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEY").css("display", "inline");
            }
            
            // Checking vertical range
            if(startY && endY) {
                if(Math.abs(startY - endY) > 1000) {
                    $("#startY").removeClass("valid").addClass("invalid");
                    $("#endY").removeClass("valid").addClass("invalid");    
                    $("#errVR").removeClass("noerr").addClass("errmsg");
                } else {
                    $("#startY").removeClass("invalid").addClass("valid");
                    $("#endY").removeClass("invalid").addClass("valid");
                    $("#errVR").removeClass("errmsg").addClass("noerr");
                }
            }
        });
        
    });
    
    $("#endY").on("input", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eEY").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEY").text("Number entered is invalid!").css("display", "inline");
            }
            endY = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eEY").css("display", "inline");
        }
        
        // checking startY for range check
        $("#startY").on("input", function(){
            var startInput = $(this).val();
            startInput = Number(startInput);
            // adding or removing error styling and message
            // based on if field is empty or not
            if(startInput || $(this).val() === "0") {
                $(this).removeClass("invalid").addClass("valid");
                $("#eSY").css("display", "none");
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eSY").text("Number entered is invalid!").css("display", "inline");
                }
                startY = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSY").css("display", "inline");
            }
            
            // Checking vertical range
            if(startY && endY) {
                if(Math.abs(startY - endY) > 1000) {
                    $("#startY").removeClass("valid").addClass("invalid");
                    $("#endY").removeClass("valid").addClass("invalid");    
                    $("#errVR").removeClass("noerr").addClass("errmsg");
                } else {
                    $("#startY").removeClass("invalid").addClass("valid");
                    $("#endY").removeClass("invalid").addClass("valid");
                    $("#errVR").removeClass("errmsg").addClass("noerr");
                }
            }
        });
        
    });
});

 var validateForm = function() {
    event.preventDefault();
    // getting values from the form
    var startX = document.getElementById("myForm").elements.startX.value, 
        endX = document.getElementById("myForm").elements.endX.value, 
        startY = document.getElementById("myForm").elements.startY.value, 
        endY = document.getElementById("myForm").elements.endY.value, 
        table = document.getElementById("myTable");
    
  
    // turning string values of the numers into actual numbers
    startX = Number(startX);
    endX = Number(endX);
    startY = Number(startY);
    endY = Number(endY);
  
    // Checking if the number from the form was obtained and is a safe Integer, 
    // if not message send to console and user is alerted
    if (!Number.isSafeInteger(startX)) {
        if (startX > 0) {
            console.log("StartX: " + startX + "; StartX is greater than 9007199254740991");
            alert("The value in 'Start Number (Horizontal)' is greater than the maximum safe number (9,007,199,254,740,991).");
            return;
        } else {
            console.log("StartX: " + startX + "; StartX is less than -9007199254740990");
            alert("The value in 'Start Number (Horizontal)' is less than the minimum safe number (-9,007,199,254,740,991).");
            return;
        }
    }
    
    if (!Number.isSafeInteger(endX)) {
        if (endX > 0) {
            console.log("EndX: " + endX + "; EndX is greater than 9007199254740991");
            alert("The value in 'End Number (Horizontal)' is greater than the maximum safe number (9,007,199,254,740,991).");
            return;
        } else {
            console.log("EndX: " + endX + "; EndX is less than -9007199254740990");
            alert("The value in 'End Number (Horizontal)' is less than the minimum safe number (-9,007,199,254,740,991).");
            return;
        }
    }
    
    if (!Number.isSafeInteger(startY)) {
        if (startY > 0) {
            console.log("StartY: " + startY + "; StartY is greater than 9007199254740991");
            alert("The value in 'Start Number (Vertical)' is greater than the maximum safe number (9,007,199,254,740,991).");
            return;
        } else {
            console.log("StartY: " + startY + "; StartY is less than -9007199254740990");
            alert("The value in 'Start Number (Vertical)' is less than the minimum safe number (-9,007,199,254,740,991).");
            return;
        }
    }
    
    if (!Number.isSafeInteger(endY)) {
        if (endY > 0) {
            console.log("EndY: " + endY + "; EndY is greater than 9007199254740991");
            alert("The value in 'End Number (Vertical)' is greater than the maximum safe number (9,007,199,254,740,991).");
            return;
        } else {
            console.log("EndY: " + endY + "; EndY is less than -9007199254740990");
            alert("The value in 'End Number (Vertical)' is less than the minimum safe number (-9,007,199,254,740,991).");
            return;
        }
    }
    
    // Making sure range is not too big. Alerting user if they need to change the range (for speed of page)
    if (Math.abs(startX - endX) > 1000 || Math.abs(startY - endY) > 1000) {
        alert("One of the Ranges (End Number - Start Number) is greater than 1,000." +
              "Please use start and end values that are no more than 1,000 apart.");
        return;
    }
    
    // removing old table data if any so there's only one table per submit
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
  
    // values are in variables and ranges are less than or equal to 100,000
    // calling create table with those variables
    createtable(startX, endX, startY, endY);
    return;
}

var createtable = function(startX, endX, startY, endY) {
    var hRange  = [], // creating an array to hold the Horizontal Range
        vRange = [],  // creating an array to hold the Vertical Range
        i;
  
    // Adding the numbers to the arrays
    // Checking if horizontal range is in descending order and vertical range is in ascending order
    if (startX > endX && startY < endY) { 
        // pushing horizontal values in descending order
        for (i = startX; i >= endX; i-=1) {
            hRange.push(i);
        }
        
        // pushing vertical values in ascending order
        for (i = startY; i <= endY; i+=1) {
            vRange.push(i);
        }
    }
    
    // Checking if vertical range is in descending order and horizontal range is in ascending order
    else if (startX < endX && startY > endY) {  
        // pushing vertical values in descending order
        for (i = startY; i >= endY; i-=1) {
            vRange.push(i);
        }
        
        // pushing horizontal values in ascending order
        for (i = startX; i <= endX; i+=1) {
            hRange.push(i);
        }
    }
    
    // Cheching if both ranges are in descending order
    else if (startX > endX && startY > endY) {  
        // pushing horizontal values in descending order
        for (i = startX; i >= endX; i-=1) {
            hRange.push(i);
         }
        
        // pushing vertical values in descending order
        for (i = startY; i >= endY; i-=1) {
            vRange.push(i);
        }
    }
    
    // Both ranges are in ascending order
    else if (startX < endX && startY < endY) {  
        // pushing horizontal values in ascending order
        for (i = startX; i <= endX; i+=1) {
            hRange.push(i);
        }
        
        // pushing vertical values in ascending order
        for (i = startY; i <= endY; i+=1) {
            vRange.push(i);
        }
    }
    
    // Checking if horizontal start and end are the same and vertical range is in ascending order
    else if (startX === endX && startY < endY) {
        hRange.push(startX);
        
        // pushing vertical values in ascending order
        for (i = startY; i <= endY; i+=1) {
            vRange.push(i);
        }
    }
    
    // Checking if horizontal start and end are the same and vertical range is in descending order
    else if (startX === endX && startY > endY) {
        hRange.push(startX);
        
        // pushing vertical values in descending order
        for (i = startY; i >= endY; i-=1) {
            vRange.push(i);
        }
    }
    
    // Checking if vertical start and end are the same and horizontal range is in ascending order
    else if (startX < endX && startY === endY) {
        vRange.push(startY);  
        
        // pushing horizontal values in ascending order
        for (i = startX; i <= endX; i+=1) {
            hRange.push(i);
        }
    }
    
    // Checking if vertical start and end are the same and horizontal range is in descending order
    else if (startX > endX && startY === endY) {
        vRange.push(startY);
        
        // pushing horizontal values in descending order
        for (i = startX; i >= endX; i-=1) {
            hRange.push(i);
         }
    }
    
    // horizontal start and end are same number and vertical start and end are same number
    else if (startX === endX && startY === endY) {
        hRange.push(startX);
        vRange.push(startY);
    }
    
    // Creating table
    var table = document.getElementById("myTable");  // getting table element from document

    var r1 = table.insertRow(0);  // creating first row
    var r2, newC = r1.insertCell(-1); // adding blank cell
    
    for (i = 0; i < hRange.length; i+=1) {  // Adding td elements with value of hRange to the first table row
        newC = r1.insertCell(-1);
        newC.innerHTML = "<b>" + hRange[i] + "</b>";
    }

    // creating remaining rows and adding values to the respective cells
    for (var v = 1; v <= vRange.length; v+=1) {
        r2 = table.insertRow(v);
        for (var h = 0; h <= hRange.length; h+=1) {
            if (h === 0) {
                newC = r2.insertCell(-1);
                newC.innerHTML = "<b>" + vRange[v-1] + "</b>";
            } else {
                newC = r2.insertCell(-1);
                newC.innerHTML = hRange[h-1] * vRange[v-1];
            }
        }
    }
    return;
}

// making sure onclick of the submit button validateForm is called
document.querySelector("#btnSubmit").addEventListener('click', validateForm);
