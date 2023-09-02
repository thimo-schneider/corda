import path from "path"
export default {
  POD_TEMPLATE_FILE_PATH: path.resolve(__dirname,  "templates/kubernetes/pod.yml"),
  REPRODUCIBLE_POD_TEMPLATE_FILE_PATH: path.resolve(__dirname, "templates/kubernetes/reproducible_pod.yml"),
  DEV_POD_TEMPLATE_FILE_PATH: path.resolve(__dirname, "templates/kubernetes/dev_pod.yml"),
  WORKFLOW_DESCRIPTOR_CONFIG_MAP_TEMPLATE_FILE_PATH: path.resolve(__dirname, "templates/kubernetes/workflow_descriptor_config_map.yml"),
  IRODS_PASSWORD_SECRET_TEMPLATE_FILE_PATH: path.resolve(__dirname, "templates/kubernetes/irods_password_secret.yml"),
  GIT_PASSWORD_SECRET_TEMPLATE_FILE_PATH: path.resolve(__dirname, "templates/kubernetes/git_token_secret.yml"),
  PVC_TEMPLATE_FILE_PATH: path.resolve(__dirname, "templates/kubernetes/pvc.yml")
}
