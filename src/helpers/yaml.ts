import yaml from "js-yaml"
import fs from "fs/promises"
import f from "lodash/fp"
import * as k8s from '@kubernetes/client-node';
import path from "path"

export type YamlModifier = { path: string, value: string }

export async function loadKubeSpec(filePath: string): Promise<k8s.KubernetesObject> {
  const yamlString: string = await fs.readFile(filePath, "utf8")
  return yaml.load(yamlString)
}

export function modifyKubeSpec(modifiers: YamlModifier[], spec: k8s.KubernetesObject): k8s.KubernetesObject {
  return f.reduce((acc: k8s.KubernetesObject, val: YamlModifier) => {
    const { path, value } = val
    const res = f.set(path, value, acc)
    return res
  }, spec, modifiers)
}

export async function loadAndModifyKubeSpec(modifiers: YamlModifier[], absFilePath: string): Promise<k8s.KubernetesObject> {
  // const absFilePath = path.join(__dirname, filePath)
  return loadKubeSpec(absFilePath).then(spec => modifyKubeSpec(modifiers, spec))
}

export async function createPodSpec(namespace: string, name: string, containerImage: string, templateFilePath: string): Promise<k8s.KubernetesObject> {
  const modifiers = [{ path: "metadata.namespace", value: namespace }, {
    path: "metadata.name", value: name
  }, {
    path: "spec.containers[0].image", value: containerImage
  }]
  return loadAndModifyKubeSpec(modifiers, templateFilePath)
}
