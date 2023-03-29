import * as k8s from '@kubernetes/client-node';
import fs from "fs/promises"
import { loadAndModifyKubeSpec } from '../helpers/yaml';
import apply from "./apply";
import constants from "../constants"
const { REPRODUCIBLE_POD_TEMPLATE_FILE_PATH,WORKFLOW_DESCRIPTOR_CONFIG_MAP_TEMPLATE_FILE_PATH,IRODS_PASSWORD_SECRET_TEMPLATE_FILE_PATH  } = constants

export async function runReproducibly(namespace: string, name: string, workflowDescriptorPath: string, irodsPassword: string): Promise<k8s.KubernetesObject> {
  const configMapName = name + "-config-map"
  const irodsPasswordSecretName = "irods-password"
  const workflowDescriptorString = await fs.readFile(workflowDescriptorPath, "utf8")
  const workflowDescriptor = JSON.parse(workflowDescriptorString)
  const {image} = workflowDescriptor  
  const baseModifiers = [
    { path: "metadata.namespace", value: namespace },
  ]
  const podModifiers = baseModifiers.concat([
    {path: "metadata.name", value: name},
    {path: "spec.containers[0].image", value: image},
    {path: "spec.volumes[0].configMap.name", value: configMapName},
  ])
  const workflowDescriptorModifiers = baseModifiers.concat([
    {path: "metadata.name", value: configMapName},
    {path: ["data", "workflow_descriptor.json"], value: workflowDescriptorString}
  ])
  const irodsAuthModifiers = baseModifiers.concat([
    {path: "metadata.name", value: irodsPasswordSecretName},
    {path: ["data", "irods-password"], value: Buffer.from(irodsPassword).toString('base64')}
  ])

  const podSpec = await loadAndModifyKubeSpec(podModifiers, REPRODUCIBLE_POD_TEMPLATE_FILE_PATH)
  const workflowDescriptorConfigMapSpec = await loadAndModifyKubeSpec(workflowDescriptorModifiers, WORKFLOW_DESCRIPTOR_CONFIG_MAP_TEMPLATE_FILE_PATH)
  const irodsPasswordSecretSpec = await loadAndModifyKubeSpec(irodsAuthModifiers, IRODS_PASSWORD_SECRET_TEMPLATE_FILE_PATH)

  const irodsAuthResult = await apply(irodsPasswordSecretSpec)
  const workflowDescriptorResult = await apply(workflowDescriptorConfigMapSpec)
  const podResult: k8s.KubernetesObject = await apply(podSpec)

  return podResult
}

