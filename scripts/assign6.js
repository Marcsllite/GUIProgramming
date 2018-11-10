function validateForm() {
    // getting values from the form
    var startX = document.getElementById("startX").value;
    var endX = document.getElementById("endX").value;
    var startY = document.getElementById("startY").value;
    var endY = document.getElementById("endY").value;
    
    // Checking if the number from the form was obtained, 
    // if not message send to console and user is alerted
    if(Number.isSafeInteger(startX)){
        console.log("StartX: " + startX + "; Failed to get StartX");
        alert("The value in 'Start Number (Horizontal)' could not be fetched.");
    }
    
    if(Number.isSafeInteger(endX)){
        console.log("EndX: " + endX + "; Failed to get EndX");
        alert("The value in 'End Number (Horizontal)' could not be fetched.");
    }
    if(Number.isSafeInteger(startY)){
        console.log("StartY: " + startY + "; Failed to get StartY");
        alert("The value in 'Start Number (Vertical)' could not be fetched.");
    }
    if(Number.isSafeInteger(endY)){
        console.log("EndY: " + endY + "; Failed to get EndY");
        alert("The value in 'End Number (Vertical)' could not be fetched.");
    }
    
    // Making sure range is not too big. Alerting user if they need to change the range
    if(Math.abs(startX - endX) > 100000 || Math.abs(startY - endY) > 100000) {
        alert("One of the Ranges (Horizontal or Vertical) is greater than 100,000." +
              "Please use start and end values that are no more than 100,000 apart.");
    }
    
    // values are in variables and ranges are less than or equal to 100,000
    // calling create table with those variables
    createtable(startX, endX, startY, endY);
}

function createtable(startX, endX, startY, endY) {
    
    
    var hRange  = []; // creating an array to hold the Horizontal Range
    var vRange = [];  // creating an array to hold the Vertical Range
    
    // Adding the numbers to the arrays
    if (startX > endX && endY > startY) {  // checking if the horizontal range has a bigger start than an end
        console.log("DEEZ NUTS 0");
        // pushing horizontal values in reverse order
        for (var i = startX; i >= endX; i--) {
             hRange.push(i);
         }
        
        // pushing vertical values in normal order
        for (var i = startY; i <= endY; i++) {
             vRange.push(i);
         }
        
        console.log("hRange.length = " + hRange.length);
        console.log("vRange.length = " + vRange.length);
        
        // printing out the values of the array for debugging
        for (var i = 0; i >= hRange.length; i++) {
            console.log("hRange[" + i + "]: " + hRange[i]);
        }
        for (var i = 0; i >= vRange.length; i++) {
            console.log("vRange[" + i + "]: " + vRange[i]);
        }
    }
    
    if (startY > endY) {  // checking if vertical range has a bigger start than end
        console.log("DEEZ NUTS 1"); 
        for (var i = startY; i >= endY; i--) {
             vRange.push(i);
         }
        
        console.log("vRange.length = " + vRange.length);
        // printing out the values of the array for debugging
        for (var i = 0; i >= vRange.length; i++) {
            console.log("vRange[" + i + "]: " + vRange[i]);
        }
    }
    
    else {  // both ranges have smaller start and end values. Adding values to range
       console.log("DEEZ NUTS 2");
        for (var i = startX; i <= endX; i++) {
             hRange.push(i);
         }
        
        for (var i = startY; i <= endY; i++) {
             vRange.push(i);
         }
        
        console.log("hRange.length = " + hRange.length);
        console.log("vRange.length = " + vRange.length);
        // printing out the values of the array for debugging
        for (var i = 0; i >= hRange.length; i++) {
            console.log("hRange[" + i + "]: " + hRange[i]);
        }
        for (var i = 0; i >= vRange.length; i++) {
            console.log("vRange[" + i + "]: " + vRange[i]);
        }
    }
    
    // Creating table
    
}