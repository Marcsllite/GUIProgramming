function validateForm() {
    event.preventDefault();
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
        return;
    }
    
    if(Number.isSafeInteger(endX)){
        console.log("EndX: " + endX + "; Failed to get EndX");
        alert("The value in 'End Number (Horizontal)' could not be fetched.");
        return;
    }
    if(Number.isSafeInteger(startY)){
        console.log("StartY: " + startY + "; Failed to get StartY");
        alert("The value in 'Start Number (Vertical)' could not be fetched.");
        return;
    }
    if(Number.isSafeInteger(endY)){
        console.log("EndY: " + endY + "; Failed to get EndY");
        alert("The value in 'End Number (Vertical)' could not be fetched.");
        return;
    }
    
    // Making sure range is not too big. Alerting user if they need to change the range
    if(Math.abs(startX - endX) > 10000 || Math.abs(startY - endY) > 10000) {
        alert("One of the Ranges (End Number - Start Number) is greater than 10,000." +
              "Please use start and end values that are no more than 10,000 apart.");
        return;
    }
    
    // values are in variables and ranges are less than or equal to 10,000
    // calling create table with those variables
    createtable(startX, endX, startY, endY);
    return;
}

function createtable(startX, endX, startY, endY) {
    var hRange  = []; // creating an array to hold the Horizontal Range
    var vRange = [];  // creating an array to hold the Vertical Range
    
    // Adding the numbers to the arrays
    // Checking if horizontal range is in descending order and vertical range is in ascending order
    if (startX > endX && startY < endY) { 
        // pushing horizontal values in descending order
        for (var i = startX; i >= endX; i--) {
             hRange.push(i);
         }
        
        // pushing vertical values in ascending order
        for (var i = startY; i <= endY; i++) {
             vRange.push(i);
         }
    }
    
    // Checking if vertical range is in descending order and horizontal range is in ascending order
    else if (startX < endX && startY > endY) {  
        // pushing vertical values in descending order
        for (var i = startY; i >= endY; i--) {
             vRange.push(i);
        }
        
        // pushing horizontal values in ascending order
        for (var i = startX; i <= endX; i++) {
             hRange.push(i);
        }
    }
    
    // Cheching if both ranges are in descending order
    else if (startX > endX && startY > endY){  
        // pushing horizontal values in descending order
        for (var i = startX; i >= endX; i--) {
             hRange.push(i);
         }
        
        // pushing vertical values in descending order
        for (var i = startY; i >= endY; i--) {
             vRange.push(i);
        }
    }
    
    // Both ranges are in ascending order
    else if (startX < endX && startY < endY) {  
        // pushing horizontal values in ascending order
        for (var i = startX; i <= endX; i++) {
             hRange.push(i);
        }
        
        // pushing vertical values in ascending order
        for (var i = startY; i <= endY; i++) {
             vRange.push(i);
        }
    }
    
    // Checking if horizontal start and end are the same and vertical range is in ascending order
    else if (startX == endX && startY < endY) {
        hRange.push(startX);
        
        // pushing vertical values in ascending order
        for (var i = startY; i <= endY; i++) {
             vRange.push(i);
        }
    }
    
    // Checking if horizontal start and end are the same and vertical range is in descending order
    else if (startX == endX && startY > endY) {
        hRange.push(startX);
        
        // pushing vertical values in descending order
        for (var i = startY; i >= endY; i--) {
             vRange.push(i);
        }
    }
    
    // Checking if vertical start and end are the same and horizontal range is in ascending order
    else if (startX < endX && startY == endY) {
        vRange.push(startY);  
        
        // pushing horizontal values in ascending order
        for (var i = startX; i <= endX; i++) {
             hRange.push(i);
        }
    }
    
    // Checking if vertical start and end are the same and horizontal range is in descending order
    else if (startX > endX && startY == endY) {
        vRange.push(startY);
        
        // pushing horizontal values in descending order
        for (var i = startX; i >= endX; i--) {
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
    // removing old table data if any so there's only one table per submit
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    var r1 = table.insertRow(0);  // creating first row
    var r2, newC; // adding blank cell
    
    // adding empty th tag to first cell
    var newTH = document.createElement("TH");
    document.getElementsByTagName("TR")[0].appendChild(newTH);
    
    for (var i = 0; i < hRange.length; i++) {  // Adding th elements with value of hRange to the table header
//        newC = r1.insertCell(-1);
//        newC.innerHTML = "<b>" + hRange[i] + "</b>";
        
        newTH = document.createElement("TH");
        newTH.innerHTML = "<b>" + hRange[i] + "</b>";
        document.getElementsByTagName("TR")[0].appendChild(newTH);
    }

    // creating remainging rows and adding values to the respective cells
    for (var v = 1; v <= vRange.length; v++) {
        r2 = table.insertRow(v);
        for (var h = 0; h <= hRange.length; h++) {
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
