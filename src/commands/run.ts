import { Command, Flags } from '@oclif/core'
import {runReproducibly} from "../kubernetes/runReproducibly"

export default class Run extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]


  static flags = {
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true }),
    workflow_descriptor: Flags.string({ char: "d", description: "workflow descriptor", required: true }),
    irods_auth: Flags.string({ char: "a", description: "irods authentication file", required: true }),
    git_token: Flags.string({ char: "t", description: "git authentication token", required: true })
  }

  // static args = [{ name: 'file' }]
  static args = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Run)
    // const { namespace, name, image, commit } = flags
    const { workflow_descriptor, namespace, name, irods_auth, git_token} = flags
    runReproducibly(namespace, name, workflow_descriptor, irods_auth, git_token)
  }
}
