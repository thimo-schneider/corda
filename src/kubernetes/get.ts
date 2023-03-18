import * as k8s from '@kubernetes/client-node';

export default async function list(namespace: string, ressourceType: string = "Pod", name?: string): Promise<string[]> {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const client = k8s.KubernetesObjectApi.makeApiClient(kc);
  const res = await client.list("v1", ressourceType, namespace)
  // console.log(res.body.items.map(spec => spec.metadata.name))
  return res.body.items.map(spec => spec.metadata.name)

  // client.delete(spec)
}
