import {expect, test} from '@oclif/test'

describe('exec-shell', () => {
  test
  .stdout()
  .command(['exec-shell'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['exec-shell', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
