"use strict";
exports.__esModule = true;
var test_1 = require("@oclif/test");
describe('auth', function () {
    test_1.test
        .stdout()
        .command(['auth'])
        .it('runs hello', function (ctx) {
        (0, test_1.expect)(ctx.stdout).to.contain('hello world');
    });
    test_1.test
        .stdout()
        .command(['auth', '--name', 'jeff'])
        .it('runs hello --name jeff', function (ctx) {
        (0, test_1.expect)(ctx.stdout).to.contain('hello jeff');
    });
});
