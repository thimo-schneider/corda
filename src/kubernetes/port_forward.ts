import * as k8s from "@kubernetes/client-node"
import { PortForward } from "@kubernetes/client-node"
import * as net from "net"

export async function forwardPort(config: k8s.KubeConfig, namespace: string, podName: string, targetPort: number): Promise<any> {
  const forwardObj = new PortForward(config)
  const server = net.createServer(socket => {
    forwardObj.portForward(namespace, podName, [targetPort], socket, socket, socket, 10)
  })
  server.listen(targetPort, "127.0.0.1")
}

