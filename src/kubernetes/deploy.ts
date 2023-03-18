import * as k8s from '@kubernetes/client-node';
import { loadAndModifyKubeSpec } from '../helpers/yaml';
import apply from "./apply";
import constants from "../constants"
const { POD_TEMPLATE_FILE_PATH } = constants

export async function deployPod(namespace: string, name: string, image: string): Promise<k8s.KubernetesObject> {
  const modifiers = [{ path: "metadata.namespace", value: namespace }, {
    path: "metadata.name", value: name
  }, {
    path: "spec.containers[0].image", value: image
  }]
  const spec = await loadAndModifyKubeSpec(modifiers, POD_TEMPLATE_FILE_PATH)
  const result: k8s.KubernetesObject = await apply(spec)
  return result
}

