import {expect, test} from '@oclif/test'

describe('delete:pod', () => {
  test
  .stdout()
  .command(['delete:pod'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['delete:pod', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
