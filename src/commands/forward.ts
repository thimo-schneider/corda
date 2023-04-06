import { Command, Flags } from '@oclif/core';
import * as k8s from '@kubernetes/client-node';
import { forwardPort } from "../kubernetes/port_forward"

export default class Forward extends Command {
  static description = 'Forwards jupyterlab to localhost'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true })
  }

  static args = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Forward)
    const {namespace, name} = flags
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    forwardPort(kc, namespace, name, 8888)
  }
}
