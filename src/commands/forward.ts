import { Command, Flags } from '@oclif/core';
import * as k8s from '@kubernetes/client-node';
import { forwardPort } from "../kubernetes/port_forward"

export default class Forward extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    image: Flags.string({ char: 'i', description: 'Container Image to use', required: true }),
    // commit: Flags.string({ char: "c", description: "Commit Hash" }),
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true })
  }

  static args = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Forward)
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    forwardPort(kc, "thimo", "test-pod", 8888)
  }
}
