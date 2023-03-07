"use strict";
exports.__esModule = true;
var test_1 = require("@oclif/test");
describe('hello world', function () {
    test_1.test
        .stdout()
        .command(['hello:world'])
        .it('runs hello world cmd', function (ctx) {
        (0, test_1.expect)(ctx.stdout).to.contain('hello world!');
    });
});
