import { Command, Flags, Args } from '@oclif/core'
import login from "../../auth/auth"

export default class AuthTest extends Command {
  static description = 'Super duper command description'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  }

  // static args = { name: Args.string() }

  public async run(): Promise<void> {
    // const { flags } = await this.parse(AuthTest)

    // const name = flags.name ?? 'world'
    // login()
    // if (args.name && flags.force) {
    //   this.log(`you input --force and --file: ${args.name}`)
    // }
  }
}
