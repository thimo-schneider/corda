import * as k8s from "@kubernetes/client-node"

export default async function execShell(config: k8s.KubeConfig, namespace: string, podName: string, containerName: string): Promise<any> {
  const exe = new k8s.Exec(config)
  exe.exec(namespace, podName, containerName, ["/bin/bash", "-i"], process.stdout, process.stderr, process.stdin, true)
}
