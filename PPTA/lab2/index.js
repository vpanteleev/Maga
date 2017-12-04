//Panteleev Data
//
///dot -Tpng fsm.gv -o panteleev.png
//
let terminals = ['0', '1'];
let nonTerminals = ['S','C','D', 'N'];
let nonTerminalForIntersection = ['C','D', 'N'];

let normalizedNonTerminals = ['S','C','D', 'N'];

let grammar = [
    'S->1C|0D',
    'C->0D|0S|1',
    'D->1C|1S|0',
];


// // !!!TEST!!!
// let terminals = ['a', 'b'];
// let nonTerminals = ['S','A','B', 'N'];
// let nonTerminalForIntersection = ['A','B','N'];
//
// let normalizedNonTerminals = ['S','A','B', 'N'];
//
// let grammar = [
//     'S->aB|aA',
//     'B->bB|a',
//     'A->aA|b',
// ];

let nonTerminalRegExp = new RegExp(nonTerminals.join("|"));
let terminalRegExp = new RegExp(terminals.join("|"));

let getRandomLetter = () => {
    let letter = Math.random().toString(36).substr(2, 1).toUpperCase();
    while(normalizedNonTerminals.includes(letter)) {
        letter = Math.random().toString(36).substr(2, 1).toUpperCase();
    }

    return letter;
};

const powerset = (array) => { // O(2^n)
	const results = [[]];
	for (const value of array) {
		const copy = [...results]; // See note below.
		for (const prefix of copy) {
			results.push(prefix.concat(value));
		}
	}
	return results;
};

var sortAlphabets = function(text) {
    return text.split('').sort().join('');
};

function addNRule(expression){
    if (!nonTerminalRegExp.test(expression)) {
        return expression + 'N';
    }

    return expression;
}

let parsedGrammar = {N: {}};

//Added new epmty N state
terminals.forEach((terminal) => {
    parsedGrammar.N[terminal] = '';
})

grammar.forEach(rule => {
    let parsedExpressions = {};

    let [nonTerminal, expressions] = rule.split('->');
    expressions = expressions.split('|').map(addNRule);

    terminals.forEach(terminal => {
        parsedExpressions[terminal] = sortAlphabets(expressions
            .filter((expression) => { //group by terminals
                return expression.includes(terminal);
            }).map(expression =>    //remove terminals
                expression.replace(terminalRegExp, ''))
            .join(''));
    })

    parsedGrammar[nonTerminal] = parsedExpressions;
})

console.log("Nondeterminate Graph\n");
console.log(parsedGrammar);

let determinateStates = powerset(nonTerminalForIntersection)
    .filter(a => a.length > 0 && a.length <= 2);

let determinateGraph = {};

determinateStates.forEach(state => {
    let stateObjects = state.map(stateName => parsedGrammar[stateName]);
    let result = {};
    terminals.forEach((terminal) => {
        let mappedResult = stateObjects.map(s => s[terminal]);
        result[terminal] = sortAlphabets(mappedResult.join(''));
    })

    determinateGraph[sortAlphabets(state.join(''))] = result;
})

determinateGraph.S = parsedGrammar.S;

console.log("Determinate Graph\n");
console.log(determinateGraph);


let allStates = Object.keys(determinateGraph);

allStates = allStates
    .concat(...Object.values(determinateGraph).map(Object.values))
    .filter(state => state.length > 1);

allStates = [...new Set(allStates)];

let aliases = {};

allStates.forEach(state => {
    let alias =  getRandomLetter();
    normalizedNonTerminals.push(alias)
    aliases[state] = alias;
})

console.log('Aliases \n');
console.log(aliases);

let normalizedGraph = {};

Object.keys(determinateGraph).forEach(key => {
    let newKey = aliases[key] || key;
    let newValues = determinateGraph[key];
    Object.keys(newValues).forEach(k => {
        let oldValue = newValues[k];
        let newValue = aliases[oldValue] || oldValue;

        newValues[k] = newValue;
    })
    normalizedGraph[newKey] = determinateGraph[key];
})

console.log("Normalized Graph\n");
console.log(normalizedGraph);

// q1 -> S  [ label = "a" ];
Object.keys(normalizedGraph).forEach(state => {
    let transfers = normalizedGraph[state] || {};
    terminals.forEach(terminal => {
        if(state && transfers[terminal] && terminal) {
            console.log(`${state} -> ${transfers[terminal]}  [ label = "${terminal}" ];`);
        }
    })
});


//Remove non do
