import { Command, Flags } from '@oclif/core'
import * as k8s from '@kubernetes/client-node';
import execShell from '../kubernetes/exec_shell'

export default class ExecShell extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {}

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(ExecShell)
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    execShell(kc, "thimo", "test-pod", "dev-container")
  }
}
