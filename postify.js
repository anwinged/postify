console.log('Load!');

function onGot(tabInfo) {
	var tab = tabInfo[0];
	var url = tab.url;
  	console.log(url);
}

function onError(error) {
	console.log(`Error: ${error}`);
}

function sendCurrentUrl() {
	browser.tabs.query({currentWindow: true, active: true}).then(onGot, onError);
}

browser.browserAction.onClicked.addListener(sendCurrentUrl);
