const PATTERN_ROW = (addr, pattern) => `
<tr>
    <td><input type="text" name="server" value="${addr}"></td>
    <td><input type="text" name="pattern" value="${pattern}"></td>
</tr>
`;

function defaultPatterns() {
    return [
        { server: '', pattern: '.*' },
    ];
}

function setPatterns(patterns) {
    if (!patterns || patterns.length === 0) {
        patterns = defaultPatterns();
    }

    console.log('PATTERNS', patterns);

    var reducer = (acc, item) => acc + PATTERN_ROW(item.server, item.pattern);

    var html = patterns.reduce(reducer, '');

    document.querySelector(".js-pattern-rows").innerHTML = html;
}

function restoreOptions() {
    PatternStorage.get().then(
        setPatterns,
        (error) => {
            console.log(`Error: ${error}`)
        }
    );
}

function saveOptions(evt) {
    evt.preventDefault();
    var patterns = [];
    var rows = document.querySelectorAll(".js-pattern-rows tr");
    rows.forEach(row => {
        var server = row.querySelector('[name="server"]').value;
        var pattern = row.querySelector('[name="pattern"]').value;
        if (server) {
            patterns.push({server: server, pattern: pattern});
        }
    });

    PatternStorage.set(patterns);
}

function addRow(evt) {
    evt.preventDefault();
    var el = document.querySelector(".js-pattern-rows");
    el.innerHTML += PATTERN_ROW('', '');
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector(".js-submit").addEventListener("click", saveOptions);
document.querySelector(".js-add").addEventListener("click", addRow);
