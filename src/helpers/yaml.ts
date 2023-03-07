import yaml from "js-yaml"
import fs from "fs/promises"
// import f from "lodash/fp"
import * as k8s from '@kubernetes/client-node';

export type YamlModifier = { path: string, value: string }

export async function loadKubeSpec(filePath: string): Promise<k8s.KubernetesObject> {
  const yamlString: string = await fs.readFile(filePath, "utf8")
  return yaml.load(yamlString)
}

export function modifyKubeSpec(modifiers: YamlModifier[], spec: k8s.KubernetesObject): k8s.KubernetesObject {
  // return f.reduce((acc: k8s.KubernetesObject, val: YamlModifier) => {
  //   const { path, value } = val
  //   return f.set(path, value, acc)
  // }, spec, modifiers)
  return spec
}

export async function loadAndModifyKubeSpec(modifiers: YamlModifier[], filePath: string): Promise<k8s.KubernetesObject> {
  return loadKubeSpec(filePath).then(spec => modifyKubeSpec(modifiers, spec))
}

// export async function dumpYaml(filePath: string): Promise<void> {

// }
