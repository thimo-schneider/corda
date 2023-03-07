import * as k8s from '@kubernetes/client-node';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { promisify } from 'util';

/**
 * Replicate the functionality of `kubectl apply`.  That is, create the resources defined in the `specFile` if they do
 * not exist, patch them if they do exist.
 *
 * @param specPath File system path to a YAML Kubernetes spec.
 * @return Array of resources created
 */
export default async function apply(spec: k8s.KubernetesObject): Promise<k8s.KubernetesObject> {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const client = k8s.KubernetesObjectApi.makeApiClient(kc);
  // const fsReadFileP = promisify(fs.readFile);
  // const specString = await fsReadFileP(specPath, 'utf8');
  // const specs: k8s.KubernetesObject[] = yaml.loadAll(specString);
  // const validSpecs = specs.filter((s) => s && s.kind && s.metadata);
  // const created: k8s.KubernetesObject = {};
  // for (const spec of validSpecs) {
  spec.metadata = spec.metadata || {};
  spec.metadata.annotations = spec.metadata.annotations || {};
  delete spec.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'];
  spec.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'] = JSON.stringify(spec);
  try {
    // try to get the resource, if it does not exist an error will be thrown and we will end up in the catch
    // block.
    await client.read({ ...spec, metadata: { name: spec.metadata.name, namespace: spec.metadata.namespace } });
    const response = await client.patch(spec);
    // created.push(response.body);
    return response.body
  } catch (e) {
    // we did not get the resource, so it does not exist, so create it
    const response = await client.create(spec);
    // created.push(response.body);
    return response.body
  }
  // }
  // return created;
}
// apply("/home/thimo/Masterarbeit/edger_dgea/test-pod.yml").then(res => console.log(res)).catch(err => console.log(err))
