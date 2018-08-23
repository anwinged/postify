const PATTERN_ROW = (addr, pattern) => `
<tr>
	<td><input type="text" name="server" value="${addr}"></td>
  	<td><input type="text" name="pattern" value="${pattern}"></td>
</tr>
`;

function restoreOptions() {

	function parseJsonPatterns(jsonPatterns) {
		console.log('JSON PATTERNS', jsonPatterns);

		if (!jsonPatterns.patterns) {
			return [];
		}
		try {
			return JSON.parse(jsonPatterns.patterns);
		} catch (e) {
			return [];
		}
	}

	function defaultPatterns() {
		return [
			{server: '', pattern: '.*'},
		];
	}

	function setPatterns(jsonPatterns) {
		patterns = parseJsonPatterns(jsonPatterns);

		if (patterns.length === 0) {
			patterns = defaultPatterns();
		}

		console.log('PATTERNS', patterns);

		var html = '';

		patterns.forEach(item => {
			html += PATTERN_ROW(item.server, item.pattern);
		});

		document.querySelector(".js-pattern-rows").innerHTML = html;
	}

  	function onError(error) {
    	console.log(`Error: ${error}`);
  	}

	var getting = browser.storage.local.get("patterns");	
	getting.then(setPatterns, onError);
}

function saveOptions(evt) {
	evt.preventDefault();
	var patterns = [];
	var rows = document.querySelectorAll(".js-pattern-rows tr");
	rows.forEach(row => {
		var server = row.querySelector('[name="server"]').value;
		var pattern = row.querySelector('[name="pattern"]').value;
		patterns.push({server: server, pattern: pattern});
	});

	console.log('PATTERNS', patterns);

	browser.storage.local.set({ patterns: JSON.stringify(patterns) });
}

function addRow(evt) {
	evt.preventDefault();
	var html = document.querySelector(".js-pattern-rows").innerHTML;
	html += PATTERN_ROW('', '');
	document.querySelector(".js-pattern-rows").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector(".js-submit").addEventListener("click", saveOptions);
document.querySelector(".js-add").addEventListener("click", addRow);
