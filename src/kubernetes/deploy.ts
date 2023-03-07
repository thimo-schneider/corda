import * as k8s from '@kubernetes/client-node';
import { loadAndModifyKubeSpec } from '../helpers/yaml';
import apply from "./apply";

export async function deployPod(namespace: string, name: string, image: string): Promise<k8s.KubernetesObject> {
  const modifiers = [{ path: "metadata.namespace", value: namespace }, {
    path: "metadata.namespace", value: name
  }, {
    path: "spec.containers.image", value: image
  }]
  const spec = await loadAndModifyKubeSpec(modifiers, "../templates/kubernetes/pod.yml")
  const result = await apply(spec)
  console.log(result)
  return result
}
