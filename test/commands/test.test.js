"use strict";
exports.__esModule = true;
var test_1 = require("@oclif/test");
describe('test', function () {
    test_1.test
        .stdout()
        .command(['test'])
        .it('runs hello', function (ctx) {
        (0, test_1.expect)(ctx.stdout).to.contain('hello world');
    });
    test_1.test
        .stdout()
        .command(['test', '--name', 'jeff'])
        .it('runs hello --name jeff', function (ctx) {
        (0, test_1.expect)(ctx.stdout).to.contain('hello jeff');
    });
});
