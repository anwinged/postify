function PropertyStorage(name) {
    const parse = function (data) {
        const propertyData = data[name];
        if (!propertyData) {
            return null;
        }
        try {
            return JSON.parse(propertyData);
        } catch (e) {
            return null;
        }
    };

    this.get = function () {
        const getting = browser.storage.local.get(name);
        return getting.then(parse);
    };

    this.set = function (value) {
        return browser.storage.local.set({ patterns: JSON.stringify(value) });
    };
}

PatternStorage = new PropertyStorage('patterns');
