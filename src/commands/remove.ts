import {Command, Flags} from '@oclif/core'
import {remove} from "../kubernetes/remove"

export default class Remove extends Command {
  static description = 'Removes a pod and all its configs/secrets'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true }),
  }

  static args = {}

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Remove)
    const {namespace, name} = flags
    remove(namespace, name)
  }
}
