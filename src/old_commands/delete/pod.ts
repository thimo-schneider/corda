import { Command, Flags } from '@oclif/core'
import { createPodSpec } from "../../helpers/yaml"
import deleteBySpec from "../../kubernetes/delete"
import constants from "../../constants"
const { POD_TEMPLATE_FILE_PATH } = constants

export default class DeletePod extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    namespace: Flags.string({ char: "s", description: "Namespace", required: true }),
    name: Flags.string({ char: "n", description: "Name of Pod", required: true })
  }

  static args = {}

  public async run(): Promise<void> {
    const { flags } = await this.parse(DeletePod)
    const { namespace, name } = flags;
    const specToDelete = await createPodSpec(namespace, name, "", POD_TEMPLATE_FILE_PATH)
    console.log("delete")
    deleteBySpec(specToDelete)
  }
}
