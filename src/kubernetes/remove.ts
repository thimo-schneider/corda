import * as k8s from '@kubernetes/client-node';
import constants from "../constants";
import deleteBySpec from "./delete";
import { loadAndModifyKubeSpec } from '../helpers/yaml';
const { REPRODUCIBLE_POD_TEMPLATE_FILE_PATH,WORKFLOW_DESCRIPTOR_CONFIG_MAP_TEMPLATE_FILE_PATH,IRODS_PASSWORD_SECRET_TEMPLATE_FILE_PATH,GIT_PASSWORD_SECRET_TEMPLATE_FILE_PATH  } = constants

export async function remove(namespace: string, name: string): Promise<k8s.KubernetesObject> {
  const configMapName = name + "-config-map"
  const irodsPasswordSecretName = "irods-password"
  const gitPasswordSecretName = name + "-git-password"

  const baseModifiers = [
    { path: "metadata.namespace", value: namespace },
  ]
  const podModifiers = baseModifiers.concat([
    {path: "metadata.name", value: name},
    {path: "spec.volumes[0].configMap.name", value: configMapName},
  ])
  const workflowDescriptorModifiers = baseModifiers.concat([
    {path: "metadata.name", value: configMapName},
  ])
  const irodsAuthModifiers = baseModifiers.concat([
    {path: "metadata.name", value: irodsPasswordSecretName},
  ])
  const gitPasswordModifiers = baseModifiers.concat([
    {path: "metadata.name", value: gitPasswordSecretName},
  ])

  const podSpec = await loadAndModifyKubeSpec(podModifiers, REPRODUCIBLE_POD_TEMPLATE_FILE_PATH)
  const workflowDescriptorConfigMapSpec = await loadAndModifyKubeSpec(workflowDescriptorModifiers, WORKFLOW_DESCRIPTOR_CONFIG_MAP_TEMPLATE_FILE_PATH)
  const irodsPasswordSecretSpec = await loadAndModifyKubeSpec(irodsAuthModifiers, IRODS_PASSWORD_SECRET_TEMPLATE_FILE_PATH)
  const gitPasswordSecretSpec = await loadAndModifyKubeSpec(gitPasswordModifiers, GIT_PASSWORD_SECRET_TEMPLATE_FILE_PATH)

  const gitPasswordResult = await deleteBySpec(gitPasswordSecretSpec).catch()
  const irodsAuthResult = await deleteBySpec(irodsPasswordSecretSpec).catch()
  const workflowDescriptorResult = await deleteBySpec(workflowDescriptorConfigMapSpec).catch()
  const podResult: k8s.KubernetesObject = await deleteBySpec(podSpec).catch()
}
