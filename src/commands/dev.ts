import {Command, Flags} from '@oclif/core'
import {runReproducibly} from "../kubernetes/runReproducibly"

export default class Dev extends Command {
  static description = 'Starts a container in Development Mode'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true }),
    workflow_descriptor: Flags.string({ char: "d", description: "Workflow descriptor", required: true }),
    irods_auth: Flags.string({ char: "a", description: "irods password", required: true }),
    git_token: Flags.string({ char: "t", description: "git authentication token", required: true })
  }

  static args = {}

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Dev)

    const { workflow_descriptor, namespace, name, irods_auth, git_token} = flags
    runReproducibly(namespace, name, workflow_descriptor, irods_auth, git_token, "DEVELOPMENT")
  }
}
