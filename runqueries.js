"use strict";

var p4query = 'jobs -l -m10';
var p4user;
var p4workspace;

async function runOnload() {
    p4user = await p4vjs.getUser();
    p4workspace = await p4vjs.getClient();

    loadQueryResult(); 
}

function loadQueryResult() {
    p4vjs.p4(p4query).then(function(result) {
       var queryResultContainer = result.data;
		var nrOfRows = queryResultContainer.length;
		
		if(nrOfRows>0){
			// Create dynamic table.
			var table = document.createElement("table");
			
			// Retrieve column header 
			var col = []; // define an empty array
			for (var i = 0; i < nrOfRows; i++) {
				for (var key in queryResultContainer[i]) {
					if (col.indexOf(key) === -1) {
						col.push(key);
					}
				}
			}
			
			// Create table head 
			var tHead = document.createElement("thead");	
				
			
			// Create row for table head
			var hRow = document.createElement("tr");
			
			// Add column header to row of table head
			for (var i = 0; i < col.length; i++) {
					var th = document.createElement("th");
					th.innerHTML = col[i];
					hRow.appendChild(th);
			}
			tHead.appendChild(hRow);
			table.appendChild(tHead);
			
			// Create table body 
			var tBody = document.createElement("tbody");	
			
			// Add column header to row of table head
			for (var i = 0; i < nrOfRows; i++) {
			
					var bRow = document.createElement("tr"); // Create row for each item 
					
					for (var j = 0; j < col.length; j++) {
						var td = document.createElement("td");
						td.innerHTML = queryResultContainer[i][col[j]];
						bRow.appendChild(td);
					}
					tBody.appendChild(bRow)

			}
			table.appendChild(tBody);	
			
			// Finally add the newly created table with json data to a container
			var divContainer = document.getElementById("queryResultContainer");
			divContainer.innerHTML = "";
			divContainer.appendChild(table);
		}	
    });
}

function setQuery(selectedValue){
	var inputfield = document.getElementById("querytext");
    var qvalue = selectedValue;
    qvalue = qvalue.replace("$curr_user", p4user);
    qvalue = qvalue.replace("$curr_workspace", p4workspace);
    inputfield.value = qvalue;
    console.log(qvalue);
}
function executeQuery(){
	var inputfield = document.getElementById("querytext");
     p4query = inputfield.value;
     loadQueryResult();
	var divContainer = document.getElementById("queryResultContainer");
   divContainer.innerHTML = "No items retrieved";
}
