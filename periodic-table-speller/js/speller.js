export default {
    check,
    lookup,
};

var elements;

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
    elements = await (await fetch('periodic-table.json')).json();
    for (let element of elements) {
        symbols[element.symbol.toLowerCase()] = element;
    }
}

function check(inputWord) {
    //do we have an input?
    if (inputWord.length > 0) {
        for (let element of elements) {
            let symbol = element.symbol.toLowerCase();
            if (symbol.length <= inputWord.length) {
                //did the symbol match the first 1 or 2 characters in 'inputWord'
                if (inputWord.slice(0, symbol.length) === symbol) {
                    //still have more characters left?
                    if (inputWord.length > symbol.length) {
                        let result = check(inputWord.slice(symbol.length));

                        //successful match??
                        if (result.length > 0) {
                            return [symbol, ...result];
                        }
                    } else {
                        return [symbol];
                    }
                }
            }
        }
    }

    return [];
}

function lookup(elementSymbol) {
    return symbols[elementSymbol];

    //return {};
}
