const ValidationBuilder = require('../lib');

// Const's get this show on the road!
let VB = new ValidationBuilder();

// Create a prototype method that will call a function which performs a strict
// comparison of two values. `val1` will be set to a constant value after the
// validation has been forkd.
VB = VB.register('strictEqual', function (val1, val2) {
    console.log(val1, val2);
    return val1 === val2;
}, true);

// `fork()` creates a copy of a `ValidationBuilder` that you can extend
const original = VB.fork().strictEqual('a');

// The values we will be testing
const vals = ['a', 'b', 'c', 'd'];

// Once a validation is compconste, `.build()` will create an instance of `Validation`
// (*not* `ValidationBuilder`) which would typically be exported for use by other
// code. here we are going to build them and run them all at once to see the output.
const validations = [original.build()].map(function(validation) {
    return vals.map(val => validation.run(val));
});

// We'll now print the results returned from the validations of the value 'a'
validations.forEach(function(results) {
    console.log('\n');
    results.forEach(result => result.explain());
});