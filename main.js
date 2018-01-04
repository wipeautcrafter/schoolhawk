const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

var mainWindow = null;

function createWindow() {
	try {
		fs.unlinkSync("src/message.msg");
	} catch(err) {}
	
	mainWindow = new BrowserWindow({icon:'./src/img/favicon.png'});

	// comment the next line for debug mode
	mainWindow.setMenu(null);

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'src/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if(!mainWindow) createWindow();
	else mainWindow.show();
});