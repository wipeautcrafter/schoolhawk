window.onload = () => {
	if(getMessage() && getMessage().startsWith("edit:")) {
		appendListToTable(getMessage().replace("edit:", ""));
		deleteMessage();
	} else {
		for(var a = 0; a < 5; a++) createRow();
	}
};

String.prototype.contains = function(query) {
	return this.indexOf(query) != -1;
}

function appendListToTable(name) {
	document.getElementById("list-name-input").value = name;
	document.getElementsByTagName("tbody")[0].innerHTML = "";

	var listValues = getList(name).rows;
	listValues.forEach(lv => {
		createRow(lv[0], lv[1]);
	});

	if(listValues.length < 5) {
		for(var a = listValues.length; a < 5; a++) createRow();
	}
}

function createRow(val1, val2) {
	var tbody = document.getElementsByTagName("tbody")[0];
	
	var newRow = tbody.insertRow(tbody.rows.length);

	var newCell1 = newRow.insertCell(0);
	var newCell2 = newRow.insertCell(1);

	var newInput1 = document.createElement("INPUT");
	newInput1.setAttribute("type", "text");
	if(val1) newInput1.setAttribute("value", val1);

	var newInput2 = document.createElement("INPUT");
	newInput2.setAttribute("type", "text");
	if(val2) newInput2.setAttribute("value", val2);

	newCell1.appendChild(newInput1);
	newCell2.appendChild(newInput2);

	newInput1.focus();
}

function getTableValues() {
	var tbody = document.getElementsByTagName("tbody")[0];
	var output = [];

	Array.from(tbody.rows).forEach(row => {
		var currArrRow = [];
		Array.from(row.childNodes).forEach(cn => {
			if(cn.childNodes.length > 0) {
				currArrRow.push(cn.childNodes[0].value);
            }
		});
		output.push(currArrRow);
	});

	output = output.filter((arr) => {
		return !(arr[0] == "" && arr[1] == "");
	});

	console.log(output);

	return output;
}

function createTable() {
	var listTitle = document.getElementById("list-name-input");

	if(listTitle.value.contains(".list") || listTitle.value.contains("_")) {
		listTitle.value = listTitle.value.replace(/_/g, " ").replace(/\.list/, "");
		alert("The list title can't contain .list or _!");
	} else if(getTableValues().length < 1) {
		alert("You cannot create an empty list!");
	} else {
		var parsedJSON = {"rows": getTableValues()};
		writeList(listTitle.value, JSON.stringify(parsedJSON));
		appendListToTable(listTitle.value);
	}
}