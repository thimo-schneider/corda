import { Command, Flags, Args } from '@oclif/core'
// import * as k8s from '@kubernetes/client-node';
// import {deployPod} from "../../kubernetes/deploy.ts"

export default class Deploy extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    image: Flags.string({ char: 'i', description: 'Container Image to use' , required: true}),
    // flag with no value (-f, --force)
    commit: Flags.string({ char: "c", description: "Commit Hash" }),
    namespace: Flags.string({char: "ns", description: "Namespace", required: true}),
    name: Flags.string({char: "n", description: "Name of Pod", required: true})
    // force: Flags.boolean({ char: 'f' }),
  }

  // static args = { image: Args.string(), commit: Args.string() }
  static args = { pod: Args.boolean() }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Deploy)
    console.log(args)
    // const flags

    // const name = flags.name ?? 'world'
    console.log(flags)
    console.log("aaaaaaaa")
    console.log("bbbbbbbbbbb")
    console.log("cccccccccccc")
    // const res: k8s.KubernetesObject = deployPod()

    // this.log(`hello ${name} from /home/thimo/Masterarbeit/kubernetes-client/kubernetes-client/src/commands/deploy.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
