import { Command, Flags } from '@oclif/core'
import list from "../../kubernetes/get"

export default class GetPods extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: false })
  }

  static args = {}

  public async run(): Promise<void> {
    const { flags } = await this.parse(GetPods)
    const { name, namespace } = flags
    const res = await list(namespace)
    console.log(res)
  }
}
