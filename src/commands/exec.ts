import { Command, Flags } from '@oclif/core'
import * as k8s from '@kubernetes/client-node';
import execShell from '../kubernetes/exec_shell'

export default class ExecShell extends Command {
  static description = 'Executes command in Pod'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true }),
    container_name: Flags.string({ char: "c", description: "Name of Container", required: true })
  }

  static args = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(ExecShell)
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    execShell(kc, namespace, name, container_name)
  }
}
