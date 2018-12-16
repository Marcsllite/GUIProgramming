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

$(function(){
    var startX, endX, startY, endY;  // variables to access input fields
    var $startXSlide = $("#startXSlide"),
        $endXSlide = $("#endXSlide"),
        $startYSlide = $("#startYSlide"),
        $endYSlide = $("#endYSlide");  // variables to access sliders
    var tabs = $("#myTabs").tabs();  // variable to access tabs
    var ul = tabs.find("ul");  // variable to access tabHeads
    var id = 0;  // variable to give each new tab a unique id
    var numTabs = 0;  // variable to hold how many tabs there are currently
    var activeIndex  = -1, activeTabId = -1;  // index and id of current active tab

    $startXSlide.slider({
        value: -1000,
        min: -1000,
        max: 1000,
        slide: function(event, ui) {
            $("#startX").val(ui.value).change();
            startX = Number($("#startX").val());
            $("#startX").removeClass("invalid").addClass("valid");
            $("#eSX").css("display", "none");
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

        },
        stop: function(event, ui) {
            console.log("StartX: " + $("#startX").val() + " EndX: " + $("#endX").val());
            // checking if all inputs are valid
            if($("#startX").hasClass("valid") && $("#endX").hasClass("valid") &&
               $("#startY").hasClass("valid") && $("#endY").hasClass("valid")) {
//               dynamicUpdate($("#startX").val(), $("#endX").val(), $("#startY").val(), $("#endY").val());  // updating the active tab
            }
        }
    });

    $endXSlide.slider({
        value: -1000,
        min: -1000,
        max: 1000,
        slide: function(event, ui) {
            $("#endX").val(ui.value).change();
            endX = Number($("#endX").val());
            $("#endX").removeClass("invalid").addClass("valid");
            $("#eEX").css("display", "none");
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

        },
        stop: function(event, ui) {
            console.log("EndX: " + $("#endX").val() + " StartX: " + $("#startX").val());
            // checking if all inputs are valid
            if($("#startX").hasClass("valid") && $("#endX").hasClass("valid") &&
               $("#startY").hasClass("valid") && $("#endY").hasClass("valid")) {
//                dynamicUpdate($("#startX").val(), $("#endX").val(), $("#startY").val(), $("#endY").val());  // updating the active tab
            }
        }
    });

    $startYSlide.slider({
        value: -1000,
        min: -1000,
        max: 1000,
        slide: function(event, ui) {
            $("#startY").val(ui.value).change();
            startY = Number($("#startY").val());
            $("#startY").removeClass("invalid").addClass("valid");
            $("#eSY").css("display", "none");
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

        },
        stop: function(event, ui) {
            console.log("StartY: " + $("#startY").val() + " EndY: " + $("#endY").val());
            // checking if all inputs are valid
            if($("#startX").hasClass("valid") && $("#endX").hasClass("valid") &&
               $("#startY").hasClass("valid") && $("#endY").hasClass("valid")) {
//                dynamicUpdate($("#startX").val(), $("#endX").val(), $("#startY").val(), $("#endY").val());  // updating the active tab
            }
        }
    });

    $endYSlide.slider({
        value: -1000,
        min: -1000,
        max: 1000,
        slide: function(event, ui) {
            $("#endY").val(ui.value).change();
            endY = Number($("#endY").val());
            $("#endY").removeClass("invalid").addClass("valid");
            $("#eEY").css("display", "none");
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

        },
        stop: function(event, ui) {
            console.log("EndY: " + $("#endY").val() + " StartY: " + $("#startY").val());
            // checking if all inputs are valid
            if($("#startX").hasClass("valid") && $("#endX").hasClass("valid") &&
               $("#startY").hasClass("valid") && $("#endY").hasClass("valid")) {
//                dynamicUpdate($("#startX").val(), $("#endX").val(), $("#startY").val(), $("#endY").val());  // updating the active tab
            }
        }
    });

    $("#startX").on("change", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eSX").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
               (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSX").text("Number entered is invalid!").css("display", "inline");
            }
            else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eSX").css("display", "none");
            }
            startX = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eSX").text("This field is required!").css("display", "inline");
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
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eEX").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eEX").css("display", "none");
                }
                endX = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEX").text("This field is required!").css("display", "inline");
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
    $("#startX").on("input", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eSX").css("display", "none");
            $startXSlide.slider("value", $(this).val());
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
               (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSX").text("Number entered is invalid!").css("display", "inline");
            }
            else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eSX").css("display", "none");
                $startXSlide.slider("value", $(this).val());
            }
            startX = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eSX").text("This field is required!").css("display", "inline");
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
                $endXSlide.slider("value", $(this).val());
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eEX").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eEX").css("display", "none");
                    $endXSlide.slider("value", $(this).val());
                }
                endX = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEX").text("This field is required!").css("display", "inline");
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
    
    $("#endX").on("change", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eEX").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
                (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEX").text("Number entered is invalid!").css("display", "inline");
            } else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eEX").css("display", "none");
            }
            endX = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eEX").text("This field is required!").css("display", "inline");
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
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eSX").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eSX").css("display", "none");
                }
                startX = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSX").text("This field is required!").css("display", "inline");
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
            $endXSlide.slider("value", $(this).val());
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
                (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEX").text("Number entered is invalid!").css("display", "inline");
            } else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eEX").css("display", "none");
                $endXSlide.slider("value", $(this).val());
            }
            endX = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eEX").text("This field is required!").css("display", "inline");
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
                $startXSlide.slider("value", $(this).val());
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eSX").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eSX").css("display", "none");
                    $startXSlide.slider("value", $(this).val());
                }
                startX = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSX").text("This field is required!").css("display", "inline");
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
    
    $("#startY").on("change", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eSY").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
                (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSY").text("Number entered is invalid!").css("display", "inline");
            } else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eSY").css("display", "none");
            }
            startY = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eSY").text("This field is required!").css("display", "inline");
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
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eEY").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eEY").css("display", "none");
                }
                endY = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEY").text("This field is required!").css("display", "inline");
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
    $("#startY").on("input", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eSY").css("display", "none");
            $startYSlide.slider("value", $(this).val());
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
                (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSY").text("Number entered is invalid!").css("display", "inline");
            } else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eSY").css("display", "none");
                $startYSlide.slider("value", $(this).val());
            }
            startY = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eSY").text("This field is required!").css("display", "inline");
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
                $endYSlide.slider("value", $(this).val());
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eEY").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eEY").css("display", "none");
                    $endYSlide.slider("value", $(this).val());
                }
                endY = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEY").text("This field is required!").css("display", "inline");
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
    
    $("#endY").on("change", function(){
        var startInput = $(this).val();
        startInput = Number(startInput);
        // adding or removing error styling and message
        // based on if field is empty or not
        if(startInput || $(this).val() === "0") {
            $(this).removeClass("invalid").addClass("valid");
            $("#eEY").css("display", "none");
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
                (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEY").text("Number entered is invalid!").css("display", "inline");
            } else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eEY").css("display", "none");
            }
            endY = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eEY").text("This field is required!").css("display", "inline");
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
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eSY").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eSY").css("display", "none");
                }
                startY = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSY").text("This field is required!").css("display", "inline");
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
            $endYSlide.slider("value", $(this).val());
            // checking if user's input is valid integer
            if(!Number.isSafeInteger(startInput) ||
                (startInput < -1000 || startInput > 1000)) {
                $(this).removeClass("valid").addClass("invalid");
                $("#eEY").text("Number entered is invalid!").css("display", "inline");
            } else {
                $(this).removeClass("invalid").addClass("valid");
                $("#eEY").css("display", "none");
                $endYSlide.slider("value", $(this).val());
            }
            endY = startInput;
        } else {
            $(this).removeClass("valid").addClass("invalid");
            $("#eEY").text("This field is required!").css("display", "inline");
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
                $startYSlide.slider("value", $(this).val());
                // checking if user's input is valid integer
                if(!Number.isSafeInteger(startInput) ||
                    (startInput < -1000 || startInput > 1000)) {
                    $(this).removeClass("valid").addClass("invalid");
                    $("#eSY").text("Number entered is invalid!").css("display", "inline");
                } else {
                    $(this).removeClass("invalid").addClass("valid");
                    $("#eSY").css("display", "none");
                    $startYSlide.slider("value", $(this).val());
                }
                startY = startInput;
            } else {
                $(this).removeClass("valid").addClass("invalid");
                $("#eSY").text("This field is required!").css("display", "inline");
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

    tabs.on( 'click', function() {
        activeIndex = tabs.tabs('option', 'active');
        activeTabId = $("#myTabs .ui-tabs-panel:visible").attr("id");
        console.log("Active index: " + activeIndex + " Active id: " + activeTabId);
    });

    var validateForm = function() {
        event.preventDefault();
        // getting values from the form
        var startX = document.getElementById("myForm").elements.startX.value,
            endX = document.getElementById("myForm").elements.endX.value,
            startY = document.getElementById("myForm").elements.startY.value,
            endY = document.getElementById("myForm").elements.endY.value;


        // turning string values of the numers into actual numbers
        startX = Number(startX);
        endX = Number(endX);
        startY = Number(startY);
        endY = Number(endY);

        // Assignment 7 No longer need to check becuase values go from -1,000 to 1,000
        //    // Checking if the number from the form was obtained and is a safe Integer,
        //    // if not message send to console and user is alerted
        //    if (!Number.isInteger(startX)) {
        //        if (startX > 0) {
        //            console.log("StartX: " + startX + "; StartX is greater than 9007199254740991");
        //            alert("The value in 'Start Number (Horizontal)' is greater than the maximum safe number (9,007,199,254,740,991).");
        //            return;
        //        } else {
        //            console.log("StartX: " + startX + "; StartX is less than -9007199254740990");
        //            alert("The value in 'Start Number (Horizontal)' is less than the minimum safe number (-9,007,199,254,740,991).");
        //            return;
        //        }
        //    }
        //
        //    if (!Number.isInteger(endX)) {
        //        if (endX > 0) {
        //            console.log("EndX: " + endX + "; EndX is greater than 9007199254740991");
        //            alert("The value in 'End Number (Horizontal)' is greater than the maximum safe number (9,007,199,254,740,991).");
        //            return;
        //        } else {
        //            console.log("EndX: " + endX + "; EndX is less than -9007199254740990");
        //            alert("The value in 'End Number (Horizontal)' is less than the minimum safe number (-9,007,199,254,740,991).");
        //            return;
        //        }
        //    }
        //
        //    if (!Number.isInteger(startY)) {
        //        if (startY > 0) {
        //            console.log("StartY: " + startY + "; StartY is greater than 9007199254740991");
        //            alert("The value in 'Start Number (Vertical)' is greater than the maximum safe number (9,007,199,254,740,991).");
        //            return;
        //        } else {
        //            console.log("StartY: " + startY + "; StartY is less than -9007199254740990");
        //            alert("The value in 'Start Number (Vertical)' is less than the minimum safe number (-9,007,199,254,740,991).");
        //            return;
        //        }
        //    }
        //
        //    if (!Number.isInteger(endY)) {
        //        if (endY > 0) {
        //            console.log("EndY: " + endY + "; EndY is greater than 9007199254740991");
        //            alert("The value in 'End Number (Vertical)' is greater than the maximum safe number (9,007,199,254,740,991).");
        //            return;
        //        } else {}
        //            console.log("EndY: " + endY + "; EndY is less than -9007199254740990");
        //            alert("The value in 'End Number (Vertical)' is less than the minimum safe number (-9,007,199,254,740,991).");
        //            return;
        //        }
        //    }

        // Making sure range is not too big. Alerting user if they need to change the range (for speed of page)
        if (Math.abs(startX - endX) > 1000 || Math.abs(startY - endY) > 1000) {
            alert("One of the Ranges (End Number - Start Number) is greater than 1,000." +
                  "Please use start and end values that are no more than 1,000 apart.");
            return;
        }

        // values are in variables and ranges are less than or equal to 100,000
        // calling create table with those variables
         // making sure all inputs are valid before making table
        if($("#startX").hasClass("invalid") || $("#endX").hasClass("invalid") ||
            $("#startY").hasClass("invalid") || $("#endY").hasClass("invalid")){
            alert("One or more inputs are invalid");
            return;
        } else {
            createTab(id, startX, endX, startY, endY);
            id++;
            createtable(startX, endX, startY, endY);
            return;
        }
    }

    var dynamicUpdate = function(startX, endX, startY, endY) {
        if( activeIndex === -1 ) {  // if there is no active tab index (no tab)
            createTab(id, startX, endX, startY, endY);  // create a tab
        } else {  // else there was an activeIndex
            var tabHandle = ul.find('li').eq(activeIndex);
            var tabTitleHolder = ul.find('a');
            var tabContentHolder = $(tabTitleHolder.attr('href'));

            //Build the tab title
            var tabTitle = "H: (" + startX + ") - (" + endX +
                               ") V: (" + startY + ") - (" + endY + ")";

            tabTitleHolder[0].innerHTML = tabTitle;

            //Add the contents to the content holder
            var table = createtable(startX, endX, startY, endY);
            var tableId = document.getElementById(table.id);
            $(tabContentHolder[0]).empty();  // removing previous table

            if(tableId && tableId.parentNode === tabContentHolder[0]) {
                tabContentHolder[0].replaceChild(table, tableId);
            } else {
                tabContentHolder[0].appendChild(table);
            }

            tabs.tabs('refresh');
        }
    }
    
    var createTab = function(id, startX, endX, startY, endY) {

            var tabTitle = "H: (" + startX + ") - (" + endX +
                           ") V: (" + startY + ") - (" + endY + ")";

            if($("#tabButtons").hasClass("notYet")){
                $("#tabButtons").removeClass("notYet");
                $("#myTabs").removeClass("notYet");
            }

            //Each tab needs a unique id
            var tabID = id;

            //Add the tab handle
            var li = document.createElement('li');
            li.id = "handle-" + tabID;
            var a = document.createElement('a');
            a.href = "#" + tabID;
            a.textContent = tabTitle;
            li.appendChild(a);

            // adding tab handle to tab bar
            ul.append(li);

            // creating the table
            var table = createtable(startX, endX, startY, endY);

            //Creating tab content holder and adding table to it
            var div = document.createElement('div');
            div.id = tabID;
            div.appendChild(table);
            tabs.append(div);

            tabs.tabs('refresh');
            numTabs++;

            //Select the new tab
            var index = ul.find('li').length-1;
            tabs.tabs("option", "active", index);
            activeTabId = id;

            console.log("Tab Id: " + id + " Tab Index: " + tabs.tabs('option', 'active') + " (Active Tab)");
    };

    var createtable = function(startX, endX, startY, endY) {
        var hRange  = [], // creating an array to hold the Horizontal Range
            vRange = [],  // creating an array to hold the Vertical Range
            i = 0;

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
        var table = document.createElement("table");
        table.id = "myTable";

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
        return table;
    }

    var removeCurrent = function(){
        var ulList = ul.find('li');
        if(numTabs == 1){
            removeAll();
        }else {
            var li = ulList.eq(activeIndex);

            //Use the tab handles href as a selector to remove content
            $(li.find('a').attr('href')).remove();

            //remove the table handle
            li.remove();
            numTabs--;
            tabs.tabs('refresh');

        }
    }
    var removeAll = function(){
         ul.empty();
         tabs.find(":not(:first-child)").remove();
         tabs.tabs('refresh');
         numTabs = 0;
         id = 0;
         $("#tabButtons").addClass("notYet");
         $("#myTabs").addClass("notYet");
    }
    var removeOther = function(){
            var activeIndex = tabs.tabs('option', 'active');
            if( numTabs == 1 ) {
                alert("There are no other tabs to remove.");
            } else {
                if(activeIndex == numTabs - 1){
                    removeLeft();
                }
                else if(activeIndex == 0){
                    removeRight();
                } else {
                    removeLeft();
                    removeRight();
                }
                numTabs = 1;
            }
    }
    var removeLeft = function(){
            var activeIndex = tabs.tabs('option', 'active');
            if( activeIndex == 0 ) {
                alert("There are no tabs to the left of current tab.");
            } else {
                for( var i = 0; i < activeIndex; i++ ) {
                    var li = ul.find('li').eq(i);

                    //Use the tab handles href as a selector to remove content
                    $(li.find('a').attr('href')).remove();

                    //remove the table handle
                    li.remove();
                }
                tabs.tabs('refresh');
                numTabs--;
                if(!numTabs) {
                    $("#tabButtons").addClass("notYet");
                    $("#myTabs").addClass("notYet");
                }
            }
    }
    var removeRight = function(){
            var activeIndex = tabs.tabs('option', 'active');
            if( activeIndex == numTabs - 1 ) {
                alert("There are no tabs to the right of current tab.");
            } else {
                for( var i = activeIndex + 1; i < numTabs; i++ ) {
                    var li = ul.find('li').eq(i);

                    //Use the tab handles href as a selector to remove content
                    $(li.find('a').attr('href')).remove();

                    //remove the table handle
                    li.remove();
                }
                numTabs--;
                if(!numTabs) {
                    $("#tabButtons").addClass("notYet");
                    $("#myTabs").addClass("notYet");
                }
            }
    }

    // making sure onclick of the submit button validateForm is called
    document.querySelector("#btnSubmit").addEventListener('click', validateForm);
    document.querySelector("#removeCurrent").addEventListener('click', removeCurrent);
    document.querySelector("#removeAll").addEventListener('click', removeAll);
    document.querySelector("#removeOther").addEventListener('click', removeOther);
    document.querySelector("#removeLeft").addEventListener('click', removeLeft);
    document.querySelector("#removeRight").addEventListener('click', removeRight);

    });
