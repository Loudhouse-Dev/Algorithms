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

function findCandidates(inputWord) {
    let oneLetterSymbols = [];
    let twoLetterSymbols = [];

    for (let i = 0; i < inputWord.length; i++) {
        //collect 1-letter candidates
        if (
            inputWord[i] in symbols &&
            !oneLetterSymbols.includes(inputWord[i])
        ) {
            oneLetterSymbols.push(inputWord[i]);
        }
        //collect twoo-letter candidates
        if (i <= inputWord.length - 2) {
            let two = inputWord.slice(i, i + 2);
            if (two in symbols && !twoLetterSymbols.includes(two)) {
                twoLetterSymbols.push(two);
            }
        }
    }
    return [...twoLetterSymbols, ...oneLetterSymbols];
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
