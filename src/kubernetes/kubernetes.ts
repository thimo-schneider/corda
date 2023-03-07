// import * as k8s from "@kubernetes/client-node"
// import { User } from "@kubernetes/client-node"
// import login from "../auth/auth"

// // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0"
// process.env['KUBECONFIG'] = "/home/thimo/.kube/config"
// const createKubeApi = async (token: string): Promise<k8s.KubernetesObjectApi> => {
//   const kubeConfig = new k8s.KubeConfig()
//   kubeConfig.setCurrentContext("test-user")
//   kubeConfig.loadFromDefault()
//   const client: k8s.KubernetesObjectApi = k8s.KubernetesObjectApi.makeApiClient(kubeConfig)
//   // const k8sCoreClient: k8s.CoreV1Api = kubeConfig.makeApiClient(k8s.CoreV1Api)
//   // k8sCoreClient.addInterceptor(stuff => console.log(stuff))
//   return client
// }
// createKubeApi("lkj")
//   .then(api => {
//     const stuff = new k8s.V1Pod()
//     return api.create("thimo")
//   }).catch(err => console.log(err))
