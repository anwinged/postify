const APP_NAME = 'Postify';

function sendUrl(url) {
	browser.notifications.create({
    	"type": "basic",
    	"iconUrl": browser.extension.getURL("icons/postify-48.png"),
    	"title": APP_NAME,
    	"message": url,
	});
}

function sendCurrentUrl(args) {
	if (args.url) {
		sendUrl(args.url)
	}
}

browser.browserAction.onClicked.addListener(sendCurrentUrl);
