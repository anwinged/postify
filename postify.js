const APP_NAME = 'Postify';
const SERVER_ADDR = 'http://127.0.0.1:9999';

function sendUrl(url) {
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/postify-48.png"),
        "title": APP_NAME,
        "message": url,
    });

    fetch(SERVER_ADDR, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url
        })
    });
}

function sendCurrentUrl(args) {
    if (args.url) {
        sendUrl(args.url)
    }
}

browser.browserAction.onClicked.addListener(sendCurrentUrl);
