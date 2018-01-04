window.onload = () => {
	if(getMessage() && getMessage().startsWith("play:")) {
		queue = getList(getMessage().replace("play:", "")).rows;
		nextCard();
	} else {
		location.href = "index.html";
	}
};

window.addEventListener("keydown", keyPress, false);
window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);

var queue = [];
var currCards = [];
var isBusy = false;
var questionType = 0;

var dragStart = {
	"x": null,
	"y": null
};

var correct = 0;
var total = 0;


function nextCard() {
	if(queue.length < 1 && currCards.length < 1) {
		var mark = Math.round((correct/total*9+1)*10)/10;
		var markMsg = "";

		if(mark > 9.5) {
			markMsg = "perfect!";
		} else if(mark > 8) {
			markMsg = "you learnt really well!";
		} else if(mark > 6) {
			markMsg = "a couple of mistakes, good job!";
		} else if(mark >= 5.5) {
			markMsg = "barely a sufficient, learn better!";
		} else {
			markMsg = "you haven't learnt very well...";
		}

		document.getElementById("card-content").innerHTML = "your mark is a<br><strong style='font-size:5vw;'>"+mark+"</strong><br>"+markMsg;
		document.getElementById("card-footer").innerHTML = "press the top-right button to exit";
		isBusy = true;
		return;
	}

	isBusy = false;
	total++;

	while(currCards.length < 4 && queue.length > 0) {
		currCards.push(queue[0]);
		queue.shift();
	}

	document.getElementById("card-content").innerHTML = currCards[0][questionType < 2 ? questionType : Math.floor((Math.random() * 2) + 0)];
}

function flipCard() {
	if(isBusy) return;

	isBusy = true;
	document.getElementById("card").className = "flip";

	setTimeout(() => {
		isBusy = false;
		document.getElementById("card").className = "";

		if(document.getElementById("card-content").innerHTML == currCards[0][0]) {
			document.getElementById("card-content").innerHTML = currCards[0][1];
		} else {
			document.getElementById("card-content").innerHTML = currCards[0][0];
		}

	}, 745);
}

function swipeLeft() {
	if(isBusy) return;

	isBusy = true;
	document.getElementById("card").className = "swipeLeft";

	setTimeout(() => {
		document.getElementById("card").className = "";

		currCards.push(currCards[0]);
		currCards.shift();
		
		nextCard();
	}, 745);
}

function swipeRight() {
	if(isBusy) return;

	correct++;

	isBusy = true;
	document.getElementById("card").className = "swipeRight";

	setTimeout(() => {
		document.getElementById("card").className = "";

		currCards.shift();
		
		nextCard();
	}, 745);
}

function helpButton() {
	if(document.getElementById("help-menu").className == "toggled") {
		document.getElementById("help-menu").className = "";
	} else {
		document.getElementById("settings-menu").className = "";
		document.getElementById("help-menu").className = "toggled";
	}
}
function settingsButton() {
	if(document.getElementById("settings-menu").className == "toggled") {
		document.getElementById("settings-menu").className = "";
	} else {
		document.getElementById("help-menu").className = "";
		document.getElementById("settings-menu").className = "toggled";
	}
}
function changedSetting(el) {
	questionType = Array.from(el.parentElement.getElementsByTagName("input")).indexOf(el);
}

function keyPress(e) {
	var key = e.which;
	if(key == 39) {
		swipeRight();
	} else if(key == 37) {
		swipeLeft();
	} else if(key == 32) {
		flipCard();
	}
}

function mouseDown(e) {
	e.preventDefault();
	dragStart.x = e.clientX;
	dragStart.y = e.clientY;

	if(!e.target) return;
	if(!(e.target.id == "help-menu" || e.target.id == "settings-menu" || e.target.id == "settings-content")) {
		document.getElementById("help-menu").className = "";
		document.getElementById("settings-menu").className = "";	}
}

function mouseUp(e) {
	e.preventDefault();
	if(dragStart.x == null || dragStart.y == null) return;

	if(dragStart.x - e.clientX > 150) {
		swipeLeft();
	} else if(dragStart.x - e.clientX < -150) {
		swipeRight();
	} else if(dragStart.y - e.clientY > 50 || dragStart.y - e.clientY < -50) {
		flipCard();
	}
}