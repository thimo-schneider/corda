import { Command, Flags, Args } from '@oclif/core'
import * as k8s from '@kubernetes/client-node';
import { deployPod } from "../../kubernetes/deploy"

export default class Deploy extends Command {
  static description = 'Deploys or patches a single Pod'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    image: Flags.string({ char: 'i', description: 'Container Image to use', required: true }),
    // commit: Flags.string({ char: "c", description: "Commit Hash" }),
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true })
  }

  // static args = { image: Args.string(), commit: Args.string() }
  static args = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Deploy)
    const { namespace, name, image } = flags
    const res: k8s.KubernetesObject = deployPod(namespace, name, image)
  }
}
