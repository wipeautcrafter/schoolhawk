var fs = require('fs');
var path = require('path');

const {remote} = require('electron'); 

// konami code easteregg
var konamiIndex = 0;
var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener("keydown", function (e) {
	if(konami[konamiIndex] == e.which) konamiIndex++;
	else konamiIndex = 0;

	if(konamiIndex > konami.length-1) {
		alert("You have entered the konami code succesfully!");
		remote.getCurrentWindow().toggleDevTools();
		konamiIndex = 0;
	}
});

// event handler functions
function broadcastMessage(message) {
	return fs.writeFileSync("./src/message.msg", message, 'utf8');
}

function getMessage() {
	try {
		if(fs.readFileSync("./src/message.msg").length > 0)
			return fs.readFileSync("./src/message.msg").toString();
		else return false;
	} catch(err) {
		return null;
	}
}

function deleteMessage() {
	return fs.unlinkSync("./src/message.msg");
}

function getLists(callback) {
	if(fs.readdirSync("./src/lists").length < 1) return [];
	return fs.readdirSync("./src/lists").join(",").replace(/\.list/g, "").split(",");
}

function getList(name) {
	return JSON.parse(fs.readFileSync("./src/lists/"+name+".list").toString());
}

function writeList(name, json) {
	return fs.writeFileSync("./src/lists/"+name+".list", json, 'utf8');
}

function deleteList(name) {
	return fs.unlinkSync("./src/lists/"+name+".list");
}

function listToTxt(name) {
	var rows = getList(name).rows;
	var maxWordLength = 0;

	rows.forEach(r => {
		if(r[0].length+4 > maxWordLength) maxWordLength = r[0].length+4;
	});

	return rows.map(r => {
		var left = r[0];
		for(var s = left.length; s < maxWordLength; s++) left += " ";
		return left+r[1];
	}).join("\r\n");
}

function printList(name) {
	var child_process = require('child_process');
	var listTxt = listToTxt(name);

	fs.writeFileSync("./src/printList.txt", "\r\n"+name+" - SchoolHawk\r\n\r\n"+listTxt, 'utf8');

	child_process.exec("src\\print.bat \"src\\printList.txt\"");
}