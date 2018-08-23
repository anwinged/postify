function PropertyStorage(name) {
	parse = function (data) {
		var propertyData = data[name];
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
		var getting = browser.storage.local.get(name);
		return getting.then(parse);
	};

	this.set = function (value) {
		return browser.storage.local.set({ patterns: JSON.stringify(value) });
	};
}

PatternStorage = new PropertyStorage('patterns');
