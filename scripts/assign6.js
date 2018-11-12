function validateForm() {
    "use strict";
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
  
    // Checking if the number from the form was obtained, 
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
    
    // Making sure range is not too big. Alerting user if they need to change the range
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

function createtable(startX, endX, startY, endY) {
    "use strict";
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
    else if (startX == endX && startY < endY) {
        hRange.push(startX);
        
        // pushing vertical values in ascending order
        for (i = startY; i <= endY; i+=1) {
            vRange.push(i);
        }
    }
    
    // Checking if horizontal start and end are the same and vertical range is in descending order
    else if (startX == endX && startY > endY) {
        hRange.push(startX);
        
        // pushing vertical values in descending order
        for (i = startY; i >= endY; i-=1) {
            vRange.push(i);
        }
    }
    
    // Checking if vertical start and end are the same and horizontal range is in ascending order
    else if (startX < endX && startY == endY) {
        vRange.push(startY);  
        
        // pushing horizontal values in ascending order
        for (i = startX; i <= endX; i+=1) {
            hRange.push(i);
        }
    }
    
    // Checking if vertical start and end are the same and horizontal range is in descending order
    else if (startX > endX && startY == endY) {
        vRange.push(startY);
        
        // pushing horizontal values in descending order
        for (i = startX; i >= endX; i-=1) {
            hRange.push(i);
         }
    }
    
    // horizontal start and end are same number and vertical start and end are same number
    else if (startX == endX && startY == endY) {
        hRange.push(startX);
        vRange.push(startY);
    }
    
    // Creating table
    var table = document.getElementById("myTable");  // getting table element from document

    var r1 = table.insertRow(0);  // creating first row
    var r2, newC = r1.insertCell(-1); // adding blank cell
    
    for (i = 0; i < hRange.length; i+=1) {  // Adding th elements with value of hRange to the table header
        newC = r1.insertCell(-1);
        newC.innerHTML = "<b>" + hRange[i] + "</b>";
    }

    // creating remainging rows and adding values to the respective cells
    for (var v = 1; v <= vRange.length; v+=1) {
        r2 = table.insertRow(v);
        for (var h = 0; h <= hRange.length; h+=1) {
            if (h == 0) {
                newC = r2.insertCell(-1);
                newC.innerHTML = "<b>" + vRange[v-1] + "</b>";
            }

            else {
                newC = r2.insertCell(-1);
                newC.innerHTML = hRange[h-1] * vRange[v-1];
            }
        }
    }
    return;
}
