import * as k8s from '@kubernetes/client-node';

export default async function deleteBySpec(spec: k8s.KubernetesObject): Promise<void> {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const client = k8s.KubernetesObjectApi.makeApiClient(kc);
  client.delete(spec)
}
