var buttons = " <div id='buttonparent'><button class='list play' onclick='playListButton(this)'></button> <button class='list edit' onclick='editListButton(this)'></button> <button class='list download' onclick='downloadListButton(this)'></button> <button class='list print' onclick='printListButton(this)'></button> <button class='list delete' onclick='deleteListButton(this)'></button></div>";

window.onload = createListsList;

function createListsList() {
	if(getLists().length > 0) {
		document.getElementById("lists").innerHTML = "<ul id='list-ul'>"+getLists().map(item => "<li id="+item.replace(/ /g, "_")+">"+item+buttons+"</li>").join("")+"</ul>";
	} else {
		document.getElementById("lists").innerHTML = "seems pretty empty in here! add a list by clicking the <strong style=\"color:white;\">+</strong> button...";
	}
}

function deleteListButton(el) {
	var listName = el.parentNode.parentNode.id.replace(/_/g, " ");
	if(confirm("are you sure you want to delete that list? you cannot undo this!"))
		deleteList(listName);
	createListsList();
}

function playListButton(el) {
	broadcastMessage("play:"+el.parentNode.parentNode.id.replace(/_/g, " "));
	location.href = "play.html";
}

function editListButton(el) {
	broadcastMessage("edit:"+el.parentNode.parentNode.id.replace(/_/g, " "));
	location.href = "create.html";
}

function printListButton(el) {
	var listName = el.parentNode.parentNode.id.replace(/_/g, " ");
	printList(listName);
}

function downloadListButton(el) {
	var listName = el.parentNode.parentNode.id.replace(/_/g, " ");
	var exportPath = require('path').join(require('os').homedir(), 'Desktop/'+listName+'.txt');
	fs.writeFileSync(exportPath, listToTxt(listName), 'utf8');
	alert("Your list has been downloaded to "+exportPath);
}

function uploadList(path) {
	writeList(require("path").basename(path), getListByPath(path));
	createListsList();
	alert("List succesfully uploaded.");
}

String.prototype.replaceLast = (k, v) => {
	return this.substring(0, this.lastIndexOf(k))+v+this.substring(this.lastIndexOf(k)+1);
};
