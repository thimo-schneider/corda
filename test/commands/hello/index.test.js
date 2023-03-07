"use strict";
exports.__esModule = true;
var test_1 = require("@oclif/test");
describe('hello', function () {
    test_1.test
        .stdout()
        .command(['hello', 'friend', '--from=oclif'])
        .it('runs hello cmd', function (ctx) {
        (0, test_1.expect)(ctx.stdout).to.contain('hello friend from oclif!');
    });
});
