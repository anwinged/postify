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

    const reducer = (acc, item) => acc + PATTERN_ROW(item.server, item.pattern);

    const html = patterns.reduce(reducer, '');

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

function parseForm() {
    const formData = [];
    const rows = document.querySelectorAll(".js-pattern-rows tr");
    rows.forEach(row => {
        var server = row.querySelector('[name="server"]').value;
        var pattern = row.querySelector('[name="pattern"]').value;
        formData.push({server: server, pattern: pattern});
    });    
    return formData;
}

function saveOptions(evt) {
    evt.preventDefault();
    const formData = parseForm();
    const filter = item => item.server;
    const patterns = formData.filter(filter);
    PatternStorage.set(patterns);
}

function addRow(evt) {
    evt.preventDefault();
    const el = document.querySelector(".js-pattern-rows");
    el.innerHTML += PATTERN_ROW('', '');
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector(".js-submit").addEventListener("click", saveOptions);
document.querySelector(".js-add").addEventListener("click", addRow);
