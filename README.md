CORDA
=================

## First steps

1. Install appropriate node/npm version, can be found in package.json
2. Install packages: navigate to project root and execute "npm install"
3. Build: Run "npm run build", artifacts will be generated in "bin" directory
4. Set up kubernetes pull secret with the name "corda-pull-secret"

## Pack
In order to generate executables, follow the first steps and run "npm run pack". This will generate executables for different architectures in the dist directory.

## Capabilities

### dev
The dev command deploys a pod in development mode, meaning that the pod will
run until manually stopped, it will start a jupyter-lab instance and it will clone
the specified git repository into the container. The dev command takes 5 required
flags:
-  -a, –irods auth: With this flag the irods password is supplied to the pod.
- -d, –workflow descriptor: Path to the workflow descriptor.json file.
- -n, –name: The name of the pod. This name is also used as part of the
names of other kubernetes resources connected to the pod.
- -s, –namespace: Name of the namespace where the pod and other resources
should be deployed.
- -t, –git token: A git authentication token, authenticating the user to the
remote git repository.

### run
The run command is virtually identical to the dev command. It takes the exact
same command line flags and arguments. The two commands only differ in the
setting of the ”RUN MODE” environment variable and the absence of a Persistent
Volume Claim. The run command deploys a container, pulls the input data to the
local file system in the container, runs the workflow and saves the specified results
in the specified locations in iRODS. The results of the workflow can be accessed
by using icommands and stdout and stderr of the run can be accessed via kubectl
logs.

### remove
The remove command is used to remove a pod and all connected Resources.

### exec
The ”exec” command is used to execute a command in a container running in the
kubernetes cluster.

### forward
The ”forward” command is used to forward the jupyter-lab port to a port on the
local machine.

## kubefile

This cli requires a kubeconfig be present which needs to be extended by a env field in the exec field like this:
        - name: test-user
        user:
          exec:
            apiVersion: client.authentication.k8s.io/v1beta1
            command: kubelogin
            interactiveMode: IfAvailable
            env:
              - name: stdio
                value:
                  - pipe
                  - pipe
                  - inherit
            provideClusterInfo: false
