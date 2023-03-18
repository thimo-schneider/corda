import {expect, test} from '@oclif/test'

describe('get:pods', () => {
  test
  .stdout()
  .command(['get:pods'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['get:pods', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
