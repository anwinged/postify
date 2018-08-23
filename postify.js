const APP_NAME = 'Postify';

function sendUrl(url) {
    // browser.notifications.create({
    //     "type": "basic",
    //     "iconUrl": browser.extension.getURL("icons/postify-48.png"),
    //     "title": APP_NAME,
    //     "message": url,
    // });

    function sendUrlToServers(patterns) {
        patterns.forEach(item => {
            var regex = new RegExp(item.pattern || '.*', 'i');
            if (regex.test(url) && item.server) {
                console.log('SEND', url, 'TO', item.server);
                sendUrlToServer(url, item.server);
            }
        });
    }

    var patterns = PatternStorage.get().then(sendUrlToServers);
}

function sendUrlToServer(url, addr) {
    fetch(addr, {
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
