const { Parser } = require("../src/Parser");
const assert = require("assert");

const tests = [
    
];

/**
 * For manual tests
 */
function exec() {
    const program = `
    
    `;

    const ast = parser.parse(program);

    console.log(JSON.stringify(ast,null,2));
}

/**
 * Test function
 */
function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}

tests.forEach(testRun => testRun(test));

console.log('All assertions passed!');