# Description
This is a CLI tool for developing and executing reproducible workflows in Kubernetes.

## Commands
### dev
This command will deploy a container in Kubernetes in development mode. The container will be available until it is removed by the user.
The command takes the following arguments:

-  -a, --irods_auth=<value>           (required) irods password
-  -d, --workflow_descriptor=<value>  (required) Workflow descriptor
-  -n, --name=<value>                 (required) Name of Pod
-  -s, --namespace=<value>            (required) Namespace
-  -t, --git_token=<value>            (required) git authentication token

### forward
Forwards the remote jupyterlab to local port 8080. 
The command takes the following arguments:

-  -n, --name=<value>       (required) Name of Pod
-  -s, --namespace=<value>  (required) Namespace

### remove
Completely removes a container and all it's dependencies from the Kubernetes Cluster.
**WARNING**: All uncommited/unpushed data will be lost.

-  -n, --name=<value>       (required) Name of Pod
-  -s, --namespace=<value>  (required) Namespace

### run
Runs an analysis in reproducible mode. This command will spin up the specified container in the Kubernetes cluster, pull a specified analysis repo into the container, run the analysis snakefile and push the results to the specified irods location.
The command takes the following arguments:

-  -a, --irods_auth=<value>           (required) irods password
-  -d, --workflow_descriptor=<value>  (required) Workflow descriptor
-  -n, --name=<value>                 (required) Name of Pod
-  -s, --namespace=<value>            (required) Namespace
-  -t, --git_token=<value>            (required) git authentication token

### exec
Opens a remote shell into the remote container.

-  -c, --container_name=<value>  (required) Name of Container
-  -n, --name=<value>            (required) Name of Pod
-  -s, --namespace=<value>       (required) Namespace


## Build
Command: **npm run pack**
This will build tarballs for Linux, macOS and Windows. The resulting packages can be found in the dist directory.
## Installation
Unpack the tarball, move to desired location and add the bin directory to your path.

## Configuration
This tool takes a kubernetes config file (see: https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/). The KUBECONFIG environment variable has to be set.
