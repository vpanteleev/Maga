
let regularRight = /^[A-Z]*->[a-z]+[A-Z]$/;
let regularLeft = /^[A-Z]*->[A-Z][a-z]+$/;
let contextFree = /^[A-Z]*->[A-Za-z]*/;
let contextSensetive = /^[a-zA-Z]*->[A-Za-z]*/;

function checkType(rule) {
    if((rule.match(regularRight) || [])[0] === rule) {
        return "Regular Right"
    }

    if((rule.match(regularLeft) || [])[0] === rule) {
        return "Regular Left"
    }

    if((rule.match(contextFree) || [])[0] === rule) {
        return "Context-free"
    }

    if((rule.match(contextSensetive) || [])[0] === rule) {
        return "Context-sensitive"
    }

    return "Recursively enumerable"
}

let myRules = [
    'b->aD',
    'bC->bc',
    'Vd->sdS',
    'Cb->CZ',
]

let testRules = [
    'Q->cSc',
    'A->Xa',
    'C->cC',
    'Ad->Ddc',
]

let myResult = myRules.map(checkType)

console.log('myResult \n', myResult);

let testResult = testRules.map(checkType)

console.log('testResult \n', testResult);
