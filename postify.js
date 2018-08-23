const APP_NAME = 'Postify';

function sendUrlToServer(url, addr) {
    return fetch(addr, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url,
        }),
    });
}

function showNotification(url, addr) {
    console.log('NOTIFY', url, addr);

    var id = Math.random().toString(36).substr(2);

    browser.notifications.create(id, {
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/postify-48.png"),
        "title": APP_NAME,
        "message": `Sent "${url}" to ${addr}.`,
    });

    var close = function () {
        browser.notifications.clear(id);
    }

    setTimeout(close, 2000);
}

function sendUrlToServers(url, patterns) {
    patterns.forEach(item => {
        var regex = new RegExp(item.pattern || '.*', 'i');
        if (regex.test(url) && item.server) {
            sendUrlToServer(url, item.server).then(
                () => showNotification(url, item.server),
                (e) => console.log('SEND ERROR', e)
            );
        }
    });
}

function sendUrl(url) {
    PatternStorage.get().then(patterns => {
        sendUrlToServers(url, patterns);
    });
}

function sendCurrentUrl(args) {
    if (args.url) {
        sendUrl(args.url)
    }
}

browser.browserAction.onClicked.addListener(sendCurrentUrl);
